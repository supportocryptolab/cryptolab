import Hero from "@/components/Hero";
import WhatYouLearn from "@/components/WhatYouLearn";
import ForWho from "@/components/ForWho";
import WhatsInside from "@/components/WhatsInside";
import PdfPreview from "@/components/PdfPreview";
import Testimonials from "@/components/Testimonials";
import Trust from "@/components/Trust";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <Hero />
      <WhatYouLearn />
      <ForWho />
      <WhatsInside />
      <PdfPreview />
      <Testimonials />
      <Trust />
      <FAQ />
      <FinalCTA />
      <Footer />
      <MobileCTA />
    </main>
  );
}