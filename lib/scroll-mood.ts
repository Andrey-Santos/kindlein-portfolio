const smooth = (a: number, b: number, v: number) => {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

// "Clima" do fundo conforme o scroll: brilho verde no topo e no Contato,
// fumaca forte no Sobre e apagada em Projetos. Valores de 0 a 1.
/** Clima fixo das paginas sem Hero (detalhe de projeto, 404): fumaca suave o
 *  tempo todo, sem o brilho verde do topo. Pra fundo liso, troque smoke por 0. */
const INNER_PAGE = { glow: 0, smoke: 0.4 };

export function scrollMood() {
  if (!document.getElementById("top")) return INNER_PAGE;
  const vh = window.innerHeight;
  const y = window.scrollY;
  const projRect = document.getElementById("projetos")?.getBoundingClientRect();
  const projetos = projRect?.top ?? Infinity;
  const projetosEnd = projRect?.bottom ?? Infinity;
  const contato = document.getElementById("contato")?.getBoundingClientRect().top ?? Infinity;

  const leftHero = smooth(vh * 0.2, vh * 0.9, y);
  const beforeProjects = smooth(vh * 0.1, vh * 0.8, projetos);
  const nearContact = 1 - smooth(vh * 0.2, vh * 0.9, contato);
  const afterProjects = 1 - smooth(vh * 0.2, vh * 0.8, projetosEnd);

  return {
    /** Brilho verde do fundo. */
    glow: Math.max(1 - leftHero, nearContact),
    /** Fumaca: nada no Hero (foto precisa de fundo liso), forte no Sobre,
     *  apagada em Projetos, suave de Servicos pra baixo (0.2). */
    smoke: Math.min(0.9, 0.9 * leftHero * beforeProjects + 0.2 * afterProjects),
  };
}
