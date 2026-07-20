import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import {
  createUser,
  dbConfigured,
  ensureSchema,
  findUserByEmail,
} from "@/lib/db";

export async function POST(req: Request) {
  try {
    if (!dbConfigured()) {
      return NextResponse.json(
        {
          message:
            "Cadastro indisponível: configure DATABASE_URL (Neon) e NEXTAUTH_SECRET no Netlify.",
        },
        { status: 503 }
      );
    }

    const body = await req.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").toLowerCase().trim();
    const password = String(body.password || "");
    const avatar = String(body.avatar || "🦉");

    if (name.length < 2) {
      return NextResponse.json({ message: "Nome muito curto." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ message: "E-mail inválido." }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json(
        { message: "Senha com pelo menos 6 caracteres." },
        { status: 400 }
      );
    }

    await ensureSchema();
    const existing = await findUserByEmail(email);
    if (existing) {
      return NextResponse.json(
        { message: "Este e-mail já tem passaporte em Platonia." },
        { status: 422 }
      );
    }

    const passwordHash = await hash(password, 12);
    const user = await createUser({ name, email, passwordHash, avatar });

    return NextResponse.json({
      message: "Passaporte emitido!",
      user: { id: user.id, name: user.name, email: user.email, avatar: user.avatar },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Erro ao criar conta." }, { status: 500 });
  }
}
