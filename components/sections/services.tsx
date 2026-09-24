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
          <h2 className="mt-6 max-w-4xl text-balance font-heading text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            O site é a porta de entrada.{" "}
            <em className="text-primary">O resto entra conforme você cresce.</em>
          </h2>
        </div>
        <div className="reveal mt-14 grid gap-px border border-border bg-border sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service, i) => (
            <div key={service.title} className="bg-background p-8 lg:p-10">
              <p className="font-mono text-xs tracking-[0.2em] text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 text-balance font-heading text-xl font-bold tracking-tight sm:text-2xl">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </div>
          ))}
        </div>
        <div className="reveal mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
          <p className="text-foreground/80">Não achou o que precisa? Me conta.</p>
          <WhatsAppCta />
        </div>
      </div>
    </section>
  );
}
