import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { BrandStory } from "@/components/sections/BrandStory";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { ExportTrust } from "@/components/sections/ExportTrust";
import { Testimonials } from "@/components/sections/Testimonials";
import { CallToAction } from "@/components/sections/CallToAction";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <BrandStory />
        <ProductShowcase />
        <WhyChooseUs />
        <ExportTrust />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
