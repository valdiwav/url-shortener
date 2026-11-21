import { getServerSession } from "next-auth/next";
import db from "../../libs/db";
import { authOptions } from "../../utils/authOptions";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return Response.json({ error: "Inicia sesión." }, { status: 401 });

    const links = await db.link.findMany({
      where: { userId: session.user.id },
      select: { url: true, shortUrl: true, createdAt: true, qrCode: true, visits: true, newLink: true },
      orderBy: { createdAt: "desc" },
    });
    return Response.json({ links });
  } catch (error) {
    console.error("Error al cargar enlaces:", error.code || error.name);
    return Response.json({ error: "No pudimos cargar tus enlaces." }, { status: 500 });
  }
}
