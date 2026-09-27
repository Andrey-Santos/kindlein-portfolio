"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import type { Screen } from "@/lib/data";

export function ProjectShowcase({
  name,
  domain,
  screens: projectScreens,
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
  // A capa entra como primeira tela do carrossel.
  const screens: Screen[] = [{ src: cover, label: "Capa", width: 1920, height: 1080 }, ...projectScreens];
  const [index, setIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);
  const screen = screens[index];
  const hasMany = screens.length > 1;
  const frameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const arrowsRef = useRef<HTMLDivElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);

  const go = (dir: 1 | -1) => {
    setIndex((i) => (i + dir + screens.length) % screens.length);
    // Se a tela anterior era longa e o visitante rolou, volta pro topo da moldura.
    const frame = frameRef.current;
    if (frame && frame.getBoundingClientRect().top < 0) {
      frame.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Setas sempre no centro da parte visivel da imagem: no meio dos prints curtos,
  // acompanhando a tela nos longos. Escrito direto no estilo, sem re-render.
  useEffect(() => {
    if (!hasMany) return;
    let frame = 0;
    const place = () => {
      frame = 0;
      const box = imageRef.current?.getBoundingClientRect();
      const arrows = arrowsRef.current;
      if (!box || !arrows) return;
      const top = Math.max(box.top, 64);
      const bottom = Math.min(box.bottom, window.innerHeight);
      const center = (top + bottom) / 2 - box.top - 24;
      arrows.style.transform = `translateY(${Math.min(Math.max(center, 16), box.height - 64)}px)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(place);
    };
    place();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [hasMany, index]);

  // Setas esquerda/direita do teclado trocam a tela (a pagina de projeto nao usa slides).
  useEffect(() => {
    if (!hasMany) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.target instanceof Element && e.target.closest("input, textarea, select, [contenteditable='true']")) return;
      if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

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
      <div
        ref={frameRef}
        role={hasMany ? "region" : undefined}
        aria-roledescription={hasMany ? "carrossel" : undefined}
        aria-label={hasMany ? `Telas do projeto ${name}` : undefined}
        className="scroll-mt-24 overflow-hidden rounded-xl border border-border bg-card"
      >
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <span aria-hidden="true" className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-foreground/15" />
            <span className="size-2.5 rounded-full bg-foreground/15" />
            <span className="size-2.5 rounded-full bg-foreground/15" />
          </span>
          <span aria-live="polite" className="min-w-0 flex-1 truncate font-mono text-xs text-muted-foreground">
            {domain} <span className="text-foreground/40">/</span> {screen.label}
          </span>
          {hasMany && (
            <span className="font-mono text-xs tabular-nums text-muted-foreground">
              {index + 1} / {screens.length}
            </span>
          )}
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
        {/* Imagem no tamanho natural: a pagina rola, sem area de scroll presa por dentro.
            No celular, deslizar pro lado troca a tela. */}
        <div
          ref={imageRef}
          className="relative bg-background/40"
          onTouchStart={(e) => (touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY })}
          onTouchEnd={(e) => {
            if (!hasMany || !touch.current) return;
            const dx = e.changedTouches[0].clientX - touch.current.x;
            const dy = e.changedTouches[0].clientY - touch.current.y;
            touch.current = null;
            // So gesto claramente horizontal troca a tela; rolagem vertical com
            // desvio pro lado nao.
            if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) go(dx < 0 ? 1 : -1);
          }}
        >
          <Image
            src={screen.src}
            alt={`${name}, tela: ${screen.label}`}
            width={screen.width}
            height={screen.height}
            sizes="(min-width: 1440px) 900px, (min-width: 1024px) 60vw, 100vw"
            priority={index === 0}
            className="h-auto w-full"
          />
          {hasMany && (
            <div
              ref={arrowsRef}
              className="pointer-events-none absolute inset-x-0 top-0 flex justify-between px-3"
            >
              {([-1, 1] as const).map((dir) => (
                <button
                  key={dir}
                  type="button"
                  onClick={() => go(dir)}
                  aria-label={dir < 0 ? "Tela anterior" : "Próxima tela"}
                  className="pointer-events-auto flex size-12 items-center justify-center rounded-full border border-white/15 bg-[#08090c]/80 text-white shadow-lg backdrop-blur-sm transition-colors hover:border-primary/60 hover:text-primary"
                >
                  {dir < 0 ? <ChevronLeft className="size-5" /> : <ChevronRight className="size-5" />}
                </button>
              ))}
            </div>
          )}
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

        <div className="mt-10">{next}</div>
      </aside>

      {isDesktop && <div className="min-w-0 flex-1">{main}</div>}
    </div>
  );
}
