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

## App nativo (Capacitor)

O app das lojas embala o SPA de aprendizado (`public/aprender`), não a landing de marketing.

| Script | O que faz |
|--------|-----------|
| `npm run build:app` | Gera `native-bridge.js` + copia `public/aprender` → `www/` |
| `npm run cap:sync` | Build do web bundle e sync Android/iOS |
| `npm run cap:android` | Sync + abre o Android Studio |
| `npm run cap:ios` | Sync + abre o Xcode (**somente macOS**) |

### Fase 1 — shell
- `appId`: `academy.platonia.app`
- Projeto `android/` versionado
- Bundle em `www/` (gerado)

### Fase 2 — plugins nativos
| Plugin | Uso |
|--------|-----|
| Splash Screen | Tela nativa escura → app (esconde ao iniciar) |
| Status Bar | Fundo `#0b1624`, texto claro |
| Haptics | Vibração em acerto / erro / vitória |
| Share | Botão **Compartilhar** no certificado |
| App | Botão voltar do Android (navegação inteligente) |

Bridge: `src/native/bridge.ts` → `public/aprender/native-bridge.js` (via esbuild).

### Android

```bash
npm install
npm run cap:android
```

No Android Studio: Run ▶

### Ao alterar o app

```bash
npm run cap:sync
```

## Auth e Netlify

Contas reais exigem MongoDB Atlas + variáveis no Netlify (`MONGODB_URI`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`).  
Guia: [`docs/DEPLOY.md`](docs/DEPLOY.md)

Rotas: `/entrar`, `/cadastro`, `/sair`, `/aprender/` (cidade point-and-click + catálogo).


```bash
npm run assets:generate   # ícones + splash a partir da marca
# keystore: ver android/keystore.properties.example
npm run build:aab         # requer Android Studio / SDK + keystore
```

- Versão Android: **2.0.0** (`versionCode` 2)
- Privacidade: [/privacidade](http://localhost:3000/privacidade)

## Auth e Netlify

Contas reais exigem MongoDB Atlas + variáveis no Netlify (`MONGODB_URI`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`).  
Guia: [`docs/DEPLOY.md`](docs/DEPLOY.md)

Rotas: `/entrar`, `/cadastro`, `/sair`, `/aprender/` (cidade point-and-click + catálogo).

## Estrutura

```
src/app/                 → landing Next.js
src/native/bridge.ts     → plugins Capacitor
public/aprender/         → app educacional + native-bridge.js
android/                 → Android Studio
capacitor.config.ts
scripts/build-app.mjs
```

## Stack

- Next.js 14 + React + Tailwind (landing)
- HTML/CSS/JS vanilla (motor + localStorage)
- Capacitor 7 (Splash, StatusBar, Haptics, Share, App)
