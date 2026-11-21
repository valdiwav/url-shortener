import { getServerSession } from "next-auth/next";
import db from "../../libs/db";
import { authOptions } from "../../utils/authOptions";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return new Response("Inicia sesión.", { status: 401 });

    const body = await request.json().catch(() => null);
    const name = typeof body?.username === "string" ? body.username.trim() : "";
    if (name.length < 3 || name.length > 100) {
      return new Response("Ingresa un nombre de entre 3 y 100 caracteres.", { status: 400 });
    }
    await db.user.update({ where: { id: session.user.id }, data: { name } });
    return new Response("Nombre actualizado.");
  } catch (error) {
    console.error("Error al actualizar perfil:", error.code || error.name);
    return new Response("No pudimos actualizar el nombre.", { status: 500 });
  }
}
