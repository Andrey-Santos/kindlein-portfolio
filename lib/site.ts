// Dominio de producao da Vercel (vira kindlein.business sozinho quando ele for
// configurado); fora da Vercel cai no dominio final.
export const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "https://kindlein.business";
