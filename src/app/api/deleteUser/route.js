import { getServerSession } from "next-auth/next";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function POST(req) {
    try {
      const session = await getServerSession(authOptions);
  
      if (!session) {
        return new Response("Unauthorized", { status: 401 });
      }
  
      const { email } = await req.json();
  
      if (session.user.email !== email) {
        return new Response("Email does not match", { status: 400 });
      }
  
      // Eliminar todos los enlaces y registros relacionados con el usuario
      await prisma.link.deleteMany({
        where: {
          userId: session.user.id,
        },
      });
  
      await prisma.apiToken.deleteMany({
        where: {
          userId: session.user.id,
        },
      });
  
      // Eliminar el usuario
      await prisma.user.delete({
        where: {
          email: email,
        },
      });
  
      return new Response("User account deleted successfully", { status: 200 });
    } catch (error) {
      console.error("Error deleting user:", error);
      return new Response(`Failed to delete account: ${error.message}`, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  }
  