"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { contact } from "@/lib/data";

const RUNWAY_VH = 200;
const GAP_PX = 32;
const HERO_WIDTH_RATIO = 0.46;

type Rect = { top: number; left: number; width: number; height: number };

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function Hero() {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(1);
  const [enabled, setEnabled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [heroRect, setHeroRect] = useState<Rect>({ top: 0, left: 0, width: 0, height: 0 });
  const [slotRect, setSlotRect] = useState<Rect>({ top: 0, left: 0, width: 0, height: 0 });
  const stickyHeightRef = useRef(0);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqlWide = window.matchMedia("(min-width: 768px)");
    const update = () => {
      setEnabled(!mql.matches);
      setIsDesktop(mqlWide.matches);
    };
    update();
    mql.addEventListener("change", update);
    mqlWide.addEventListener("change", update);
    return () => {
      mql.removeEventListener("change", update);
      mqlWide.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const measure = () => {
      const sticky = stickyRef.current;
      const slot = slotRef.current;
      if (!sticky || !slot) return;
      const stickyBox = sticky.getBoundingClientRect();
      const slotBox = slot.getBoundingClientRect();
      stickyHeightRef.current = stickyBox.height;
      const heroWidth = isDesktop ? stickyBox.width * HERO_WIDTH_RATIO : stickyBox.width;
      setHeroRect({
        top: -64,
        left: isDesktop ? stickyBox.width - heroWidth : 0,
        width: heroWidth,
        height: isDesktop ? stickyBox.height + 64 : 640,
      });
      setSlotRect({
        top: slotBox.top - stickyBox.top,
        left: slotBox.left - stickyBox.left,
        width: slotBox.width,
        height: slotBox.height,
      });
    };

    const onScroll = () => {
      const el = scrollAreaRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const wrapperHeight = (window.innerHeight * RUNWAY_VH) / 100;
      const total = wrapperHeight - (stickyHeightRef.current || window.innerHeight);
      const scrolled = -rect.top;
      const p = total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 1;
      setProgress(p);
    };

    measure();
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, [enabled, isDesktop]);

  const p = enabled ? progress : 1;
  const heroOpacity = Math.max(0, 1 - p / 0.3);
  const aboutOpacity = Math.min(1, Math.max(0, (p - 0.5) / 0.4));
  const textShift = isDesktop ? -(slotRect.width + GAP_PX) * (1 - p) : 0;

  const photoTop = lerp(heroRect.top, slotRect.top, p);
  const photoLeft = lerp(heroRect.left, slotRect.left, p);
  const photoWidthPx = lerp(heroRect.width, slotRect.width, p);
  const photoHeightPx = lerp(heroRect.height, slotRect.height, p);
  const borderRadiusRem = p * 0.75;
  const borderAlpha = p * 0.25;
  const leftFadeStop = 22 - 22 * p;
  const edgeFade = isDesktop
    ? `linear-gradient(to right, transparent 0%, black ${leftFadeStop}%)`
    : undefined;

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
        <div
          ref={stickyRef}
          className="sticky top-16 flex min-h-[calc(100svh-4rem)] items-start pb-12 pt-16 sm:pt-20 md:pt-24"
        >
          {enabled && (
            <div
              className="absolute z-10 overflow-hidden bg-card"
              style={{
                top: photoTop,
                left: photoLeft,
                width: photoWidthPx,
                height: photoHeightPx,
                borderRadius: `${borderRadiusRem}rem`,
                border: `1px solid rgba(16,185,129,${borderAlpha})`,
                WebkitMaskImage: edgeFade,
                maskImage: edgeFade,
              }}
            >
              <Image
                src="/kindlein-foto.png"
                alt="Andrey Kindlein"
                fill
                sizes={isDesktop ? "60vw" : "100vw"}
                className="object-cover object-top"
                priority
              />
              {!isDesktop && (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-background/55"
                  style={{ opacity: 1 - p }}
                />
              )}
            </div>
          )}

          {!enabled && (
            <div
              className="absolute inset-x-0 overflow-hidden bg-card"
              style={{ top: -64, height: 640 }}
            >
              <Image
                src="/kindlein-foto.png"
                alt="Andrey Kindlein"
                fill
                sizes="100vw"
                className="object-cover object-top"
                priority
              />
              <div aria-hidden="true" className="absolute inset-0 bg-background/55" />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-background"
              />
            </div>
          )}

          <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-10 px-6 sm:px-12 md:flex-row md:items-start md:justify-between md:gap-8 md:px-16 lg:px-24">
            {enabled && isDesktop && (
              <div
                ref={slotRef}
                aria-hidden="true"
                className="invisible aspect-[4/5] w-72 shrink-0 sm:w-96 md:w-[28rem]"
              />
            )}

            <div
              style={enabled ? { transform: `translateX(${textShift}px)` } : undefined}
              className="relative z-20 w-full md:max-w-xl"
            >
              <div
                style={
                  enabled
                    ? { opacity: heroOpacity, pointerEvents: heroOpacity < 0.1 ? "none" : "auto" }
                    : undefined
                }
                className={enabled ? "absolute inset-0" : "relative z-10 -mt-8"}
              >
                <p className="animate-fade-in font-mono text-sm font-bold uppercase tracking-[0.2em]">
                  Andrey Kindlein
                </p>
                <p className="animate-fade-in animation-delay-200 mt-1 font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary">
                  Full-stack developer
                </p>

                <h1 className="animate-fade-in animation-delay-200 mt-8 text-pretty font-mono text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  Desenvolvimento digital
                  <br />
                  <span className="text-primary">sob medida.</span>
                </h1>

                <p className="animate-fade-in animation-delay-400 mt-6 max-w-xl text-pretty text-base text-foreground/80 sm:text-lg">
                  Sites, sistemas e aplicações web desenvolvidos para
                  transformar necessidades reais em soluções digitais.
                </p>

                <div className="animate-fade-in animation-delay-600 mt-8">
                  <Link
                    href={`https://wa.me/${contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-primary/60 bg-primary/15 px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/25"
                  >
                    Falar no WhatsApp
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>

              {!enabled && (
                <div className="relative mb-10 mt-[260px]">
                  <Link
                    href={`https://wa.me/${contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-primary/60 bg-primary/15 px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/25"
                  >
                    Falar no WhatsApp
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              )}

              <div
                id={enabled ? undefined : "sobre"}
                style={enabled ? { opacity: aboutOpacity } : undefined}
                className="relative scroll-mt-16 space-y-4"
              >
                {enabled && !isDesktop && (
                  <div
                    ref={slotRef}
                    aria-hidden="true"
                    className="invisible aspect-[4/5] w-full"
                  />
                )}
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
