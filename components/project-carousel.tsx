"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Setas sempre visiveis no toque; so escondem ate hover em quem tem mouse.
const arrowClass =
  "absolute top-1/2 -translate-y-1/2 rounded-full border border-border bg-background/70 p-2.5 text-foreground backdrop-blur transition-opacity hover:border-primary/50 hover:text-primary focus-visible:opacity-100 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100";

export function ProjectCarousel({
  images,
  alt,
  domain,
}: {
  images: string[];
  alt: string;
  domain: string;
}) {
  const [index, setIndex] = useState(0);
  const hasMultiple = images.length > 1;

  const goTo = (i: number) => setIndex((i + images.length) % images.length);

  if (images.length === 0) {
    return (
      <div className="flex aspect-video items-center justify-center border-b border-border bg-background/40 px-6">
        <p className="break-all text-center font-mono text-sm text-muted-foreground">
          <span className="text-primary">~/</span>
          {domain}
        </p>
      </div>
    );
  }

  return (
    <div className="relative aspect-video overflow-hidden border-b border-border bg-secondary/50">
      <div
        className="flex h-full transition-transform duration-300 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((src, i) => (
          <div
            key={src}
            aria-hidden={i !== index}
            inert={i !== index}
            className="relative h-full w-full shrink-0"
          >
            <Image
              src={src}
              alt={`${alt}, screenshot ${i + 1}`}
              fill
              sizes="(min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {hasMultiple && (
        <>
          <button
            type="button"
            aria-label="Screenshot anterior"
            onClick={() => goTo(index - 1)}
            className={`${arrowClass} left-2`}
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Próximo screenshot"
            onClick={() => goTo(index + 1)}
            className={`${arrowClass} right-2`}
          >
            <ChevronRight className="size-4" />
          </button>
          <div className="absolute inset-x-0 bottom-1 flex items-center justify-center">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                aria-label={`Ver screenshot ${i + 1}`}
                aria-current={i === index}
                onClick={() => goTo(i)}
                className="p-2"
              >
                <span
                  className={`block size-2 rounded-full transition-colors ${
                    i === index ? "bg-primary" : "bg-foreground/40"
                  }`}
                />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
