"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { whatsappLink } from "@/lib/data";
import { cn } from "@/lib/utils";

export function WhatsAppCta({
  children = "Falar no WhatsApp",
  featured = false,
  message,
  source,
  className,
}: {
  children?: React.ReactNode;
  /** Brilho verde + feixe animado: so no CTA final (Contato) e no da pagina de projeto. */
  featured?: boolean;
  /** Mensagem pronta especifica; sem ela usa a padrao do portfolio. */
  message?: string;
  /** De onde veio o clique, pras metricas (ex.: "hero", "projeto:kabum-puffs"). */
  source: string;
  className?: string;
}) {
  return (
    <Link
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_click", { origem: source })}
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
