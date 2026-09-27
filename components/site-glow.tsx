"use client";

import { useEffect, useState } from "react";
// Em teste: correnteza. Pra voltar a grade de pontos, troque por SiteWater (site-water.tsx).
import { SiteCurrent } from "@/components/site-current";

const ACCENT = "#10B981";
const PERIOD_PX = 1800;

export function SiteGlow() {
  const [xPercent, setXPercent] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const t = (1 - Math.cos((window.scrollY / PERIOD_PX) * Math.PI)) / 2;
      setXPercent(t * 100);
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
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 900px 1300px at ${xPercent}% 0%, ${ACCENT}33 0%, ${ACCENT}1f 20%, ${ACCENT}0d 40%, transparent 70%)`,
        }}
      />
      <SiteCurrent />
      <svg className="absolute inset-0 size-full stroke-border opacity-60">
        <defs>
          <pattern
            x="50%"
            y={-1}
            id="site-grid-lines"
            width={200}
            height={200}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <rect fill="url(#site-grid-lines)" width="100%" height="100%" strokeWidth={0} />
      </svg>
    </div>
  );
}
