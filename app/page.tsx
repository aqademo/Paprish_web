import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { MarqueeBand } from "@/components/sections/MarqueeBand";
import { MarqueeScript } from "@/components/sections/MarqueeScript";
import { ProductShop } from "@/components/sections/ProductShop";
import { ProductStrip } from "@/components/sections/ProductStrip";
import { SplitBrand } from "@/components/sections/SplitBrand";
import { WhyStrip } from "@/components/sections/WhyStrip";
import { SplitGlobal } from "@/components/sections/SplitGlobal";
import { Testimonials } from "@/components/sections/Testimonials";
import { NewsletterSplit } from "@/components/sections/NewsletterSplit";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MarqueeBand />
        <MarqueeScript />
        <ProductShop />
        <SplitBrand />
        <WhyStrip />
        <ProductStrip />
        <SplitGlobal />
        <Testimonials />
        <NewsletterSplit />
      </main>
      <Footer />
    </>
  );
}
