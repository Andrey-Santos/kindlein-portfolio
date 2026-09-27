import Link from "next/link";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { whatsappHref } from "@/lib/data";
import { cn } from "@/lib/utils";

export function WhatsAppCta({
  children = "Falar no WhatsApp",
  featured = false,
  className,
}: {
  children?: React.ReactNode;
  /** Brilho verde + feixe animado: so no CTA final (Contato) e no da pagina de projeto. */
  featured?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex min-h-11 items-center gap-2 rounded-full border bg-background px-7 py-3.5 text-sm font-semibold text-foreground transition-colors",
        featured
          ? "cta-beam border-primary/35 shadow-[0_0_40px_-8px_var(--primary)] hover:bg-card"
          : "border-white/20 hover:border-primary/60 hover:text-primary",
        className
      )}
    >
      <WhatsAppIcon className="size-4" />
      {children}
      <span className="sr-only"> (abre em nova aba)</span>
    </Link>
  );
}
