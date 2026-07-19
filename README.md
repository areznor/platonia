# Platonia — a terra do saber!

App educacional gratuito estilo Duolingo, com trilhas de aprendizado, biblioteca, certificados e gamificação.

**Domínio:** [platonia.academy](https://platonia.academy)  
**Repo:** [github.com/areznor/platonia](https://github.com/areznor/platonia)

## Como rodar (web)

```bash
npm install
npm run dev
```

- Landing: [http://localhost:3000](http://localhost:3000)
- App: [http://localhost:3000/aprender/](http://localhost:3000/aprender/)

## App nativo (Capacitor) — Fase 1

O app das lojas embala o SPA de aprendizado (`public/aprender`), não a landing de marketing.

| Script | O que faz |
|--------|-----------|
| `npm run build:app` | Copia `public/aprender` → `www/` |
| `npm run cap:sync` | Gera `www/` e sincroniza com Android/iOS |
| `npm run cap:android` | Sync + abre o projeto no Android Studio |
| `npm run cap:ios` | Sync + abre no Xcode (**somente macOS**) |

### Android (Windows / macOS / Linux)

1. Instale o [Android Studio](https://developer.android.com/studio)
2. No projeto:

```bash
npm install
npm run cap:android
```

3. No Android Studio: rode em emulador ou dispositivo USB (Run ▶)

- **appId:** `academy.platonia.app`
- **Nome:** Platonia
- Pasta nativa: `android/` (versionada no git)
- Bundle web: `www/` (gerado; não commitado)

### iOS

Requer Mac + Xcode + conta Apple Developer:

```bash
npm run cap:add:ios   # uma vez
npm run cap:ios
```

### Fluxo ao alterar o app

1. Edite `public/aprender/index.html` (ou rode o site com `npm run dev`)
2. `npm run cap:sync`
3. Rebuild no Android Studio / Xcode

## Estrutura

```
src/app/              → landing Next.js (marca + mapa)
public/aprender/      → app educacional (fonte do Capacitor)
public/images/        → logos e recursos da landing
www/                  → cópia gerada para o Capacitor (gitignored)
android/              → projeto Android Studio
capacitor.config.ts   → appId, webDir, etc.
scripts/build-app.mjs → gera www/
```

## Stack

- Next.js 14 + React + Tailwind (landing)
- HTML/CSS/JS vanilla (motor de aprendizado, localStorage)
- Capacitor 7 (shell Android/iOS)
- Sem backend obrigatório nesta versão

## Próximas fases (mobile)

- **Fase 2:** Splash nativo, Status Bar, Haptics, Share do certificado
- **Fase 3:** AAB Play Store + TestFlight / App Store
