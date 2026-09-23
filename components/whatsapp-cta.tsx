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
        "inline-flex min-h-11 items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/85",
        className
      )}
    >
      {children}
      <ArrowRight className="size-4" />
    </Link>
  );
}
