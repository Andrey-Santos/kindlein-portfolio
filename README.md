# Kindlein — portfólio

Portfólio de Andrey Kindlein: sites, e-commerce e sistemas sob medida pra pequenas empresas.

- **Stack:** Next.js (App Router), TypeScript, Tailwind CSS v4.
- **Conteúdo:** tudo em [`lib/data.ts`](lib/data.ts) — projetos, serviços e contato. Imagens em `public/projects/`.
- **Contexto de produto:** [`PRODUCT.md`](PRODUCT.md).

## Rodando

```bash
npm install
npm run dev
```

Abre em http://localhost:3000.

## Deploy

Vercel, a partir do branch `master`. O domínio usado em metadados, sitemap e
preview de compartilhamento vem de `VERCEL_PROJECT_PRODUCTION_URL` (ver `lib/site.ts`).
