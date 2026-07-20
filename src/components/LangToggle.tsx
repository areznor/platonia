"use client";

import { useEffect, useRef, useState } from "react";
import { LANGS, STORAGE_KEY, type LangCode } from "@/lib/i18n";

export function LangToggle({
  lang,
  onChange,
}: {
  lang: LangCode;
  onChange: (code: LangCode) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LANGS.find((l) => l.code === lang) || LANGS[1];

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-xl border-2 border-white/20 bg-white/10 px-3 py-2 text-sm font-extrabold text-white backdrop-blur"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{current.flag}</span>
        <span>{current.code.toUpperCase()}</span>
        <span className="opacity-70">▾</span>
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 min-w-[180px] overflow-hidden rounded-2xl border-2 border-[#e5e9f0] bg-white shadow-[0_8px_24px_rgba(0,0,0,.18)]"
        >
          {LANGS.map((l) => (
            <button
              key={l.code}
              type="button"
              role="menuitem"
              className={`flex w-full items-center gap-2 px-4 py-3 text-left text-sm font-extrabold text-[#16324f] hover:bg-[#E3F0FB] ${
                l.code === lang ? "bg-[#E3F0FB]" : ""
              }`}
              onClick={() => {
                onChange(l.code);
                localStorage.setItem(STORAGE_KEY, l.code);
                setOpen(false);
              }}
            >
              <span>{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
