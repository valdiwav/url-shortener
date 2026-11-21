import { getServerSession } from "next-auth/next";
import db from "../../libs/db";
import { authOptions } from "../../utils/authOptions";

export async function DELETE(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return Response.json({ error: "Inicia sesión." }, { status: 401 });

    const shortUrl = request.nextUrl.searchParams.get("shortUrl");
    if (!shortUrl) return Response.json({ error: "Falta el enlace." }, { status: 400 });

    await db.$transaction([
      db.statistic.deleteMany({ where: { link: { shortUrl, userId: session.user.id } } }),
      db.link.delete({ where: { shortUrl, userId: session.user.id } }),
    ]);
    return Response.json({ message: "Enlace eliminado." });
  } catch (error) {
    if (error.code === "P2025") return Response.json({ error: "Enlace no encontrado." }, { status: 404 });
    console.error("Error al eliminar enlace:", error.code || error.name);
    return Response.json({ error: "No pudimos eliminar el enlace." }, { status: 500 });
  }
}
