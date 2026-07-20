"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";

export default function SairPage() {
  useEffect(() => {
    void signOut({ callbackUrl: "/" });
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0b1624] text-[#eaf2fb]">
      <p className="font-extrabold">Saindo de Platonia…</p>
    </main>
  );
}
