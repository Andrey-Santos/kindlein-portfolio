"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";

export function ProjectCarousel({
  images,
  alt,
}: {
  images: (string | null)[];
  alt: string;
}) {
  const [index, setIndex] = useState(0);
  const hasMultiple = images.length > 1;

  const goTo = (i: number) => setIndex((i + images.length) % images.length);

  return (
    <div className="relative aspect-video overflow-hidden border-b border-border bg-secondary/50">
      <div
        className="flex h-full transition-transform duration-300 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="relative flex h-full w-full shrink-0 items-center justify-center text-muted-foreground"
          >
            {src ? (
              <Image src={src} alt={`${alt} — screenshot ${i + 1}`} fill className="object-cover" />
            ) : (
              <ImageIcon className="size-8" strokeWidth={1.25} />
            )}
          </div>
        ))}
      </div>

      {hasMultiple && (
        <>
          <button
            type="button"
            aria-label="Screenshot anterior"
            onClick={() => goTo(index - 1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-border bg-background/70 p-1.5 text-foreground opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 hover:border-primary/50 hover:text-primary"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Próximo screenshot"
            onClick={() => goTo(index + 1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-border bg-background/70 p-1.5 text-foreground opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 hover:border-primary/50 hover:text-primary"
          >
            <ChevronRight className="size-4" />
          </button>
          <div className="absolute inset-x-0 bottom-2 flex items-center justify-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Ver screenshot ${i + 1}`}
                onClick={() => goTo(i)}
                className={`size-1.5 rounded-full transition-colors ${
                  i === index ? "bg-primary" : "bg-foreground/30"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
