import { getServerSession } from "next-auth/next";
import db from "../../libs/db";
import { authOptions } from "../../utils/authOptions";
import { httpUrl } from "../../utils/linkUrl";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return Response.json({ message: "Inicia sesión." }, { status: 401 });

    const body = await request.json().catch(() => null);
    const destination = httpUrl(body?.destinationUrl);
    if (!destination || typeof body?.shortUrl !== "string" || !body.shortUrl) {
      return Response.json({ message: "El enlace y el destino deben ser válidos." }, { status: 400 });
    }

    const updatedLink = await db.link.update({
      where: { shortUrl: body.shortUrl, userId: session.user.id },
      data: { url: destination.href },
    });
    return Response.json({ message: "Destino actualizado.", updatedLink });
  } catch (error) {
    if (error.code === "P2025") return Response.json({ message: "Enlace no encontrado." }, { status: 404 });
    console.error("Error al editar enlace:", error.code || error.name);
    return Response.json({ message: "No pudimos actualizar el destino." }, { status: 500 });
  }
}
