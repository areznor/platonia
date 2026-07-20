"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LangToggle } from "@/components/LangToggle";
import { STORAGE_KEY, t, type LangCode } from "@/lib/i18n";

const AVATARES = ["🦉", "🏺", "📜", "⚱️", "🏛️", "⚔️", "🌿", "💻"];

export default function CadastroPage() {
  const router = useRouter();
  const [lang, setLang] = useState<LangCode>("pt");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(AVATARES[0]);
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
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, avatar }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || t(lang, "auth.error"));
        setLoading(false);
        return;
      }
      const login = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      setLoading(false);
      if (login?.error) {
        setError(t(lang, "auth.error"));
        return;
      }
      localStorage.setItem(
        "platonia_save_v2",
        JSON.stringify({
          perfil: { nome: name, email, avatar },
          xp: 0,
          dracmas: 50,
          coracoes: 5,
          ultimoCoracaoTs: Date.now(),
          streak: { dias: 0, ultimaData: null, congelamentos: 0 },
          dicas: 1,
          progresso: {},
          testesPassados: [],
          livrosLidos: [],
          ocultasDesbloqueadas: [],
          conquistas: [],
          certificados: [],
          trajes: [],
          regioesDesbloqueadas: ["filosofia", "matematica", "gramatica"],
          metaDiaria: { data: null, xp: 0, meta: 30 },
        })
      );
      router.push("/aprender/");
      router.refresh();
    } catch {
      setLoading(false);
      setError(t(lang, "auth.error"));
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0b1624] px-4 py-16 text-[#eaf2fb]">
      <div className="absolute right-5 top-5">
        <LangToggle lang={lang} onChange={setLang} />
      </div>
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-[28px] border-2 border-[#FFC800] bg-white p-8 text-[#16324f] shadow-[0_8px_0_#E0A800]"
      >
        <p className="brand-font text-center text-sm tracking-[0.2em] text-[#e0a800]">
          ✦ PASSAPORTE DE PLATONIA ✦
        </p>
        <h1 className="brand-font mt-2 text-center text-3xl text-[#1c7ac4]">
          {t(lang, "auth.signup.title")}
        </h1>
        <p className="mt-2 text-center text-sm font-bold text-[#5b6b80]">
          {t(lang, "auth.signup.sub")}
        </p>
        <label className="mt-6 block text-xs font-black uppercase tracking-wide text-[#5b6b80]">
          {t(lang, "auth.name")}
          <input
            className="mt-2 w-full rounded-xl border-2 border-[#e5e9f0] bg-[#f7f9fc] px-4 py-3 text-base font-bold"
            required
            minLength={2}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="mt-4 block text-xs font-black uppercase tracking-wide text-[#5b6b80]">
          {t(lang, "auth.email")}
          <input
            className="mt-2 w-full rounded-xl border-2 border-[#e5e9f0] bg-[#f7f9fc] px-4 py-3 text-base font-bold"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="mt-4 block text-xs font-black uppercase tracking-wide text-[#5b6b80]">
          {t(lang, "auth.password")}
          <input
            className="mt-2 w-full rounded-xl border-2 border-[#e5e9f0] bg-[#f7f9fc] px-4 py-3 text-base font-bold"
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <p className="mt-4 text-xs font-black uppercase tracking-wide text-[#5b6b80]">
          Avatar
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {AVATARES.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setAvatar(a)}
              className={`flex h-14 w-14 items-center justify-center rounded-full border-4 bg-white text-2xl ${
                avatar === a ? "border-[#FFC800] bg-[#FFE066]" : "border-[#e5e9f0]"
              }`}
            >
              {a}
            </button>
          ))}
        </div>
        {error && <p className="mt-3 text-sm font-extrabold text-[#FF4B4B]">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-2xl bg-[#58cc02] py-4 text-base font-black uppercase tracking-wide text-white shadow-[0_4px_0_#46a302] disabled:opacity-60"
        >
          {t(lang, "auth.submit.signup")}
        </button>
        <Link
          href="/entrar"
          className="mt-4 block text-center text-sm font-extrabold text-[#1c7ac4]"
        >
          {t(lang, "auth.to.login")}
        </Link>
      </form>
    </main>
  );
}
