import Link from "next/link";
import { Mail } from "lucide-react";
import { contact, whatsappHref } from "@/lib/data";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { LinkedinIcon } from "@/components/icons/linkedin-icon";
import { GithubIcon } from "@/components/icons/github-icon";
import { KindleinSignature } from "@/components/kindlein-signature";

const iconLink =
  "inline-flex size-11 items-center justify-center rounded-md transition-colors hover:text-primary";

export function SiteFooter() {
  return (
    <footer>
      <div className="shell">
        <div className="border-t border-border/60" />
      </div>
      <dl className="shell grid gap-8 py-10 sm:grid-cols-3">
        <div>
          <dt className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Contato
          </dt>
          <dd className="mt-2">
            <Link
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-primary"
            >
              {contact.whatsappDisplay}
            </Link>
          </dd>
        </div>
        <div>
          <dt className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            E-mail
          </dt>
          <dd className="mt-2">
            <Link
              href={`mailto:${contact.email}`}
              className="break-all transition-colors hover:text-primary"
            >
              {contact.email}
            </Link>
          </dd>
        </div>
        <div>
          <dt className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Onde
          </dt>
          <dd className="mt-2">{contact.location}</dd>
        </div>
      </dl>
      <div className="shell">
        <div className="border-t border-border/60" />
      </div>
      <div className="shell flex flex-col items-center gap-4 py-8 text-sm text-muted-foreground sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Andrey Kindlein</p>
        <div className="flex items-center gap-1">
          <Link
            href={`mailto:${contact.email}`}
            aria-label="Enviar e-mail"
            title="Enviar e-mail"
            className={iconLink}
          >
            <Mail className="size-4" />
          </Link>
          <Link
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar no WhatsApp"
            title="Falar no WhatsApp"
            className={iconLink}
          >
            <WhatsAppIcon className="size-4" />
          </Link>
          <Link
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
            className={iconLink}
          >
            <LinkedinIcon className="size-4" />
          </Link>
          <Link
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            title="GitHub"
            className={iconLink}
          >
            <GithubIcon className="size-4" />
          </Link>
        </div>
        <KindleinSignature />
      </div>
    </footer>
  );
}
