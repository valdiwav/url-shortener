import { randomBytes } from "node:crypto";
import { getServerSession } from "next-auth/next";
import { generateQRCodeBase64 } from "../../components/qrCodeGenerator";
import db from "../../libs/db";
import { authOptions } from "../../utils/authOptions";
import { httpUrl } from "../../utils/linkUrl";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return Response.json({ error: "Inicia sesión para crear enlaces." }, { status: 401 });
    }

    const body = await request.json().catch(() => null);
    const destination = httpUrl(body?.url);
    if (!destination) {
      return Response.json({ error: "Ingresa una URL HTTP o HTTPS válida." }, { status: 400 });
    }

    const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
    const base = httpUrl(process.env.BASE_URL)
      || (process.env.VERCEL_ENV === "production" && productionHost && httpUrl("https://" + productionHost))
      || request.nextUrl;

    for (let attempt = 0; attempt < 5; attempt++) {
      const shortUrl = randomBytes(4).toString("hex");
      const newLink = new URL("/" + shortUrl, base.origin).href;
      const qrCode = await generateQRCodeBase64(newLink);

      try {
        const link = await db.link.create({
          data: {
            url: destination.href,
            shortUrl,
            newLink,
            qrCode,
            qrCodeGenerated: true,
            userId: session.user.id,
          },
        });
        return Response.json({
          originalUrl: link.url,
          shortUrl: link.newLink,
          newLink: link.newLink,
          qrCode: link.qrCode,
        }, { status: 201 });
      } catch (error) {
        if (error.code !== "P2002" || attempt === 4) throw error;
      }
    }
  } catch (error) {
    console.error("Error al crear enlace:", error.code || error.name);
    return Response.json({ error: "No pudimos crear el enlace. Intenta de nuevo." }, { status: 500 });
  }
}
