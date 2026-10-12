"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/lib/data";

// Carrossel horizontal com scroll-snap nativo (toque/trackpad) e setas no desktop.
// Cada card e grande e o proximo aparece "espiando" na borda direita.
export function ProjectCarousel({ projects }: { projects: Project[] }) {
  const track = useRef<HTMLUListElement>(null);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = (card?.offsetWidth ?? el.clientWidth) + 24;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const arrow =
    "hidden size-11 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-sm transition-colors hover:border-primary/60 hover:text-primary sm:flex";

  return (
    <div className="mt-12">
      <ul
        ref={track}
        aria-label="Projetos entregues"
        className="[--gutter:1.5rem] sm:[--gutter:2.5rem] lg:[--gutter:4rem] xl:[--gutter:5rem] flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain px-(--gutter) scroll-px-(--gutter) pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((project) => (
          <li
            key={project.name}
            className="flex w-[82vw] max-w-[44rem] shrink-0 snap-start sm:w-[60vw] lg:w-[44rem]"
          >
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
      <div className="shell mt-6 flex justify-end gap-3">
        <button type="button" aria-label="Projeto anterior" onClick={() => go(-1)} className={arrow}>
          <ChevronLeft aria-hidden="true" className="size-5" />
        </button>
        <button type="button" aria-label="Próximo projeto" onClick={() => go(1)} className={arrow}>
          <ChevronRight aria-hidden="true" className="size-5" />
        </button>
      </div>
    </div>
  );
}
