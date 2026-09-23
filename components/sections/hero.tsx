"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { WhatsAppCta } from "@/components/whatsapp-cta";

const RUNWAY_VH = 200;
const GAP_PX = 32;
const HERO_WIDTH_RATIO = 0.46;

type Rect = { top: number; left: number; width: number; height: number };

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function Hero() {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [enabled, setEnabled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [heroRect, setHeroRect] = useState<Rect>({ top: 0, left: 0, width: 0, height: 0 });
  const [slotRect, setSlotRect] = useState<Rect>({ top: 0, left: 0, width: 0, height: 0 });
  const stickyHeightRef = useRef(0);

  // Layout effects rodam antes do paint: o HTML do servidor (estado estatico,
  // igual ao p=0) vira o layout animado sem frame intermediario.
  useLayoutEffect(() => {
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

  useLayoutEffect(() => {
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

    let frame = 0;
    const update = () => {
      frame = 0;
      const el = scrollAreaRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const wrapperHeight = (window.innerHeight * RUNWAY_VH) / 100;
      // -64 (top-16 do sticky): p chega a 1 no instante em que o sticky solta.
      const total = wrapperHeight - (stickyHeightRef.current || window.innerHeight) - 64;
      const scrolled = -rect.top;
      const p = total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 1;
      setProgress(p);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    measure();
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(frame);
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
    // Com animacao, o snap fica em dois marcadores pequenos (inicio e Sobre).
    // A secao inteira (200vh) como snap vira area "oversized" e libera scroll livre.
    <section
      id="top"
      className={`relative isolate scroll-mt-16 ${enabled ? "" : "snap-start"}`}
    >
      <div
        ref={scrollAreaRef}
        style={enabled ? { height: `${RUNWAY_VH}vh` } : undefined}
        className="relative"
      >
        {enabled && (
          <span aria-hidden="true" className="absolute left-0 top-0 size-px snap-start scroll-mt-16" />
        )}
        {enabled && (
          <span
            id="sobre"
            aria-hidden="true"
            // size-px: Chrome ignora snap em elemento de tamanho zero.
            className="absolute left-0 size-px snap-start scroll-mt-16"
            // Snap exatamente onde p = 1: a foto chega no slot do Sobre.
            style={{ top: `calc(${RUNWAY_VH}vh - 100svh + 4rem)` }}
          />
        )}
        <div
          ref={stickyRef}
          className="sticky top-16 flex min-h-[calc(100svh-4rem)] items-start pb-12 pt-16 sm:pt-20 md:items-center md:py-12"
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
            <div className="absolute inset-x-0 top-[-64px] h-[640px] overflow-hidden bg-card md:bottom-0 md:left-auto md:h-auto md:w-[46%] md:[mask-image:linear-gradient(to_right,transparent,black_22%)]">
              <Image
                src="/kindlein-foto.png"
                alt="Andrey Kindlein"
                fill
                sizes="(min-width: 768px) 60vw, 100vw"
                className="object-cover object-top"
                priority
              />
              <div aria-hidden="true" className="absolute inset-0 bg-background/55 md:hidden" />
            </div>
          )}

          <div className="shell flex flex-col items-start gap-10 md:flex-row md:items-center md:justify-between md:gap-8">
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
                style={enabled ? { opacity: heroOpacity } : undefined}
                inert={enabled && heroOpacity < 0.1}
                className={enabled ? "absolute inset-0" : "relative z-10 min-h-[32rem] md:mb-16 md:min-h-0"}
              >
                <p className="animate-fade-in font-mono text-sm font-bold uppercase tracking-[0.2em]">
                  Andrey Kindlein
                </p>
                <p className="animate-fade-in animation-delay-200 mt-1 font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary">
                  Desenvolvedor full-stack
                </p>

                <h1 className="animate-fade-in animation-delay-200 mt-8 text-balance font-mono text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  Sites e sistemas
                  <br />
                  <span className="text-primary">sob medida.</span>
                </h1>

                <p className="animate-fade-in animation-delay-400 mt-6 max-w-xl text-pretty text-base leading-relaxed text-foreground/80 sm:text-lg">
                  Pra pequenas empresas que precisam vender online, controlar
                  estoque ou organizar o financeiro. Você fala direto com quem
                  desenvolve.
                </p>

                <div className="animate-fade-in animation-delay-600 mt-8">
                  <WhatsAppCta />
                </div>
              </div>

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
                <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                  Experiência que virou solução
                </h2>
                <div className="max-w-prose space-y-4 leading-relaxed text-muted-foreground">
                  <p>
                    Anos como desenvolvedor em empresas de tecnologia me
                    ensinaram a transformar problema real em solução que
                    funciona — não em enfeite.
                  </p>
                  <p>
                    Comecei no backend (PHP, Delphi, SQL, APIs REST) e evoluí
                    pro full-stack moderno (React, Next.js).
                  </p>
                  <p>
                    Hoje aplico essa bagagem direto no negócio de pequenas
                    empresas, sob a marca Kindlein — meu sobrenome que virou
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
