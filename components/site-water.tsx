"use client";

import { useEffect, useRef } from "react";

const SPACING = 24;
const GREEN = "16, 185, 129";

// Grade de pontos que ondula como superficie de agua. Fica atras de tudo,
// com opacidade baixa; o scroll acelera um pouco a correnteza.
export function SiteWater() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let t = 0;
    let boost = 0;
    let lastY = window.scrollY;
    let frame = 0;
    let last = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let x = 0; x <= w + SPACING; x += SPACING) {
        for (let y = 0; y <= h + SPACING; y += SPACING) {
          const z =
            Math.sin(x * 0.012 + t) * Math.cos(y * 0.014 - t * 0.8) +
            Math.sin((x + y) * 0.007 + t * 1.3) * 0.6;
          const alpha = 0.07 + 0.3 * ((z + 1.6) / 3.2);
          const size = 1.6 + z * 0.5;
          ctx.fillStyle = `rgba(${GREEN}, ${alpha})`;
          ctx.fillRect(x - size / 2, y + z * 6 - size / 2, size, size);
        }
      }
    };

    // ~30fps: o movimento e lento, nao precisa de 60.
    const loop = (now: number) => {
      frame = requestAnimationFrame(loop);
      if (now - last < 33) return;
      last = now;
      t += 0.012 + boost;
      boost *= 0.92;
      draw();
    };

    const onScroll = () => {
      const y = window.scrollY;
      boost = Math.min(0.06, boost + Math.abs(y - lastY) * 0.00006);
      lastY = y;
    };

    const onVisibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden) frame = requestAnimationFrame(loop);
    };

    const onResize = () => {
      resize();
      draw();
    };

    onResize();
    window.addEventListener("resize", onResize);
    if (reduce) return () => window.removeEventListener("resize", onResize);

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 size-full" />;
}
