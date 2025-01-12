import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, context) {
  const params = await context.params; // Acceso dinámico y asincrónico a los parámetros

  if (!params || !params.statistics) {
    return new Response("Parámetro no proporcionado", { status: 400 });
  }

  const { statistics } = params;

  try {
    // Buscar el enlace en la base de datos
    const link = await prisma.link.findUnique({
      where: { shortUrl: statistics },
    });

    if (!link) {
      return new Response("Enlace no encontrado", { status: 404 });
    }

    // Incrementar el contador de visitas
    await prisma.link.update({
      where: { shortUrl: statistics },
      data: { visits: link.visits + 1 },
    });

    // Redirigir al enlace original
    return Response.redirect(link.url, 302); // Redirección temporal
  } catch (error) {
    console.error("Error procesando la solicitud:", error);
    return new Response("Error interno del servidor", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
