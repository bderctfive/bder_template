import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import HeroSection from "@/modules/Hero";
import { Services } from "@/modules/Services";
import { Projects } from "@/modules/Projects";
import { About } from "@/modules/About";
import { Contact } from "@/modules/Contact";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-neutral-500/20 antialiased overflow-x-hidden">
      {/* Grid backdrop */}
      <div className="fixed inset-0 z-0 pointer-events-none grid-bg" />

      <Navbar />

      <main className="relative z-10">
        {/* Sección de Inicio */}
        <section id="inicio">
          <HeroSection />
        </section>

        {/* 
            Contenedor de secciones: 
            Añadimos espaciado consistente y un ancho máximo para pantallas grandes 
        */}
        <div className="space-y-8 md:space-y-12 pb-16">
          
          <section id="servicios" className="scroll-mt-20">
            <Services />
          </section>

          <section id="proyectos" className="scroll-mt-20">
            <Projects />
          </section>

          <section id="nosotros" className="scroll-mt-20">
            <About />
          </section>

          <section id="contacto" className="scroll-mt-20">
            <Contact />
          </section>
          
        </div>
      </main>

      <Footer />
    </div>
  );
}