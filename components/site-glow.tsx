"use client";

import { useEffect, useState } from "react";

const ACCENT = "#10B981";
const PERIOD_PX = 1800;

export function SiteGlow() {
  const [xPercent, setXPercent] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const t = (1 - Math.cos((window.scrollY / PERIOD_PX) * Math.PI)) / 2;
      setXPercent(t * 100);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 900px 1300px at ${xPercent}% 0%, ${ACCENT}33 0%, ${ACCENT}1f 20%, ${ACCENT}0d 40%, transparent 70%)`,
        }}
      />
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
          <pattern
            id="site-programming-symbols"
            x="0"
            y="0"
            width="400"
            height="400"
            patternUnits="userSpaceOnUse"
          >
            <text x="50" y="50" fill={ACCENT} fontFamily="monospace" fontSize="24" transform="rotate(-15)">&lt;/&gt;</text>
            <text x="150" y="100" fill={ACCENT} fontFamily="monospace" fontSize="20" transform="rotate(10)">{"{}"}</text>
            <text x="250" y="80" fill={ACCENT} fontFamily="monospace" fontSize="18" transform="rotate(-5)">=&gt;</text>
            <text x="100" y="200" fill={ACCENT} fontFamily="monospace" fontSize="22" transform="rotate(15)">[]</text>
            <text x="300" y="180" fill={ACCENT} fontFamily="monospace" fontSize="20" transform="rotate(-10)">&lt;&gt;</text>
            <text x="200" y="250" fill={ACCENT} fontFamily="monospace" fontSize="24" transform="rotate(5)">()</text>
            <text x="50" y="320" fill={ACCENT} fontFamily="monospace" fontSize="18" transform="rotate(-8)">::</text>
            <text x="350" y="300" fill={ACCENT} fontFamily="monospace" fontSize="22" transform="rotate(12)">==</text>
            <text x="150" y="350" fill={ACCENT} fontFamily="monospace" fontSize="20" transform="rotate(-15)">++</text>
            <text x="250" y="370" fill={ACCENT} fontFamily="monospace" fontSize="24" transform="rotate(8)">;</text>
            <text x="20" y="150" fill={ACCENT} fontFamily="monospace" fontSize="16" transform="rotate(-6)">&lt;div&gt;</text>
            <text x="320" y="40" fill={ACCENT} fontFamily="monospace" fontSize="16" transform="rotate(9)">&lt;html&gt;</text>
            <text x="370" y="230" fill={ACCENT} fontFamily="monospace" fontSize="16" transform="rotate(-11)">&lt;/body&gt;</text>
            <text x="15" y="380" fill={ACCENT} fontFamily="monospace" fontSize="16" transform="rotate(7)">&lt;span&gt;</text>
          </pattern>
        </defs>
        <rect fill="url(#site-programming-symbols)" width="100%" height="100%" opacity="0.1" />
        <rect fill="url(#site-grid-lines)" width="100%" height="100%" strokeWidth={0} />
      </svg>
    </div>
  );
}
