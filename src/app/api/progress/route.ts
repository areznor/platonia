import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import {
  dbConfigured,
  ensureSchema,
  getProgressByEmail,
  upsertProgress,
} from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Não autenticado" }, { status: 401 });
  }
  if (!dbConfigured()) {
    return NextResponse.json({ progress: null });
  }
  await ensureSchema();
  const progress = await getProgressByEmail(session.user.email);
  return NextResponse.json({ progress });
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Não autenticado" }, { status: 401 });
  }
  if (!dbConfigured()) {
    return NextResponse.json({ message: "Banco não configurado" }, { status: 503 });
  }
  const body = await req.json();
  await ensureSchema();
  await upsertProgress(session.user.email, body.progress);
  return NextResponse.json({ ok: true });
}
