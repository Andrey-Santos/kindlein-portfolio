---
target: pagina de projeto
total_score: 24
max_score: 36
na_heuristics: 9
p0_count: 1
p1_count: 2
target_identity: "file:C:\\Dev\\Portifolio\\app\\projetos\\[slug]\\page.tsx"
target_fingerprint: "sha256:5c9c5a4e239e7845c10dee28e355e6f8c4ab1397d2efe7df6c478125a4d1d622"
target_path: "C:\\Dev\\Portifolio\\app\\projetos\\[slug]\\page.tsx"
timestamp: 2026-09-24T15-45-41Z
slug: app-projetos-slug-page-tsx
---
# Critique: pagina de detalhes do projeto (/projetos/kindlein-wallet)

Score: 24/36 (n/a: 9) — Bom. Detector: 0 achados.

H1 Status 2 (troca de tela sem loading, scrollbar quase invisivel) · H2 Mundo real 2 (jargao dev: "Telas", "tamanho real", `$ projetos/slug`) · H3 Controle 2 (scroll preso no viewer) · H4 Consistencia 3 (aria-current desktop vs role=tab mobile: dois modelos) · H5 Prevencao 3 · H6 Reconhecimento 3 · H7 Flexibilidade 2 (sem setas/swipe entre telas) · H8 Minimalismo 3 · H10 Ajuda 2 (dica de rolar so no aria-label)

Specificity: moldura de navegador com dominio real e indice numerado sao bons, especificos. Falha na execucao: Capa em letterbox vazio no desktop, mobile sem nenhum print na 1a tela.

## Priority issues
- [P0] CTA some em laptop comum (1440x900): sidebar com overflow-y-auto empurra "Quero algo parecido" pra dentro de scroll interno. project-showcase.tsx:29. Fix: tirar overflow da sidebar, CTA fixo no fim. layout
- [P1] Scroll trap: viewer h-[70svh] + overscroll-contain prende a rolagem no mobile e nao encadeia pra pagina. project-showcase.tsx:102. adapt
- [P1] Primeira impressao vazia: tela 01 e a "Capa" 1920x1080 com letterbox; nada avisa que rola. page.tsx:37. Fix: abrir no Dashboard, fade+chip "role para ver mais". clarify
- [P2] Mobile: ordem da pilha poe CTA e "proximo projeto" antes do conteudo; header transparente sobrepoe titulo ao rolar. layout
- [P2] A11y: tablist sem aria-controls/tabpanel/setas; aria-label em div sem role; alt generico. harden

## Personas
Jordan: "Capa" + faixa preta, nao sabe que rola. Casey: zero print na 1a tela mobile, polegar preso no viewer. Sam: abas sem setas de teclado, troca silenciosa. Dono de negocio: about fala de features (curva ABC, DRE), nao do problema resolvido.

## Minor
SlideScroll grava scrollSnapType=none a cada roda mesmo sem afetar a pagina. Overlay fixo do layout escurece topo da sidebar. Sem preload da proxima tela. Indice inutil quando so ha 1 tela (Goetten). Link "ao vivo" com peso de texto comum, merecia CTA secundario.
