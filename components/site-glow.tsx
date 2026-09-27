"use client";

import { useEffect, useRef } from "react";
import { SiteSmoke } from "@/components/site-smoke";
import { scrollMood } from "@/lib/scroll-mood";

const ACCENT = "#10B981";
const PERIOD_PX = 1800;

const glowBackground = (xPercent: number) =>
  `radial-gradient(ellipse 900px 1300px at ${xPercent}% 0%, ${ACCENT}33 0%, ${ACCENT}1f 20%, ${ACCENT}0d 40%, transparent 70%)`;

export function SiteGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    // Escreve direto no estilo: sem re-render do React a cada quadro de scroll.
    const update = () => {
      frame = 0;
      const el = glowRef.current;
      if (!el) return;
      const t = (1 - Math.cos((window.scrollY / PERIOD_PX) * Math.PI)) / 2;
      el.style.background = glowBackground(t * 100);
      el.style.opacity = String(scrollMood().glow);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
      <div ref={glowRef} className="absolute inset-0" style={{ background: glowBackground(0) }} />
      <SiteSmoke />
    </div>
  );
}
