export type Project = {
  name: string;
  /** Frase curta de resultado, mostrada no card da home. */
  description: string;
  /** Tipo do projeto, mostrado no card (ex.: "Sistema", "Loja online"). */
  kind: string;
  stack: string[];
  url: string;
  /** Capa do projeto (16:9), usada no card e no compartilhamento. */
  cover: string;
  /** Produto proprio da Kindlein em producao. */
  own?: boolean;
  /** Projeto feito como proposta/conceito, sem ter ido pra producao. */
  concept?: boolean;
  /** URL da pagina do case: /projetos/<slug>. */
  slug: string;
  /** Texto do case, mostrado na pagina do projeto. */
  about: string;
  /** Telas em tamanho real (em /public/projects/full) pra pagina do projeto. */
  screens: Screen[];
};

export type Screen = { src: string; label: string; width: number; height: number };

const screen = (file: string, label: string, width: number, height: number): Screen => ({
  src: `/projects/full/${file}.webp`,
  label,
  width,
  height,
});

export const projects: Project[] = [
  {
    name: "Kindlein Stock",
    description: "Gestão de estoque com vendas, compras, caixa e relatórios financeiros num lugar só.",
    kind: "Sistema",
    stack: ["Next.js", "TypeScript", "PostgreSQL"],
    url: "https://stock.kindlein.business/",
    cover: "/projects/stock-capa.webp",
    own: true,
    slug: "kindlein-stock",
    about:
      "Controle de estoque manual não avisa quando um produto vai faltar, e o dinheiro do caixa some numa planilha à parte. O Kindlein Stock junta as duas pontas: cada entrada, saída e ajuste fica registrado por produto e variação, o sistema avisa estoque baixo antes de faltar de verdade, e vendas, compras e caixa se encontram no financeiro — com curva ABC, ritmo de vendas e o resultado do mês pronto num DRE simples, sem depender de planilha.",
    screens: [
      screen("kindlein-stock-dashboard", "Dashboard", 1696, 1167),
      screen("kindlein-stock-estoque", "Visão geral do estoque", 1656, 1226),
      screen("kindlein-stock-relatorios", "Relatórios", 1696, 4430),
      screen("kindlein-stock-financeiro", "Financeiro (DRE)", 1696, 1647),
      screen("kindlein-stock-caixas", "Caixas e bancos", 1656, 3228),
    ],
  },
  {
    name: "Kindlein Wallet",
    description: "Controle financeiro com contas, cartões e faturas, e app Android que lança Pix e compras pela notificação.",
    kind: "Sistema",
    stack: ["Next.js", "TypeScript", "PostgreSQL"],
    url: "https://finance.kindlein.business/",
    cover: "/projects/wallet-capa.webp",
    own: true,
    slug: "kindlein-wallet",
    about:
      "Quem toca o próprio negócio raramente sabe, com certeza, se o mês vai fechar no azul. O Kindlein Wallet junta contas bancárias, cartões, faturas e transações planejadas num só lugar e mostra o saldo previsto antes de o mês terminar — pra decidir com dado, não no aperto. O app Android lê a notificação de Pix e de cartão na hora que ela chega e já lança a transação sozinho, sem digitar nada.",
    screens: [
      screen("kindlein-wallet-dashboard", "Dashboard", 1920, 1306),
      screen("kindlein-wallet-relatorio", "Relatório", 1920, 2884),
      screen("kindlein-wallet-lancamento", "Nova transação", 1920, 959),
      screen("kindlein-wallet-contas", "Contas bancárias", 1920, 2044),
    ],
  },
  {
    name: "Kabum Puffs",
    description: "Venda de pods com catálogo por marca e sabor, carrinho e opção de entrega ou retirada.",
    kind: "E-commerce",
    stack: ["Next.js", "Tailwind CSS", "E-commerce"],
    url: "https://puffs.kindlein.business/",
    cover: "/projects/kabum-capa.webp",
    slug: "kabum-puffs",
    about:
      "Loja de nicho precisa parecer loja de nicho, não um template genérico com produtos trocados. Construí o catálogo com filtro por marca, estoque e faixa de preço, ficha de produto com escolha de sabor e um carrinho que já resolve entrega ou retirada — com a identidade visual pesada que a marca pedia, não a de uma loja qualquer.",
    screens: [
      screen("kabum-puffs-home", "Home", 1920, 1788),
      screen("kabum-puffs-catalogo", "Catálogo", 1920, 1513),
      screen("kabum-puffs-produto", "Página de produto", 1920, 3382),
      screen("kabum-puffs-carrinho", "Carrinho", 1920, 1067),
    ],
  },
  {
    name: "Goetten Store",
    description: "Produtos profissionais para lash designers, organizados por coleção.",
    kind: "E-commerce",
    stack: ["Next.js", "Tailwind CSS", "E-commerce"],
    url: "https://goetten-store.kindlein.business/",
    cover: "/projects/goetten-capa.webp",
    slug: "goetten-store",
    about:
      "Lash designer compra material com frequência e não tem tempo pra procurar. A loja organiza por coleção, destaca ofertas da semana e os mais vendidos pra encurtar essa decisão, e deixa o WhatsApp sempre à mão pra quem prefere fechar direto com a Goetten.",
    screens: [
      screen("goetten-store-home", "Home completa", 1920, 6857),
    ],
  },
  {
    name: "Fabula",
    description: "Moda feminina da loja física de Rio do Sul, com carrinho e checkout.",
    kind: "E-commerce",
    stack: ["Next.js", "Tailwind CSS", "E-commerce"],
    url: "https://fabula-delta.vercel.app/",
    cover: "/projects/fabula-capa.webp",
    concept: true,
    slug: "fabula",
    about:
      "Loja física de Rio do Sul, SC, com clientela fiel que ainda não tinha uma vitrine online à altura. O site organiza por categoria, destaca novidades e fecha a venda com carrinho e checkout — mantendo a mesma identidade e o mesmo cuidado da loja física.",
    screens: [
      { src: "/projects/fabula-1.webp", label: "Hero", width: 1920, height: 1080 },
      { src: "/projects/fabula-2.webp", label: "Categorias e novidades", width: 1920, height: 1080 },
      { src: "/projects/fabula-3.webp", label: "História da loja e clientes", width: 1920, height: 1080 },
    ],
  },
  {
    name: "Metálica 3W",
    description: "Estruturas metálicas, com o galpão se montando na tela, obras entregues e avaliações.",
    kind: "Site institucional",
    stack: ["Next.js", "Tailwind CSS"],
    url: "https://3wsite.vercel.app/",
    cover: "/projects/3w-capa.webp",
    concept: true,
    slug: "metalica-3w",
    about:
      "Empresa de estruturas metálicas com obra forte e site que não mostrava isso. O novo site monta o galpão na tela conforme a página rola — um jeito de mostrar, na prática, o que a 3W constrói — e emenda direto pra prova social: obras entregues e avaliações reais do Google.",
    screens: [
      { src: "/projects/3w-1.webp", label: "Hero com o galpão montado", width: 1920, height: 1080 },
      { src: "/projects/3w-2.webp", label: "Serviços", width: 1920, height: 1080 },
      { src: "/projects/3w-3.webp", label: "Obras entregues", width: 1920, height: 1080 },
      { src: "/projects/3w-4.webp", label: "Avaliações", width: 1920, height: 1080 },
    ],
  },
];

export type Service = {
  title: string;
  description: string;
};

export const services: Service[] = [
  {
    title: "Sites institucionais",
    description:
      "Presença online rápida, responsiva e com identidade visual própria pro seu negócio.",
  },
  {
    title: "E-commerce",
    description:
      "Loja completa com carrinho, checkout e catálogo de produtos, sob medida pro seu fluxo de venda.",
  },
  {
    title: "Sistemas internos",
    description:
      "Controle de estoque, financeiro e outras rotinas do negócio em um sistema feito pra sua operação.",
  },
  {
    title: "Automações",
    description:
      "Integrações e automações que tiram trabalho manual repetitivo do seu dia a dia.",
  },
];

export const contact = {
  whatsapp: "5547988762959",
  whatsappDisplay: "(47) 98876-2959",
  location: "Rio do Sul – SC, Brasil",
  email: "kindlein.business@gmail.com",
  linkedin: "https://www.linkedin.com/in/andrey-c-santos/",
  github: "https://github.com/Andrey-Santos",
};

/** Link do WhatsApp com mensagem pronta; usado em todos os CTAs. */
export const whatsappHref = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
  "Olá! Vi seu portfólio e quero conversar sobre um projeto."
)}`;
