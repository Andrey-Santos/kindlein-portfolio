"use client";

import { useEffect, useRef } from "react";

const GAP = 56;
const GREEN = "16, 185, 129";

// Correnteza: linhas finas descendo como um rio visto de cima, ondulando.
// Variante em teste da SiteWater (grade de pontos); troca em site-glow.tsx.
export function SiteCurrent() {
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
      ctx.lineWidth = 1;
      const count = Math.ceil((w * 1.4) / GAP);
      for (let i = 0; i < count; i++) {
        const base = i * GAP - w * 0.2;
        ctx.beginPath();
        for (let y = 0; y <= h; y += 8) {
          const x =
            base +
            y * 0.3 +
            Math.sin(y * 0.006 + t * 0.9 + i * 0.5) * 26 +
            Math.sin(y * 0.02 - t * 1.4 + i) * 6;
          if (y === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        const alpha = 0.05 + 0.09 * (0.5 + 0.5 * Math.sin(i * 1.7 + t));
        ctx.strokeStyle = `rgba(${GREEN}, ${alpha})`;
        ctx.stroke();
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
