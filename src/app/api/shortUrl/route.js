// src/app/api/shortUrl/route.js
import { PrismaClient } from "@prisma/client";
import { generateQRCodeBase64 } from "../../components/qrCodeGenerator"; // Ajusta la ruta según tu estructura
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";


const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
    const { url } = body;
    const session = await getServerSession(authOptions);

    // Validar que la URL exista
    if (!url) {
      return new Response(JSON.stringify({ error: "URL es requerida" }), {
        status: 400,
      });
    }

    // Validar que la URL sea válida
    const isValidUrl = (url) => {
      try {
        new URL(url);
        return true;
      } catch (error) {
        return false;
      }
    };

    if (!isValidUrl(url)) {
      return new Response(JSON.stringify({ error: "URL no válida" }), {
        status: 400,
      });
    }

    // Generar un shortUrl único
    let shortUrl;
    let isUnique = false;

    while (!isUnique) {
      shortUrl = Math.random().toString(36).substring(2, 8);
      const existing = await prisma.link.findUnique({
        where: { shortUrl },
      });
      if (!existing) isUnique = true;
    }

    if (!session || !session.user || !session.user.email) {
      throw new Error("El usuario no está autenticado o no se pudo obtener el email.");
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      throw new Error("Usuario no encontrado en la base de datos.");
    }
    const userId = user.id;


    const baseUrl = process.env.BASE_URL || "http://localhost:3000";
    const fullShortUrl = `${baseUrl}/${shortUrl}`;

    // Generar el QR como Base64
    const qrCode = await generateQRCodeBase64(fullShortUrl);

    // Guardar en la base de datos
    const savedUrl = await prisma.link.create({
      data: {
        url,
        shortUrl,
        qrCode, // Guardar el QR generado en Base64
        qrCodeGenerated: true,
        userId, // Guardar el ID del usuario autenticado
      },
    });

    return new Response(
      JSON.stringify({
        originalUrl: savedUrl.url,
        shortUrl: fullShortUrl,
        qrCode: savedUrl.qrCode, // Enviar el QR generado al cliente
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error al guardar en la base de datos:", error);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); // Cierra la conexión de Prisma
  }
}
