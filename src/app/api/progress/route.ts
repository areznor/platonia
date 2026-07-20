import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getProgress, mongoConfigured } from "@/lib/mongodb";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Não autenticado" }, { status: 401 });
  }
  if (!mongoConfigured()) {
    return NextResponse.json({ progress: null });
  }
  const col = await getProgress();
  const doc = await col.findOne({ email: session.user.email });
  return NextResponse.json({ progress: doc?.data || null });
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Não autenticado" }, { status: 401 });
  }
  if (!mongoConfigured()) {
    return NextResponse.json({ message: "Banco não configurado" }, { status: 503 });
  }
  const body = await req.json();
  const col = await getProgress();
  await col.updateOne(
    { email: session.user.email },
    {
      $set: {
        email: session.user.email,
        data: body.progress,
        updatedAt: new Date(),
      },
    },
    { upsert: true }
  );
  return NextResponse.json({ ok: true });
}
