import Link from "next/link";
import { Mail } from "lucide-react";
import { contact } from "@/lib/data";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { LinkedinIcon } from "@/components/icons/linkedin-icon";
import { GithubIcon } from "@/components/icons/github-icon";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Andrey Kindlein. Todos os direitos reservados.</p>
        <div className="flex items-center gap-5">
          <Link
            href={`mailto:${contact.email}`}
            aria-label="Enviar e-mail"
            title="Enviar e-mail"
            className="transition-colors hover:text-primary"
          >
            <Mail className="size-4" />
          </Link>
          <Link
            href={`https://wa.me/${contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar no WhatsApp"
            title="Falar no WhatsApp"
            className="transition-colors hover:text-primary"
          >
            <WhatsAppIcon className="size-4" />
          </Link>
          <Link
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
            className="transition-colors hover:text-primary"
          >
            <LinkedinIcon className="size-4" />
          </Link>
          <Link
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            title="GitHub"
            className="transition-colors hover:text-primary"
          >
            <GithubIcon className="size-4" />
          </Link>
        </div>
        <p className="font-mono text-xs">kindlein.business</p>
      </div>
    </footer>
  );
}
