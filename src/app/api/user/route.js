import { getServerSession } from "next-auth/next";
import db from "../../libs/db";
import { authOptions } from "../../utils/authOptions";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return new Response("Inicia sesión.", { status: 401 });

    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { id: true, email: true, name: true, createdAt: true, updatedAt: true },
    });

    if (!user) return new Response("Usuario no encontrado.", { status: 404 });
    return Response.json(user);
  } catch (error) {
    console.error("Error al cargar perfil:", error.code || error.name);
    return new Response("No pudimos cargar el perfil.", { status: 500 });
  }
}
