"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
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
  const [zoomed, setZoomed] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
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
    if (!zoomed && frame && frame.getBoundingClientRect().top < 0) {
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
      const center = (top + bottom) / 2 - box.top - (arrows.offsetHeight || 48) / 2;
      const size = arrows.offsetHeight || 48;
      arrows.style.transform = `translateY(${Math.min(Math.max(center, 12), box.height - size - 12)}px)`;
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

  // Ampliar abre por cima da pagina (sem nova aba, o visitante nao sai do site).
  useEffect(() => {
    if (!zoomed) return;
    const opener = openerRef.current;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomed(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [zoomed]);

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
            {/* No celular so o nome da tela; o dominio ja aparece no link "ver ao vivo". */}
            <span className="hidden sm:inline">
              {domain} <span className="text-foreground/40">/</span>{" "}
            </span>
            {screen.label}
          </span>
          {hasMany && (
            <span className="font-mono text-xs tabular-nums text-muted-foreground">
              {index + 1} / {screens.length}
            </span>
          )}
          <button
            ref={openerRef}
            type="button"
            onClick={() => setZoomed(true)}
            aria-label={`Ampliar ${screen.label}`}
            className="-my-2 inline-flex min-h-11 items-center gap-1.5 px-1 font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
          >
            <Maximize2 className="size-3.5" />
            <span className="hidden sm:inline">ampliar</span>
          </button>
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
            onClick={() => setZoomed(true)}
            src={screen.src}
            alt={`${name}, tela: ${screen.label}`}
            width={screen.width}
            height={screen.height}
            sizes="(min-width: 1440px) 900px, (min-width: 1024px) 60vw, 100vw"
            priority={index === 0}
            className="h-auto w-full cursor-zoom-in"
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
                  className="pointer-events-auto flex size-10 items-center justify-center rounded-full border border-white/15 bg-[#08090c]/65 text-white shadow-lg backdrop-blur-sm transition-colors before:absolute before:-inset-1 hover:border-primary/60 hover:text-primary sm:size-12 sm:bg-[#08090c]/80"
                >
                  {dir < 0 ? <ChevronLeft className="size-5" /> : <ChevronRight className="size-5" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-12">{body}</div>

      {zoomed && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${name}: ${screen.label} ampliada`}
          className="fixed inset-0 z-[60] overflow-y-auto overscroll-contain bg-[#050507]/95 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setZoomed(false);
          }}
        >
          <div className="sticky top-0 z-10 flex items-center justify-between gap-3 bg-[#050507]/90 px-4 py-3 backdrop-blur-md sm:px-8">
            <span className="min-w-0 truncate font-mono text-xs text-muted-foreground">
              {screen.label}
              {hasMany && (
                <span className="ml-3 tabular-nums">
                  {index + 1} / {screens.length}
                </span>
              )}
            </span>
            <div className="flex items-center gap-2">
              {hasMany &&
                ([-1, 1] as const).map((dir) => (
                  <button
                    key={dir}
                    type="button"
                    onClick={() => setIndex((i) => (i + dir + screens.length) % screens.length)}
                    aria-label={dir < 0 ? "Tela anterior" : "Próxima tela"}
                    className="flex size-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-primary/60 hover:text-primary"
                  >
                    {dir < 0 ? <ChevronLeft className="size-5" /> : <ChevronRight className="size-5" />}
                  </button>
                ))}
              <button
                ref={closeRef}
                type="button"
                onClick={() => setZoomed(false)}
                aria-label="Fechar"
                className="flex size-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-primary/60 hover:text-primary"
              >
                <X className="size-5" />
              </button>
            </div>
          </div>
          {/* Desktop: largura real da imagem (ate a tela). Celular: dobro da largura,
              arrasta pros lados pra ler os detalhes. Prints longos rolam pra baixo. */}
          <div className="overflow-x-auto px-2 pb-8 sm:px-8">
            <div className="mx-auto w-[200%] sm:w-auto" style={{ maxWidth: screen.width + 64 }}>
            <Image
              key={screen.src}
              src={screen.src}
              alt={`${name}, tela: ${screen.label}`}
              width={screen.width}
              height={screen.height}
              sizes="100vw"
              quality={90}
              className="h-auto w-full rounded-lg"
            />
            </div>
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className="lg:flex lg:items-start lg:gap-14">
      <aside className="lg:sticky lg:top-24 lg:w-[22rem] lg:shrink-0">
        {header}
        {/* No celular o CTA vem antes das telas, ja na primeira dobra. */}
        <div className="mt-8">{aside}</div>
        {!isDesktop && <div className="mt-10">{main}</div>}

        <div className="mt-10">{next}</div>
      </aside>

      {isDesktop && <div className="min-w-0 flex-1">{main}</div>}
    </div>
  );
}
