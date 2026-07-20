import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { dbConfigured, ensureSchema, updateUserAvatar } from "@/lib/db";

const MAX_BYTES = 1.5 * 1024 * 1024;

function looksUnsafeDataUrl(dataUrl: string) {
  if (!dataUrl.startsWith("data:image/")) return "Formato inválido. Use JPG ou PNG.";
  if (dataUrl.length > MAX_BYTES * 1.4) return "Imagem muito grande (máx. ~1,5 MB).";
  const lower = dataUrl.slice(0, 200).toLowerCase();
  if (
    !(
      lower.includes("image/jpeg") ||
      lower.includes("image/png") ||
      lower.includes("image/webp")
    )
  ) {
    return "Use JPG, PNG ou WebP.";
  }
  return null;
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!session?.user?.email || !userId) {
    return NextResponse.json({ message: "Não autenticado" }, { status: 401 });
  }
  if (!dbConfigured()) {
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

  await ensureSchema();
  await updateUserAvatar(userId, avatar);
  return NextResponse.json({ ok: true, avatar });
}
