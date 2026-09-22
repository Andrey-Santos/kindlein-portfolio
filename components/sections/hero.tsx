"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { contact } from "@/lib/data";

const SCALE_LARGE = 1.5;
const RUNWAY_VH = 240;
const GAP_PX = 32;

export function Hero() {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(1);
  const [enabled, setEnabled] = useState(false);
  const [photoWidth, setPhotoWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqlWide = window.matchMedia("(min-width: 768px)");
    const shouldEnable = () => !mql.matches && mqlWide.matches;
    setEnabled(shouldEnable());

    const measure = () => {
      setContainerWidth(containerRef.current?.clientWidth ?? 0);
      setPhotoWidth(photoRef.current?.offsetWidth ?? 0);
    };

    const onScroll = () => {
      const el = scrollAreaRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = window.innerHeight * (RUNWAY_VH / 100 - 1);
      const scrolled = -rect.top;
      const p = total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 1;
      setProgress(p);
    };

    measure();
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    mql.addEventListener("change", () => setEnabled(shouldEnable()));
    mqlWide.addEventListener("change", () => setEnabled(shouldEnable()));

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const p = enabled ? progress : 1;
  const scale = SCALE_LARGE - (SCALE_LARGE - 1) * p;
  const heroOpacity = Math.max(0, 1 - p / 0.3);
  const aboutOpacity = Math.min(1, Math.max(0, (p - 0.5) / 0.4));
  const photoShift = (containerWidth - photoWidth) * (1 - p);
  const textShift = -(photoWidth + GAP_PX) * (1 - p);

  return (
    <section id="top" className="relative isolate snap-start scroll-mt-16">
      <div
        ref={scrollAreaRef}
        style={enabled ? { height: `${RUNWAY_VH}vh` } : undefined}
        className="relative"
      >
        {enabled && (
          <span
            id="sobre"
            aria-hidden="true"
            className="absolute left-0 scroll-mt-16"
            style={{ top: `${RUNWAY_VH - 100}vh` }}
          />
        )}
        <div className="sticky top-16 flex min-h-[calc(100svh-4rem)] items-start overflow-hidden px-6 pb-12 pt-16 sm:px-12 sm:pt-20 md:px-16 md:pt-24 lg:px-24">
          <div
            ref={containerRef}
            className="mx-auto flex w-full max-w-6xl flex-col items-start gap-10 md:flex-row md:items-start md:justify-between md:gap-8"
          >
            <div
              ref={photoRef}
              style={
                enabled
                  ? {
                      transform: `translateX(${photoShift}px) scale(${scale})`,
                      transformOrigin: "top",
                    }
                  : undefined
              }
              className="relative aspect-[4/5] w-72 shrink-0 overflow-hidden rounded-lg border border-primary/25 bg-card sm:w-96 md:w-[28rem]"
            >
              <Image
                src="/kindlein-foto.png"
                alt="Andrey Kindlein"
                fill
                sizes="(min-width: 768px) 54rem, 24rem"
                className="object-cover object-top"
                priority
              />
            </div>

            <div
              style={enabled ? { transform: `translateX(${textShift}px)` } : undefined}
              className="relative w-full md:max-w-xl"
            >
              <div
                style={
                  enabled
                    ? { opacity: heroOpacity, pointerEvents: heroOpacity < 0.1 ? "none" : "auto" }
                    : undefined
                }
                className={enabled ? "absolute inset-0" : "relative mb-16"}
              >
                <p className="animate-fade-in font-mono text-sm font-bold uppercase tracking-[0.2em]">
                  Andrey Kindlein
                </p>
                <p className="animate-fade-in animation-delay-200 mt-1 font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  Full-stack developer
                </p>

                <h1 className="animate-fade-in animation-delay-200 mt-8 text-pretty font-mono text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  Desenvolvimento digital
                  <br />
                  <span className="text-primary">sob medida.</span>
                </h1>

                <p className="animate-fade-in animation-delay-400 mt-6 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
                  Sites, sistemas e aplicações web desenvolvidos para
                  transformar necessidades reais em soluções digitais.
                </p>

                <div className="animate-fade-in animation-delay-600 mt-8">
                  <Link
                    href={`https://wa.me/${contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    Falar no WhatsApp
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>

              <div
                id={enabled ? undefined : "sobre"}
                style={enabled ? { opacity: aboutOpacity } : undefined}
                className="relative scroll-mt-16 space-y-4"
              >
                <p className="font-mono text-sm text-primary">
                  <span className="text-muted-foreground">$</span> sobre
                </p>
                <h2 className="text-3xl font-semibold tracking-tight">
                  Experiência que virou solução
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Anos de mercado como desenvolvedor em empresas de
                    tecnologia me deram uma visão prática de como transformar
                    problemas reais em soluções que funcionam.
                  </p>
                  <p>
                    Comecei no backend — PHP, Delphi, SQL, APIs REST — e
                    evoluí pro full-stack moderno com React, Next.js e outras
                    tecnologias atuais.
                  </p>
                  <p>
                    Hoje, essa experiência é aplicada direto a pequenos
                    negócios, sob a marca Kindlein — meu sobrenome que virou
                    identidade — com tecnologia sem complicação e sem solução
                    genérica.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
