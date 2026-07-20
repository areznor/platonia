import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { getUsers, mongoConfigured } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    if (!mongoConfigured()) {
      return NextResponse.json(
        {
          message:
            "Cadastro indisponível: configure MONGODB_URI e NEXTAUTH_SECRET no Netlify.",
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

    const users = await getUsers();
    const existing = await users.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { message: "Este e-mail já tem passaporte em Platonia." },
        { status: 422 }
      );
    }

    const passwordHash = await hash(password, 12);
    const result = await users.insertOne({
      name,
      email,
      passwordHash,
      avatar,
      createdAt: new Date(),
    });

    return NextResponse.json({
      message: "Passaporte emitido!",
      user: { id: String(result.insertedId), name, email, avatar },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Erro ao criar conta." }, { status: 500 });
  }
}
