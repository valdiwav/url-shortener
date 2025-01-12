import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Obtener todos los usuarios desde la base de datos
    const users = await prisma.user.findMany({
      include: {
        links: true, // Incluye la relación con los enlaces
        apiTokens: true, // Incluye la relación con los tokens API
      },
    });

    return NextResponse.json(users); // Devuelve los usuarios como JSON
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  } finally {
    // Cerramos la conexión de Prisma para evitar fugas de recursos
    await prisma.$disconnect();
  }
}
