import { WhatsAppCta } from "@/components/whatsapp-cta";

export function Contact() {
  return (
    <section
      id="contato"
      className="flex flex-1 scroll-mt-16 flex-col justify-center"
    >
      <div className="shell reveal flex flex-col items-start gap-12 py-16 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-heading text-6xl font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
            Tem um
            <br />
            projeto?
          </h2>
          <p className="mt-10 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
            Sem intermediário e sem pacote pronto. Você explica o seu negócio,
            eu desenvolvo o que ele precisa.
          </p>
        </div>
        <WhatsAppCta className="shrink-0 px-10 py-6 text-base">
          Chamar no WhatsApp
        </WhatsAppCta>
      </div>
    </section>
  );
}
