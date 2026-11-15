import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { About, Awards, ClientWork, Experience, Faq, Marquee, Process, Projects, Services, Skills } from "@/components/Sections";
import { Contact, FloatingActions, Footer } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <ClientWork />
        <Experience />
        <Projects />
        <Awards />
        <Skills />
        <Process />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
