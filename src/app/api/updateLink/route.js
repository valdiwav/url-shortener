import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/utils/authOptions";
import { PrismaClient } from "@prisma/client";

// Instancia de PrismaClient
const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { shortUrl, destinationUrl } = await req.json();

    // Validar la URL utilizando el constructor URL
    try {
      new URL(destinationUrl); // Si no lanza error, la URL es válida
    } catch (error) {
      return new Response("Invalid URL format", { status: 400 });
    }

    // Buscar y actualizar el enlace
    const updatedLink = await prisma.link.update({
      where: {
        shortUrl,
      },
      data: {
        url: destinationUrl,
      },
    });

    return new Response(JSON.stringify({ message: "Link updated successfully", updatedLink }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating link:", error);

    if (error.code === "P2025") {
      return new Response("Link not found", { status: 404 });
    }

    return new Response("Failed to update link", { status: 500 });
  }
}
