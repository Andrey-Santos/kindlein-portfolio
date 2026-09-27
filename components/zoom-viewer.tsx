"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Minus, Plus, X } from "lucide-react";
import type { Screen } from "@/lib/data";

const MIN = 1;
const MAX = 4;
const clamp = (v: number) => Math.min(MAX, Math.max(MIN, v));

// Tela ampliada por cima da pagina (sem nova aba), com zoom de verdade:
// botoes -/+, pinca no celular, toque/clique duplo e teclas +/-.
export function ZoomViewer({
  name,
  screen,
  index,
  total,
  onPrev,
  onNext,
  onClose,
}: {
  name: string;
  screen: Screen;
  index: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
}) {
  // Zoom guardado junto com a tela: trocar de tela volta pro 100% sem efeito extra.
  const [zoom, setZoom] = useState({ src: screen.src, scale: 1 });
  const scale = zoom.src === screen.src ? zoom.scale : 1;
  const setScale = (value: number) => setZoom({ src: screen.src, scale: value });
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  // Ponto (0..1 do conteudo) que deve continuar no mesmo lugar da tela apos o zoom.
  const anchor = useRef<{ fx: number; fy: number; vx: number; vy: number } | null>(null);
  const lastTap = useRef(0);

  const zoomTo = (next: number, clientX?: number, clientY?: number) => {
    const el = scrollRef.current;
    const value = clamp(next);
    if (!el || value === scale) return;
    const box = el.getBoundingClientRect();
    const vx = (clientX ?? box.left + box.width / 2) - box.left;
    const vy = (clientY ?? box.top + box.height / 2) - box.top;
    anchor.current = {
      fx: (el.scrollLeft + vx) / el.scrollWidth,
      fy: (el.scrollTop + vy) / el.scrollHeight,
      vx,
      vy,
    };
    setScale(value);
  };

  // Mantem o ponto de foco parado enquanto a imagem cresce/encolhe.
  useLayoutEffect(() => {
    const el = scrollRef.current;
    const a = anchor.current;
    if (!el || !a) return;
    el.scrollLeft = a.fx * el.scrollWidth - a.vx;
    el.scrollTop = a.fy * el.scrollHeight - a.vy;
    anchor.current = null;
  }, [scale]);

  // Troca de tela volta pro topo.
  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  }, [screen.src]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "+" || e.key === "=") zoomTo(scale * 1.5);
      else if (e.key === "-") zoomTo(scale / 1.5);
      else if (e.key === "0") zoomTo(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // Pinca: precisa de listener nao-passivo pra impedir o zoom da pagina inteira.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let start: { dist: number; scale: number } | null = null;
    const dist = (t: TouchList) => Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);
    const onStart = (e: TouchEvent) => {
      if (e.touches.length === 2) start = { dist: dist(e.touches), scale };
    };
    const onMove = (e: TouchEvent) => {
      if (!start || e.touches.length !== 2) return;
      e.preventDefault();
      const cx = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const cy = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      zoomTo(start.scale * (dist(e.touches) / start.dist), cx, cy);
    };
    const onEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) start = null;
    };
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: false });
    el.addEventListener("touchend", onEnd);
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
    };
  });

  const toggleAt = (x: number, y: number) => zoomTo(scale > 1 ? 1 : 2.5, x, y);

  const iconButton =
    "flex size-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-primary/60 hover:text-primary disabled:opacity-35 disabled:hover:border-white/15 disabled:hover:text-white";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${name}: ${screen.label} ampliada`}
      className="fixed inset-0 z-[60] flex flex-col bg-[#050507]"
    >
      <div className="flex shrink-0 items-center gap-2 border-b border-white/10 px-3 py-2 sm:gap-3 sm:px-6">
        <span className="min-w-0 flex-1 truncate font-mono text-xs text-muted-foreground">
          {screen.label}
          {total > 1 && (
            <span className="ml-2 tabular-nums">
              {index + 1} / {total}
            </span>
          )}
        </span>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button type="button" onClick={() => zoomTo(scale / 1.5)} disabled={scale <= MIN} aria-label="Diminuir zoom" className={iconButton}>
            <Minus className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => zoomTo(1)}
            aria-label="Voltar ao tamanho inteiro"
            className="min-h-11 w-14 font-mono text-xs tabular-nums text-white transition-colors hover:text-primary"
          >
            {Math.round(scale * 100)}%
          </button>
          <button type="button" onClick={() => zoomTo(scale * 1.5)} disabled={scale >= MAX} aria-label="Aumentar zoom" className={iconButton}>
            <Plus className="size-4" />
          </button>
        </div>

        {total > 1 && (
          <div className="hidden items-center gap-2 sm:flex">
            <button type="button" onClick={onPrev} aria-label="Tela anterior" className={iconButton}>
              <ChevronLeft className="size-5" />
            </button>
            <button type="button" onClick={onNext} aria-label="Próxima tela" className={iconButton}>
              <ChevronRight className="size-5" />
            </button>
          </div>
        )}

        <button ref={closeRef} type="button" onClick={onClose} aria-label="Fechar" className={iconButton}>
          <X className="size-5" />
        </button>
      </div>

      <div
        ref={scrollRef}
        className="relative min-h-0 flex-1 overflow-auto overscroll-contain [touch-action:pan-x_pan-y]"
        onDoubleClick={(e) => toggleAt(e.clientX, e.clientY)}
        onTouchEnd={(e) => {
          if (e.changedTouches.length !== 1 || e.touches.length > 0) return;
          const now = Date.now();
          if (now - lastTap.current < 300) {
            toggleAt(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
            lastTap.current = 0;
          } else lastTap.current = now;
        }}
      >
        {/* Em 100% a imagem cabe na largura (ate o tamanho real); acima disso cresce e
            da pra arrastar em qualquer direcao. */}
        <div
          className="mx-auto p-2 sm:p-6"
          style={{ width: `${scale * 100}%`, maxWidth: scale === 1 ? screen.width + 48 : undefined }}
        >
          <Image
            key={screen.src}
            src={screen.src}
            alt={`${name}, tela: ${screen.label}`}
            width={screen.width}
            height={screen.height}
            unoptimized
            draggable={false}
            className={`h-auto w-full select-none rounded-lg ${scale > 1 ? "cursor-zoom-out" : "cursor-zoom-in"}`}
          />
        </div>
      </div>

      {total > 1 && (
        <div className="flex shrink-0 items-center justify-between border-t border-white/10 px-3 py-2 sm:hidden">
          <button type="button" onClick={onPrev} aria-label="Tela anterior" className={iconButton}>
            <ChevronLeft className="size-5" />
          </button>
          <span className="font-mono text-xs text-muted-foreground">toque duplo ou pinça pra zoom</span>
          <button type="button" onClick={onNext} aria-label="Próxima tela" className={iconButton}>
            <ChevronRight className="size-5" />
          </button>
        </div>
      )}
    </div>
  );
}
