// src/app/api/deleteLink/route.js
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route"; // Ajusta la ruta si es necesario

const prisma = new PrismaClient();

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url); // Obtenemos los parámetros de la URL
    const shortUrl = searchParams.get('shortUrl'); // El shortUrl que se pasará como parámetro

    // Validar que el shortUrl esté presente
    if (!shortUrl) {
      return new Response(JSON.stringify({ error: "El shortUrl es requerido" }), {
        status: 400,
      });
    }

    // Obtener la sesión del usuario autenticado
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
      throw new Error("El usuario no está autenticado.");
    }

    // Buscar al usuario por su email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      throw new Error("Usuario no encontrado en la base de datos.");
    }

    // Buscar el enlace por shortUrl y asegurarnos de que pertenece al usuario
    const link = await prisma.link.findUnique({
      where: { shortUrl },
    });

    if (!link) {
      return new Response(JSON.stringify({ error: "Enlace no encontrado" }), {
        status: 404,
      });
    }

    if (link.userId !== user.id) {
      return new Response(
        JSON.stringify({ error: "No tienes permiso para eliminar este enlace" }),
        { status: 403 }
      );
    }

    // Eliminar el enlace
    await prisma.link.delete({
      where: { shortUrl },
    });

    return new Response(
      JSON.stringify({ message: "Enlace eliminado correctamente" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error al eliminar el enlace:", error);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); // Cierra la conexión de Prisma
  }
}
