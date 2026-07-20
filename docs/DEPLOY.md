# Deploy Netlify — Platonia

## Atualizar o site existente

1. No Netlify, abra o site antigo do Platonia.
2. **Site configuration → Build & deploy**
   - Repository: `areznor/platonia`
   - Branch: `main`
   - Build command: `npm run build` (ou deixe o `netlify.toml`)
   - Plugin: Essential Next.js
3. **Environment variables** (obrigatórias para contas reais):

| Variável | Exemplo |
|----------|---------|
| `MONGODB_URI` | string do MongoDB Atlas |
| `MONGODB_DB` | `platonia` |
| `NEXTAUTH_SECRET` | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `https://SEU-DOMINIO` (ex. `https://platonia.academy`) |

4. **Deploys → Trigger deploy → Clear cache and deploy site**

## Domínio

Se `platonia.academy` já aponta para este site, não mude o DNS.  
Privacidade: `https://platonia.academy/privacidade`

## Rotas principais

| URL | Função |
|-----|--------|
| `/` | Landing + idiomas |
| `/entrar` | Login real |
| `/cadastro` | Criar passaporte (MongoDB) |
| `/aprender/` | App (cidade + trilhas) |
| `/sair` | Logout |
| `/privacidade` | Política |
