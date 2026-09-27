const smooth = (a: number, b: number, v: number) => {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

// "Clima" do fundo conforme o scroll: verde no topo, preto no meio com a agua
// em destaque no Sobre, verde de novo no Contato. Valores de 0 a 1.
export function scrollMood() {
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
    /** Destaque da agua (pontos maiores, mais fortes e pulando mais). */
    water: leftHero * beforeProjects,
    /** Fumaca: nada no Hero (foto precisa de fundo liso), forte no Sobre,
     *  apagada em Projetos, suave de Servicos pra baixo (0.2). */
    smoke: Math.min(0.9, 0.9 * leftHero * beforeProjects + 0.2 * afterProjects),
  };
}
