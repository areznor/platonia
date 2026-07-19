# Platonia — a terra do saber!

App educacional gratuito estilo Duolingo, com trilhas de aprendizado, biblioteca, certificados e gamificação.

**Domínio:** [platonia.academy](https://platonia.academy)

## O que há de novo (v2)

Esta versão parte do **protótipo HTML local** (motor completo de aprendizado) e substitui o site Next.js antigo do GitHub, que era sobretudo uma landing/marketing sem motor de lições.

### Reaproveitado do repositório anterior
- Identidade “Platonia Academy” e metáfora do passaporte / caverna de Platão
- Assets de marca (`public/images`)
- Intenção de landing + CTA “Criar passaporte”
- Stack Next.js como casca do produto (pronto para auth/MongoDB/Stripe no futuro)

### Vindo do novo protótipo (e melhorado)
- Splash da caverna → passaporte → tutorial → mapa
- 8 regiões com trilhas, Teste da Seção e certificados
- 5 tipos de exercício + reforço ao errar
- Biblioteca (resumos + livro-jogo) que revela caminhos ocultos
- Ágora (loja), ligas, conquistas, ofensiva, corações
- **Novidades v2:** meta diária de XP, desbloqueio progressivo de regiões, combo de acertos, contagem regressiva de corações, feedback sonoro e trilha visual com caminho

## Como rodar

```bash
npm install
npm run dev
```

- Landing: [http://localhost:3000](http://localhost:3000)
- App: [http://localhost:3000/aprender/](http://localhost:3000/aprender/)

## Estrutura

```
src/app/          → landing Next.js (marca + mapa)
public/aprender/  → app educacional (SPA HTML/JS)
public/images/    → logos e recursos visuais
```

O conteúdo educacional vive em `CONTEUDO_PLATONIA` dentro de `public/aprender/index.html` — edite ali para adicionar lições, livros e regiões.

## Stack

- Next.js 14 + React + Tailwind (landing)
- HTML/CSS/JS vanilla (motor de aprendizado, localStorage)
- Sem backend obrigatório nesta versão (progresso no navegador)
