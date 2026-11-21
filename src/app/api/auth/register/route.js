import bcrypt from "bcrypt";
import db from "../../../libs/db";
import { emailPattern, passwordHelp, passwordPattern } from "../../../utils/account";

export async function POST(request) {
  try {
    const body = await request.json().catch(() => null);
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const password = body?.password;

    if (name.length < 3 || name.length > 100) {
      return Response.json({ message: "Ingresa un nombre de entre 3 y 100 caracteres." }, { status: 400 });
    }
    if (email.length > 254 || !emailPattern.test(email)) {
      return Response.json({ message: "Ingresa un correo válido." }, { status: 400 });
    }
    if (typeof password !== "string" || !passwordPattern.test(password)) {
      return Response.json({ message: passwordHelp }, { status: 400 });
    }

    const user = await db.user.create({
      data: { name, email, password: await bcrypt.hash(password, 10) },
      select: { id: true, name: true, email: true, createdAt: true, updatedAt: true },
    });
    return Response.json(user);
  } catch (error) {
    if (error.code === "P2002") {
      return Response.json({ message: "Ya existe una cuenta con ese correo." }, { status: 400 });
    }
    console.error("Error al registrar usuario:", error.code || error.name);
    return Response.json({ message: "No pudimos crear tu cuenta. Intenta de nuevo." }, { status: 500 });
  }
}
