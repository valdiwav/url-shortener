import db from "../libs/db";
import { httpUrl } from "../utils/linkUrl";

export async function GET(_request, { params }) {
  const { statistics: slug } = await params;

  try {
    const link = await db.link.update({
      where: { shortUrl: slug },
      data: { visits: { increment: 1 } },
      select: { url: true },
    });

    const destination = httpUrl(link.url);
    if (destination) return new Response(null, {
      status: 302,
      headers: { Location: destination.href, "Cache-Control": "no-store" },
    });
  } catch (error) {
    if (error.code !== "P2025") {
      console.error("Error al resolver enlace:", error.code || error.name);
      return new Response("No pudimos abrir el enlace.", { status: 500 });
    }
  }

  return new Response("Enlace no encontrado.", { status: 404 });
}
