import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacidade — Platonia",
  description: "Política de privacidade do app Platonia Academy.",
};

export default function PrivacidadePage() {
  return (
    <main className="min-h-screen bg-[#f7f9fc] px-6 py-16 text-[#16324f]">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="text-sm font-extrabold uppercase tracking-wide text-[#1c7ac4]"
        >
          ← Platonia
        </Link>
        <h1 className="brand-font mt-6 text-3xl text-[#1c7ac4]">
          Política de Privacidade
        </h1>
        <p className="mt-2 text-sm font-bold text-[#5b6b80]">
          Última atualização: 19 de julho de 2026
        </p>

        <div className="mt-8 space-y-6 text-base font-semibold leading-relaxed text-[#5b6b80]">
          <section>
            <h2 className="brand-font text-xl text-[#16324f]">1. Quem somos</h2>
            <p className="mt-2">
              Platonia (“a terra do saber”) é um aplicativo educacional gratuito
              da Academia de Platonia (
              <a className="text-[#1c7ac4] underline" href="https://platonia.academy">
                platonia.academy
              </a>
              ).
            </p>
          </section>

          <section>
            <h2 className="brand-font text-xl text-[#16324f]">
              2. Dados que coletamos
            </h2>
            <p className="mt-2">
              Na versão atual, o progresso (nome, e-mail do passaporte, XP,
              lições, etc.) fica armazenado <strong>localmente no seu
              dispositivo</strong> (navegador ou app). Não operamos um servidor
              obrigatório de contas nesta versão.
            </p>
          </section>

          <section>
            <h2 className="brand-font text-xl text-[#16324f]">
              3. Como usamos os dados
            </h2>
            <p className="mt-2">
              Os dados do passaporte e do progresso servem apenas para
              personalizar a experiência de aprendizado no seu aparelho
              (trilhas, certificados, ofensiva, loja virtual de dracmas).
            </p>
          </section>

          <section>
            <h2 className="brand-font text-xl text-[#16324f]">
              4. Compartilhamento
            </h2>
            <p className="mt-2">
              Não vendemos dados pessoais. Se você usar o botão de compartilhar
              certificado, o sistema do celular (WhatsApp, e-mail, etc.) é
              acionado por você — Platonia não envia o arquivo a terceiros
              automaticamente.
            </p>
          </section>

          <section>
            <h2 className="brand-font text-xl text-[#16324f]">5. Crianças</h2>
            <p className="mt-2">
              O app é educacional e pode ser usado por famílias. Não coletamos
              conscientemente dados de crianças em servidores. Responsáveis
              devem supervisionar o uso quando aplicável.
            </p>
          </section>

          <section>
            <h2 className="brand-font text-xl text-[#16324f]">
              6. Alterações e contato
            </h2>
            <p className="mt-2">
              Podemos atualizar esta política ao evoluir o produto (por exemplo,
              contas na nuvem). Dúvidas: use o contato indicado em{" "}
              <a className="text-[#1c7ac4] underline" href="https://platonia.academy">
                platonia.academy
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
