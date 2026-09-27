import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/lib/data";

// A capa e o card: a imagem ocupa o topo inteiro e se dissolve num escuro
// onde fica o texto, sem caixa cinza separada.
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projetos/${project.slug}`}
      className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#0a0b0e] outline-offset-4 transition-colors hover:border-primary/50"
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.cover}
          alt=""
          fill
          sizes="(min-width: 1440px) 640px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        {project.concept && (
          <span className="absolute right-3 top-3 z-10 rounded-full border border-white/25 bg-black/60 px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-white backdrop-blur-sm">
            Projeto conceito
          </span>
        )}
        {/* Dissolve a capa no fundo do card; o texto so comeca onde ja esta escuro. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-3/5 bg-[linear-gradient(to_bottom,transparent,rgb(10_11_14/0.55)_45%,rgb(10_11_14/0.9)_75%,#0a0b0e)]"
        />
      </div>

      <div className="relative -mt-6 flex flex-1 flex-col px-5 sm:px-7">
        <div className="min-w-0 flex-1">
          <h3 className="font-heading text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {project.name}
          </h3>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-white/55">
            {project.kind}
            {project.own && " · produto próprio"}
          </p>
          <span aria-hidden="true" className="mt-3 block h-0.5 w-8 rounded-full bg-primary" />
          <p className="mt-3 text-pretty text-sm leading-relaxed text-white/70">
            {project.description}
          </p>
        </div>
      </div>

      {/* Rodape do proprio card: faixa de ponta a ponta com o verde subindo do pe. */}
      <span className="mt-6 flex items-center justify-center gap-2 border-t border-primary/20 bg-[radial-gradient(ellipse_70%_140%_at_50%_100%,rgb(16_185_129/0.3),transparent_70%)] py-4 text-sm font-medium text-white transition-colors group-hover:border-primary/50 group-hover:text-primary">
        Ver detalhes
        <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
