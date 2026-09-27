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
          <p className="font-mono text-sm text-muted-foreground">
            <span className="text-primary">$</span> serviços
          </p>
          <h2 className="mt-4 max-w-4xl text-balance font-heading text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.5rem]">
            O site é a porta de entrada.{" "}
            <em className="text-primary">O resto entra conforme você cresce.</em>
          </h2>
        </div>
        {/* Lista editorial: titulo grande a esquerda, descricao a direita, linhas finas. */}
        <ul className="reveal mt-12 border-t border-border">
          {services.map((service) => (
            <li
              key={service.title}
              className="grid gap-2 border-b border-border py-7 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:items-baseline md:gap-10"
            >
              <h3 className="text-balance font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                {service.title}
              </h3>
              <p className="max-w-prose text-pretty leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </li>
          ))}
        </ul>
        <div className="reveal mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
          <p className="text-foreground/80">Não achou o que precisa? Me conta.</p>
          <WhatsAppCta source="servicos" />
        </div>
      </div>
    </section>
  );
}
