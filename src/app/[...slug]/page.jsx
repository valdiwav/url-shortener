import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export default async function CatchAllRoute({ params }) {
  const { slug } = await params;

  // Verifica si la ruta es específica y no debe ser manejada aquí
  const protectedRoutes = ["auth", "api"];
  if (slug && protectedRoutes.some((route) => slug[0].startsWith(route))) {
    return null; // No manejar estas rutas
  }


  // Verifica si hay un slug válido
  if (!slug || slug.length === 0) {
    redirect("/"); // Redirige a la página principal si no hay slug
    return null;
  }

  const shortId = slug[0]; // Toma el primer segmento del slug como shortId

  try {
    const data = await prisma.link.findUnique({
      where: { shortUrl: shortId }, // Campo de tu modelo en Prisma
    });

    if (!data) {
      redirect("/"); // Redirige a la página principal si no se encuentra el shortId
      return null;
    }

    redirect(data.url); // Redirige a la URL asociada
  } finally {
    await prisma.$disconnect();
  }

  return null;
}
