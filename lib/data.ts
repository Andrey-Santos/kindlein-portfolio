export type Project = {
  name: string;
  description: string;
  stack: string[];
  url: string;
  /** Screenshots do projeto (caminhos em /public). Vazio = mostra o dominio. */
  images: string[];
  /** Produto proprio da Kindlein em producao. */
  own?: boolean;
};

export const projects: Project[] = [
  {
    name: "Kindlein Stock",
    description: "Sistema de gestão de estoque sob medida.",
    stack: ["Next.js", "TypeScript", "PostgreSQL"],
    url: "https://stock.kindlein.business/",
    images: [],
    own: true,
  },
  {
    name: "Kindlein Finance",
    description: "Sistema financeiro para controle de receitas e despesas.",
    stack: ["Next.js", "TypeScript", "PostgreSQL"],
    url: "https://finance.kindlein.business/",
    images: [],
    own: true,
  },
  {
    name: "Fabula",
    description:
      "Loja de moda feminina com e-commerce completo: carrinho e checkout.",
    stack: ["Next.js", "Tailwind CSS", "E-commerce"],
    url: "https://fabula-delta.vercel.app/",
    images: [],
  },
  {
    name: "Metálica 3W",
    description: "Site institucional para empresa do setor metalúrgico.",
    stack: ["Next.js", "Tailwind CSS"],
    url: "https://3wsite.vercel.app/",
    images: [],
  },
  {
    name: "Puffs",
    description: "Loja online voltada pro nicho de pods.",
    stack: ["Next.js", "Tailwind CSS", "E-commerce"],
    url: "https://puffs.kindlein.business/",
    images: [],
  },
  {
    name: "Goetten Store",
    description: "Loja online com catálogo e vendas diretas.",
    stack: ["Next.js", "Tailwind CSS", "E-commerce"],
    url: "https://goetten-store.kindlein.business/",
    images: [],
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
