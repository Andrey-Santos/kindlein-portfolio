import { services } from "@/lib/data";

export function Services() {
  return (
    <section id="servicos" className="snap-start scroll-mt-16">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <p className="font-mono text-sm text-primary">
          <span className="text-muted-foreground">$</span> servicos
        </p>
        <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight">
          O que eu faço
        </h2>
        <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
          {services.map((service) => (
            <div key={service.title} className="bg-background p-6">
              <h3 className="font-heading text-lg font-semibold">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
