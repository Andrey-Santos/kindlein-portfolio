import { WhatsAppCta } from "@/components/whatsapp-cta";

export function Contact() {
  return (
    <section
      id="contato"
      className="flex min-h-[calc(100svh-4rem)] snap-start scroll-mt-16 flex-col justify-center"
    >
      <div className="shell reveal flex flex-col items-start gap-12 py-16 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-heading text-6xl font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
            Tem um
            <br />
            projeto?
          </h2>
          <p className="mt-10 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
            Me conta o que a sua empresa precisa. Se eu não for a pessoa certa
            pra isso, eu falo na hora.
          </p>
        </div>
        <WhatsAppCta className="cta-beam shrink-0 rounded-full border border-primary/35 bg-background px-10 py-6 text-base text-foreground shadow-[0_0_40px_-8px_var(--primary)] hover:bg-card">
          Chamar no WhatsApp
        </WhatsAppCta>
      </div>
    </section>
  );
}
