"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LangToggle } from "@/components/LangToggle";
import { STORAGE_KEY, t, type LangCode } from "@/lib/i18n";

export default function EntrarPage() {
  const router = useRouter();
  const [lang, setLang] = useState<LangCode>("pt");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as LangCode | null;
    if (saved && ["en", "pt", "fr", "es", "it", "de"].includes(saved)) setLang(saved);
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    setLoading(false);
    if (res?.error) {
      setError(t(lang, "auth.error"));
      return;
    }
    router.push("/aprender/");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0b1624] px-4 py-16 text-[#eaf2fb]">
      <div className="absolute right-5 top-5">
        <LangToggle lang={lang} onChange={setLang} />
      </div>
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-[28px] border-2 border-[#e5e9f0] bg-white p-8 text-[#16324f] shadow-[0_8px_0_#e5e9f0]"
      >
        <p className="brand-font text-center text-sm tracking-[0.2em] text-[#e0a800]">
          ✦ PASSAPORTE ✦
        </p>
        <h1 className="brand-font mt-2 text-center text-3xl text-[#1c7ac4]">
          {t(lang, "auth.login.title")}
        </h1>
        <p className="mt-2 text-center text-sm font-bold text-[#5b6b80]">
          {t(lang, "auth.login.sub")}
        </p>
        <label className="mt-6 block text-xs font-black uppercase tracking-wide text-[#5b6b80]">
          {t(lang, "auth.email")}
          <input
            className="mt-2 w-full rounded-xl border-2 border-[#e5e9f0] bg-[#f7f9fc] px-4 py-3 text-base font-bold text-[#16324f]"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="mt-4 block text-xs font-black uppercase tracking-wide text-[#5b6b80]">
          {t(lang, "auth.password")}
          <input
            className="mt-2 w-full rounded-xl border-2 border-[#e5e9f0] bg-[#f7f9fc] px-4 py-3 text-base font-bold text-[#16324f]"
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {error && <p className="mt-3 text-sm font-extrabold text-[#FF4B4B]">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-2xl bg-[#58cc02] py-4 text-base font-black uppercase tracking-wide text-white shadow-[0_4px_0_#46a302] disabled:opacity-60"
        >
          {t(lang, "auth.submit.login")}
        </button>
        <Link
          href="/cadastro"
          className="mt-4 block text-center text-sm font-extrabold text-[#1c7ac4]"
        >
          {t(lang, "auth.to.signup")}
        </Link>
        <Link href="/" className="mt-2 block text-center text-sm font-bold text-[#5b6b80]">
          ← Platonia
        </Link>
      </form>
    </main>
  );
}
