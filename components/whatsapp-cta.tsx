import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { whatsappHref } from "@/lib/data";
import { cn } from "@/lib/utils";

export function WhatsAppCta({
  children = "Falar no WhatsApp",
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "cta-beam inline-flex min-h-11 items-center gap-2 rounded-full border border-primary/35 bg-background px-7 py-3.5 text-sm font-semibold text-foreground shadow-[0_0_40px_-8px_var(--primary)] transition-colors hover:bg-card",
        className
      )}
    >
      {children}
      <ArrowRight className="size-4" />
    </Link>
  );
}
