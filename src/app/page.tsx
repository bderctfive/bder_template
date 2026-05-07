import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { Hero } from "@/modules/Hero";
import { Services } from "@/modules/Services";
import { Projects } from "@/modules/Projects";
import { About } from "@/modules/About";
import { Contact } from "@/modules/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}