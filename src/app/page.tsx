import Image from "next/image";
import Link from "next/link";

const regioes = [
  { nome: "Cidade da Matemática", icone: "🏛️" },
  { nome: "Praça da Filosofia", icone: "🦉" },
  { nome: "Beco da História", icone: "📜" },
  { nome: "Esquina da Gramática", icone: "✍️" },
  { nome: "Viela das Artes", icone: "🎨" },
  { nome: "Laboratório de Ciências", icone: "🔬" },
  { nome: "Vila da Saúde", icone: "🌿" },
  { nome: "Parque Tecnológico", icone: "💻" },
];

const beneficios = [
  {
    titulo: "Trilhas gamificadas",
    desc: "Lições curtas com corações, XP, ofensiva e Teste da Seção — no ritmo do Duolingo.",
  },
  {
    titulo: "Biblioteca viva",
    desc: "Resumos e livros-jogo que revelam caminhos ocultos no mapa de Platonia.",
  },
  {
    titulo: "Certificados",
    desc: "Complete uma região e baixe seu certificado da Academia de Platonia.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0b1624] text-[#eaf2fb]">
      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 py-5 sm:px-10">
        <div className="brand-font text-xl tracking-[0.2em] text-[#ffc800] sm:text-2xl">
          PLATONIA
        </div>
        <Link
          href="/aprender/"
          className="rounded-2xl bg-[#ffc800] px-4 py-2 text-sm font-black uppercase tracking-wide text-[#16324f] shadow-[0_4px_0_#e0a800] transition active:translate-y-1 active:shadow-none"
        >
          Entrar
        </Link>
      </header>

      <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 pb-16 pt-24 text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_28%,#274763_0%,#101e2e_55%,#060d15_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[28vh] bg-gradient-to-t from-black/55 to-transparent"
        />
        <div
          aria-hidden
          className="absolute left-1/2 top-[22%] h-28 w-28 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,#fff6ce_0%,#ffc800_45%,rgba(255,200,0,0)_72%)] opacity-90 blur-[1px] animate-pulse"
        />

        <div className="relative z-10 max-w-2xl">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.35em] text-[#bbd3ea]">
            a terra do saber
          </p>
          <h1 className="brand-font text-5xl tracking-[0.12em] text-[#ffc800] drop-shadow-[0_0_30px_rgba(255,200,0,0.45)] sm:text-7xl">
            PLATONIA
          </h1>
          <p className="mx-auto mt-6 max-w-md text-lg font-bold text-[#d6e6f5] sm:text-xl">
            Você está a um passo de sair da caverna. Tire seu passaporte e
            comece a aprender.
          </p>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/aprender/"
              className="inline-flex min-w-[220px] items-center justify-center rounded-2xl bg-[#58cc02] px-7 py-4 text-base font-black uppercase tracking-wide text-white shadow-[0_4px_0_#46a302] transition hover:brightness-105 active:translate-y-1 active:shadow-none"
            >
              Criar passaporte
            </Link>
            <a
              href="#mapa"
              className="inline-flex min-w-[220px] items-center justify-center rounded-2xl border-2 border-white/20 bg-white/5 px-7 py-4 text-base font-black uppercase tracking-wide text-white backdrop-blur transition hover:bg-white/10"
            >
              Ver o mapa
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f9fc] px-6 py-20 text-[#16324f]">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-3">
          {beneficios.map((b) => (
            <div key={b.titulo}>
              <h2 className="brand-font text-2xl text-[#1c7ac4]">{b.titulo}</h2>
              <p className="mt-3 text-base font-bold leading-relaxed text-[#5b6b80]">
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="mapa" className="bg-[#eef3f9] px-6 py-20 text-[#16324f]">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <h2 className="brand-font text-3xl sm:text-4xl">Mapa de Platonia</h2>
            <p className="mt-3 font-bold text-[#5b6b80]">
              Oito regiões do saber. Uma trilha por vez. Caminhos ocultos na
              Biblioteca.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {regioes.map((r) => (
              <div
                key={r.nome}
                className="rounded-2xl border-2 border-[#e5e9f0] bg-white p-4 shadow-[0_4px_0_#e5e9f0]"
              >
                <div className="text-3xl">{r.icone}</div>
                <div className="mt-2 text-sm font-extrabold leading-snug">
                  {r.nome}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 overflow-hidden rounded-[28px] border-2 border-[#e5e9f0] bg-white shadow-[0_6px_0_#e5e9f0]">
            <div className="grid items-center gap-0 md:grid-cols-2">
              <div className="relative min-h-[240px] md:min-h-[320px]">
                <Image
                  src="/images/recurso1.png"
                  alt="Mapa e trilhas de Platonia"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="p-8 md:p-10">
                <h3 className="brand-font text-2xl text-[#1c7ac4]">
                  Microlearning com alma clássica
                </h3>
                <p className="mt-3 font-bold leading-relaxed text-[#5b6b80]">
                  Do passaporte à Ágora: ofensiva, dracmas, ligas e certificados.
                  A Biblioteca conecta leitura e prática — terminar um livro
                  libera exercícios secretos na trilha.
                </p>
                <Link
                  href="/aprender/"
                  className="mt-6 inline-flex rounded-2xl bg-[#1c7ac4] px-6 py-3 text-sm font-black uppercase tracking-wide text-white shadow-[0_4px_0_#145e99] transition active:translate-y-1 active:shadow-none"
                >
                  Começar agora
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#060d15] px-6 py-10 text-center text-sm font-bold text-[#bbd3ea]">
        <div className="brand-font mb-2 text-lg tracking-[0.2em] text-[#ffc800]">
          PLATONIA
        </div>
        <p>platonia.academy · App educacional gratuito</p>
        <p className="mt-2 text-[#5b6b80]">
          Saia da caverna. Tire agora mesmo o seu passaporte.
        </p>
        <p className="mt-4">
          <Link href="/privacidade" className="text-[#58a6ff] underline">
            Política de privacidade
          </Link>
        </p>
      </footer>
    </div>
  );
}
