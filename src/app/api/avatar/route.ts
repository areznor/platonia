import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { authOptions } from "@/lib/auth";
import { getUsers, mongoConfigured } from "@/lib/mongodb";

const MAX_BYTES = 1.5 * 1024 * 1024;

/** Heurística básica + rejeição de padrões óbvios (sem IA pesada no servidor). */
function looksUnsafeDataUrl(dataUrl: string) {
  if (!dataUrl.startsWith("data:image/")) return "Formato inválido. Use JPG ou PNG.";
  if (dataUrl.length > MAX_BYTES * 1.4) return "Imagem muito grande (máx. ~1,5 MB).";
  const lower = dataUrl.slice(0, 200).toLowerCase();
  if (!(lower.includes("image/jpeg") || lower.includes("image/png") || lower.includes("image/webp"))) {
    return "Use JPG, PNG ou WebP.";
  }
  return null;
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email || !(session.user as { id?: string }).id) {
    return NextResponse.json({ message: "Não autenticado" }, { status: 401 });
  }
  if (!mongoConfigured()) {
    return NextResponse.json({ message: "Banco não configurado" }, { status: 503 });
  }

  const body = await req.json();
  const avatar = String(body.avatar || "");
  const clientSafe = Boolean(body.clientSafe);

  if (avatar.startsWith("data:image/")) {
    const err = looksUnsafeDataUrl(avatar);
    if (err) return NextResponse.json({ message: err }, { status: 400 });
    if (!clientSafe) {
      return NextResponse.json(
        { message: "Envie a foto após a verificação de segurança no dispositivo." },
        { status: 400 }
      );
    }
  } else if (avatar.length > 8) {
    return NextResponse.json({ message: "Avatar inválido." }, { status: 400 });
  }

  const users = await getUsers();
  await users.updateOne(
    { _id: new ObjectId((session.user as { id: string }).id) },
    { $set: { avatar, updatedAt: new Date() } }
  );

  return NextResponse.json({ ok: true, avatar });
}
