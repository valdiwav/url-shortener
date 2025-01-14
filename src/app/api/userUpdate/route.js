import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

// Instanciamos PrismaClient fuera de la función
const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { username } = await req.json();

    // Actualizar el nombre del usuario
    const updatedUser = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        name: username,
      },
    });

    return new Response("Username updated successfully", { status: 200 });
  } catch (error) {
    console.error("Error updating username:", error);
    return new Response("Failed to update username", { status: 500 });
  }
}
