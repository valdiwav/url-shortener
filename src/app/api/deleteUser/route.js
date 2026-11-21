import { getServerSession } from "next-auth/next";
import db from "../../libs/db";
import { authOptions } from "../../utils/authOptions";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    if (!userId) return new Response("Inicia sesión.", { status: 401 });

    const body = await request.json().catch(() => null);
    if (body?.email !== session.user.email) {
      return new Response("El correo de confirmación no coincide.", { status: 400 });
    }

    await db.$transaction([
      db.statistic.deleteMany({ where: { link: { userId } } }),
      db.link.deleteMany({ where: { userId } }),
      db.apiToken.deleteMany({ where: { userId } }),
      db.user.delete({ where: { id: userId } }),
    ]);
    return new Response("Cuenta eliminada.");
  } catch (error) {
    console.error("Error al eliminar cuenta:", error.code || error.name);
    return new Response("No pudimos eliminar la cuenta.", { status: 500 });
  }
}
