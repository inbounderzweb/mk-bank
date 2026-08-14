import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { MarqueeSection } from "@/components/sections/MarqueeSection";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { FinancialCalculator } from "@/components/sections/FinancialCalculator";
import { Branches } from "@/components/sections/Branches";
import { ConventionCentre } from "@/components/sections/ConventionCentre";
import { Gallery } from "@/components/sections/Gallery";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <div className="relative min-h-screen bg-white text-slate-900 font-sans selection:bg-[#ED1C24] selection:text-white">
        <Navbar />
        <main>
          <Hero />
          <About />
          <MarqueeSection />
          <Services />
          {/* <FinancialCalculator /> */}
          <Branches />
          <ConventionCentre />
          <Gallery />
          <Contact />
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </SmoothScrollProvider>
  );
}
