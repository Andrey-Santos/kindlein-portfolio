import { WhatsAppCta } from "@/components/whatsapp-cta";

export function Contact() {
  return (
    <section
      id="contato"
      className="flex flex-1 scroll-mt-16 flex-col justify-center"
    >
      <div className="shell reveal flex flex-col items-start gap-12 py-16 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-mono text-sm text-muted-foreground">
            <span className="text-primary">$</span> contato
          </p>
          <h2 className="mt-4 font-heading text-[2.75rem] font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
            Me conta
            <br />
            seu projeto.
          </h2>
          <p className="mt-10 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
            Sem intermediário e sem pacote pronto. Você explica o seu negócio,
            eu desenvolvo o que ele precisa.
          </p>
        </div>
        <WhatsAppCta featured source="contato" className="shrink-0 px-10 py-6 text-base">
          Falar no WhatsApp
        </WhatsAppCta>
      </div>
    </section>
  );
}
