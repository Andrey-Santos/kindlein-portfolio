import { WhatsAppCta } from "@/components/whatsapp-cta";
import { services } from "@/lib/data";

export function Services() {
  return (
    <section
      id="servicos"
      className="flex min-h-[calc(100svh-4rem)] snap-start scroll-mt-16 flex-col justify-center"
    >
      <div className="shell py-16">
        <div className="reveal">
          <p className="font-mono text-sm text-primary">
            <span className="text-muted-foreground">$</span> serviços
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            O que eu faço
          </h2>
        </div>
        <div className="reveal mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
          {services.map((service) => (
            <div key={service.title} className="bg-background p-6 sm:p-8">
              <h3 className="font-heading text-lg font-semibold">
                {service.title}
              </h3>
              <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </div>
          ))}
        </div>
        <div className="reveal mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
          <p className="text-foreground/80">
            Não achou o que precisa? Me conta.
          </p>
          <WhatsAppCta />
        </div>
      </div>
    </section>
  );
}
