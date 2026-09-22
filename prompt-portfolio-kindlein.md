# Prompt — Portfólio Kindlein (Next.js)

```
Desenvolva o site de portfólio da Kindlein (desenvolvimento web), em Next.js 
(App Router) + TypeScript + Tailwind CSS + shadcn/ui, apenas front-end, 
front-end estático (sem backend, sem CMS — conteúdo em arquivo de dados local).

REFERÊNCIA PRINCIPAL DE ESTRUTURA:
RyanFitzgerald/devportfolio (https://github.com/RyanFitzgerald/devportfolio) 
— template de portfólio de dev open source (Astro + Tailwind, adaptar pra 
Next.js). É o modelo mais estrelado nessa categoria com abordagem minimalista: 
seções modulares e controladas por um arquivo de configuração único, tudo 
construído em cima de um fundo neutro + UM único accent color carregando 
toda a personalidade visual — sem gradientes, sem poluição, sem enfeite 
decorativo. Seguir esse princípio: pouco elemento gráfico, muito espaço em 
branco, hierarquia tipográfica clara fazendo o trabalho pesado.
Seções do devportfolio a replicar: Hero, Sobre, Skills, Projetos, Experiência, 
Contato — adaptado abaixo pro caso da Kindlein (troca "Experiência" por 
"Serviços", já que é posicionamento de prestador de serviço, não currículo).
Referências secundárias de projeto/case cards: saadpasta/developerFolio e 
codebucks27/masterPortfolio (mais ricos em animação de card, usar com 
moderação — não sair do princípio minimalista do devportfolio).

IDENTIDADE:
- Nome/marca: Kindlein
- Domínio final: kindlein.business (ainda não publicado nele, mas já preparar 
  metadata/SEO pensando nesse domínio)
- Foco: desenvolvimento de sites e sistemas sob medida para pequenas empresas
- Paleta (identidade própria da Kindlein, não reaproveitar o preto/dourado 
  da Fabula, que é do cliente):
  - Fundo: #0F1115 (grafite quase preto, levemente azulado)
  - Texto: #E8E6E1 (off-white quente)
  - Accent: #10B981 (verde-esmeralda) — usar em CTAs, links, badges de 
    tecnologia, bordas de destaque em hover
  - Superfície de card: um tom intermediário entre fundo e texto (ex: 
    #1A1D23), sutil, sem chamar mais atenção que o accent
  - Dark mode como padrão (não é preciso versão light)
- Tipografia moderna sans-serif, visual "dev/tech", não "moda"

SEÇÕES:

1. HERO
   - Nome "Kindlein" + frase de posicionamento curta (ex: "Sites e sistemas 
     sob medida para o seu negócio crescer")
   - CTA para WhatsApp/contato

2. SOBRE
   - Texto baseado na trajetória real, citando a experiência de mercado de 
     forma breve (menciona que atuou como desenvolvedor em empresas de 
     tecnologia — sem nomes de empresas nem datas/tempo exato, só pra dar 
     lastro/credibilidade) + evolução técnica: começou com desenvolvimento 
     backend (PHP, Delphi, SQL, APIs REST) e evoluiu para full-stack 
     moderno (React, Next.js) — hoje construindo sites e sistemas sob 
     medida (e-commerce, controle de estoque, financeiro) sob a marca 
     Kindlein, atuando como freelancer/prestador de serviço. Tom: 
     experiência técnica real de mercado, não "estudante iniciante"

3. PROJETOS (seção principal — grid de cards, cada um abrindo para um 
   case/detalhe ou link direto)
   Incluir os seguintes projetos, cada um com nome, descrição curta, stack 
   usada e link:
   
   - Fabula — loja de moda feminina (e-commerce com carrinho e checkout) 
     → https://fabula-delta.vercel.app/
   - Metálica 3W — site institucional 
     → https://3wsite.vercel.app/
   - Kindlein Stock — sistema de gestão de estoque 
     → https://stock.kindlein.business/
   - Kindlein Wallet/Finance — sistema financeiro 
     → https://finance.kindlein.business/
   - Puffs — projeto/loja de pods 
     → https://puffs.kindlein.business/
   - Goetten Store — loja online 
     → https://goetten-store.kindlein.business/
   
   Para cada card: nome do projeto, uma frase descrevendo o que é/resolve, 
   badges de tecnologia usada (Next.js, Tailwind, etc.), botão "Ver projeto" 
   linkando pra URL real. Deixar espaço de imagem/screenshot do projeto 
   (placeholder por enquanto — screenshots reais serão adicionados depois).

4. SERVIÇOS
   - O que a Kindlein oferece: sites institucionais, e-commerce, sistemas 
     internos (estoque, financeiro), automações

5. CONTATO
   - WhatsApp, e-mail, formulário simples (sem backend — pode ser link 
     mailto ou WhatsApp direto)

EVITAR:
- Gradiente roxo/azul genérico de IA
- Reaproveitar a paleta preto/dourado da Fabula (essa é identidade do 
  cliente, não da Kindlein)
- Ícones clichê de IA (foguete, lâmpada)
- Texto de preenchimento genérico ("lorem ipsum") — usar descrições reais 
  dos projetos listados acima

Referência de qualidade de componentes: shadcn/ui + Tailwind, ícones Lucide.
```
