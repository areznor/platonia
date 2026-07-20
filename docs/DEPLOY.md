# Deploy Netlify — Platonia

## Atualizar o site existente

1. No Netlify, abra o site do Platonia.
2. **Site configuration → Build & deploy**
   - Repository: `areznor/platonia`
   - Branch: `main`
   - Build: use o `netlify.toml` (Next.js)
3. **Environment variables** (obrigatórias para contas reais):

| Variável | Exemplo |
|----------|---------|
| `DATABASE_URL` | Connection string do **Neon** (Postgres) |
| `NEXTAUTH_SECRET` | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `https://SEU-DOMINIO` (ex. `https://platonia.academy`) |

4. No [Neon Console](https://console.neon.tech): crie um projeto → copie a connection string → cole como `DATABASE_URL`.
   - Em serverless (Netlify), prefira a URL **pooled** se o Neon oferecer.
5. Opcional: rode `db/schema.sql` no SQL Editor do Neon (o app também cria as tabelas sozinho no primeiro uso).
6. **Deploys → Trigger deploy → Clear cache and deploy site**

## Domínio

Se `platonia.academy` já aponta para este site, não mude o DNS.  
Privacidade: `https://platonia.academy/privacidade`

## Rotas principais

| URL | Função |
|-----|--------|
| `/` | Landing + idiomas |
| `/entrar` | Login real |
| `/cadastro` | Criar passaporte (Neon) |
| `/aprender/` | App (cidade + trilhas) |
| `/sair` | Logout |
| `/privacidade` | Política |
