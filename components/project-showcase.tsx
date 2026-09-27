"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";
import type { Screen } from "@/lib/data";

const number = (i: number) => String(i + 1).padStart(2, "0");

// Move o foco pro botao vizinho (esquerda/cima ou direita/baixo) na mesma lista de abas.
function focusSibling(e: React.KeyboardEvent, delta: 1 | -1, count: number, i: number, setIndex: (i: number) => void) {
  if (!["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(e.key)) return;
  e.preventDefault();
  const dir = e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 1;
  const next = (i + dir * delta + count) % count;
  setIndex(next);
  const list = e.currentTarget.parentElement?.children;
  (list?.[next] as HTMLElement | undefined)?.focus();
}

export function ProjectShowcase({
  name,
  domain,
  screens,
  cover,
  header,
  aside,
  body,
  next,
}: {
  name: string;
  domain: string;
  screens: Screen[];
  cover: string;
  /** Titulo e resumo curto (topo da lateral / topo no mobile). */
  header: React.ReactNode;
  /** CTA e link ao vivo, logo abaixo do resumo. */
  aside: React.ReactNode;
  /** Texto completo do case, abaixo das telas. */
  body: React.ReactNode;
  next: React.ReactNode;
}) {
  const [index, setIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);
  const screen = screens[index];
  const hasTabs = screens.length > 1;

  // Sidebar vira sticky ao lado do conteudo (desktop) ou empilha (mobile);
  // no mobile as telas aparecem logo apos o titulo, antes do texto do case.
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  const main = (
    <>
      <div className="relative aspect-video overflow-hidden rounded-xl border border-border">
        <Image
          src={cover}
          alt={`${name}, capa`}
          fill
          priority
          sizes="(min-width: 1440px) 900px, (min-width: 1024px) 60vw, 100vw"
          className="object-cover"
        />
      </div>

      {hasTabs && (
        <div
          role="tablist"
          aria-label="Telas do projeto"
          // Fade na direita avisa que as abas continuam ao arrastar.
          className="-mx-1 mb-4 mt-10 flex gap-2 overflow-x-auto px-1 pb-1 [mask-image:linear-gradient(to_right,black_80%,transparent)] lg:hidden"
        >
          {screens.map((s, i) => (
            <button
              key={s.src}
              type="button"
              role="tab"
              id={`tab-mobile-${i}`}
              aria-selected={i === index}
              aria-controls="project-screen-panel"
              onClick={() => setIndex(i)}
              onKeyDown={(e) => focusSibling(e, 1, screens.length, i, setIndex)}
              className={`min-h-11 shrink-0 rounded-full border px-4 font-mono text-xs transition-colors ${
                i === index
                  ? "border-primary/60 bg-primary/15 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {number(i)} {s.label}
            </button>
          ))}
        </div>
      )}

      <div className={`overflow-hidden rounded-xl border border-border bg-card ${hasTabs ? "lg:mt-10" : "mt-10"}`}>
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <span aria-hidden="true" className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-foreground/15" />
            <span className="size-2.5 rounded-full bg-foreground/15" />
            <span className="size-2.5 rounded-full bg-foreground/15" />
          </span>
          <span className="min-w-0 flex-1 truncate font-mono text-xs text-muted-foreground">
            {domain} <span className="text-foreground/40">/</span> {screen.label}
          </span>
          <a
            href={screen.src}
            target="_blank"
            rel="noopener"
            className="inline-flex min-h-8 items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
          >
            <Maximize2 className="size-3.5" />
            <span className="hidden sm:inline">tamanho real</span>
          </a>
        </div>
        {/* Imagem no tamanho natural: a pagina rola, sem area de scroll presa por dentro. */}
        <div id="project-screen-panel" role="tabpanel" aria-label={screen.label} className="bg-background/40">
          <Image
            src={screen.src}
            alt={`${name}, tela: ${screen.label}`}
            width={screen.width}
            height={screen.height}
            sizes="(min-width: 1440px) 900px, (min-width: 1024px) 60vw, 100vw"
            className="h-auto w-full"
          />
        </div>
      </div>

      <div className="mt-12">{body}</div>
    </>
  );

  return (
    <div className="lg:flex lg:items-start lg:gap-14">
      <aside className="lg:sticky lg:top-24 lg:w-[22rem] lg:shrink-0">
        {header}
        {!isDesktop && <div className="mt-8">{main}</div>}
        <div className="mt-8">{aside}</div>

        {hasTabs && (
          <nav aria-label="Telas do projeto" className="mt-10 hidden lg:block">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">Telas</p>
            <ol className="mt-3 border-l border-border">
              {screens.map((s, i) => (
                <li key={s.src}>
                  <button
                    type="button"
                    role="tab"
                    id={`tab-desktop-${i}`}
                    aria-selected={i === index}
                    aria-controls="project-screen-panel"
                    onClick={() => setIndex(i)}
                    onKeyDown={(e) => focusSibling(e, 1, screens.length, i, setIndex)}
                    className={`-ml-px flex min-h-11 w-full items-center gap-3 border-l-2 pl-4 text-left text-sm transition-colors ${
                      i === index
                        ? "border-primary text-foreground"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className={`font-mono text-xs ${i === index ? "text-primary" : ""}`}>{number(i)}</span>
                    {s.label}
                  </button>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="mt-10">{next}</div>
      </aside>

      {isDesktop && <div className="min-w-0 flex-1">{main}</div>}
    </div>
  );
}
