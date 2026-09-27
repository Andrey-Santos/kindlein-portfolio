"use client";

import { useEffect } from "react";

const DURATION_MS = 700;
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

// Troca o snap nativo (rapido demais, sem controle de duracao) por uma
// transicao animada quando o scroll vem da roda do mouse / trackpad ou do teclado
// (setas, Page Up/Down, espaco). O toque continua no scroll-snap nativo do CSS.
export function SlideScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const html = document.documentElement;
    let busy = false;
    let lastWheel = 0;
    let frame = 0;

    const snapPoints = () => {
      const max = html.scrollHeight - window.innerHeight;
      const points = [...document.querySelectorAll<HTMLElement>(".snap-start, .snap-end")].map(
        (el) => {
          const rect = el.getBoundingClientRect();
          if (el.classList.contains("snap-end")) {
            return rect.bottom + window.scrollY - window.innerHeight;
          }
          const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
          return rect.top + window.scrollY - margin;
        }
      );
      return points.map((y) => Math.min(max, Math.max(0, Math.round(y)))).sort((a, b) => a - b);
    };

    const animateTo = (target: number) => {
      const start = window.scrollY;
      const t0 = performance.now();
      busy = true;

      const step = (now: number) => {
        const t = Math.min(1, (now - t0) / DURATION_MS);
        window.scrollTo({ top: start + (target - start) * ease(t), behavior: "instant" });
        if (t < 1) {
          frame = requestAnimationFrame(step);
          return;
        }
        // Espera a inercia do trackpad acabar antes de aceitar o proximo gesto.
        const release = () => {
          if (performance.now() - lastWheel < 150) {
            frame = requestAnimationFrame(release);
            return;
          }
          busy = false;
        };
        release();
      };
      frame = requestAnimationFrame(step);
    };

    // Decide o proximo slide e anima ate ele. Retorna false quando o gesto deve
    // seguir nativo (pagina sem slides, ou rolando por dentro de secao alta).
    const slide = (down: boolean, delta: number) => {
      // Pagina sem nenhum marcador de slide (ex.: /projetos/[slug]): nada a fazer aqui.
      if (!document.querySelector(".snap-start, .snap-end")) return false;

      // Quem usa roda/teclado fica 100% no controle do JS: o snap nativo do CSS
      // faria a saida de secoes altas (Projetos) num pulo rapido.
      html.style.scrollSnapType = "none";

      // Secao mais alta que a tela (Projetos): rola livre por dentro; o gesto
      // que passaria da borda vira a transicao animada pro slide seguinte.
      const insideTall = [...document.querySelectorAll<HTMLElement>(".snap-start:not(span)")].some(
        (el) => {
          const r = el.getBoundingClientRect();
          const line = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
          if (r.height <= window.innerHeight - line + 2) return false;
          return down
            ? r.top <= line + 2 && r.bottom - window.innerHeight > delta
            : r.bottom > line && line - r.top > delta;
        }
      );
      if (insideTall) return false;

      const y = window.scrollY;
      const points = snapPoints();
      let next = down ? points.find((p) => p > y + 2) : points.findLast((p) => p < y - 2);
      if (next === undefined) return false;

      // Subindo pra uma secao alta: para no fim dela, nao no topo.
      if (!down) {
        const tall = [...document.querySelectorAll<HTMLElement>(".snap-start:not(span)")].find(
          (el) => {
            const r = el.getBoundingClientRect();
            return r.height > window.innerHeight && r.bottom <= window.innerHeight + 2;
          }
        );
        if (tall) {
          const end = tall.getBoundingClientRect().bottom + y - window.innerHeight;
          if (end > next && end < y - 2) next = Math.round(end);
        }
      }

      animateTo(next);
      return true;
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
      lastWheel = performance.now();
      if (busy) {
        e.preventDefault();
        return;
      }
      if (Math.abs(e.deltaY) < 4) return;
      const delta = Math.abs(e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY);
      if (slide(e.deltaY > 0, delta)) e.preventDefault();
    };

    // Teclas de rolagem viram a mesma transicao; o "delta" imita o quanto a
    // tecla rolaria nativamente (usado pra rolar livre dentro de Projetos).
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey) return;
      const target = e.target instanceof Element ? e.target : null;
      if (target?.closest("input, textarea, select, [contenteditable='true']")) return;
      // Espaco em botao focado e clique, nao rolagem.
      if (e.key === " " && target?.closest("button, [role='button'], summary")) return;

      const page = window.innerHeight * 0.85;
      const keys: Record<string, [boolean, number]> = {
        ArrowDown: [true, 40],
        ArrowUp: [false, 40],
        PageDown: [true, page],
        PageUp: [false, page],
        " ": [!e.shiftKey, page],
      };
      const hit = keys[e.key];
      if (!hit) return;
      if (busy) {
        e.preventDefault();
        return;
      }
      if (slide(hit[0], hit[1])) e.preventDefault();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      cancelAnimationFrame(frame);
      html.style.scrollSnapType = "";
    };
  }, []);

  return null;
}
