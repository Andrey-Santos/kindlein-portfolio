import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { contact } from "@/lib/data";

export function Contact() {
  return (
    <section id="contato" className="snap-start scroll-mt-16">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <p className="font-mono text-sm text-primary">
          <span className="text-muted-foreground">$</span> contato
        </p>
        <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight">
          Vamos conversar
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Conta o que seu negócio precisa. Respondo por WhatsApp ou e-mail.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href={`https://wa.me/${contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <MessageCircle className="size-4" />
            {contact.whatsappDisplay}
          </Link>
          <Link
            href={`mailto:${contact.email}`}
            className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/50"
          >
            <Mail className="size-4" />
            {contact.email}
          </Link>
        </div>
      </div>
    </section>
  );
}
