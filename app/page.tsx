import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Services } from "@/components/sections/services";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Projects />
        <Services />
        {/* Contato + rodape formam um slide so. */}
        <div className="flex min-h-[calc(100svh-4rem)] snap-start scroll-mt-16 flex-col">
          <Contact />
          <SiteFooter />
        </div>
      </main>
    </>
  );
}
