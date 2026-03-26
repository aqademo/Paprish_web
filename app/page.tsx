import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";

const MarqueeBand = dynamic(
  () => import("@/components/sections/MarqueeBand").then((m) => m.MarqueeBand),
  { ssr: true, loading: () => null }
);
const MarqueeScript = dynamic(
  () => import("@/components/sections/MarqueeScript").then((m) => m.MarqueeScript),
  { ssr: true, loading: () => null }
);
const ProductShop = dynamic(
  () => import("@/components/sections/ProductShop").then((m) => m.ProductShop),
  { ssr: true, loading: () => null }
);
const SplitBrand = dynamic(
  () => import("@/components/sections/SplitBrand").then((m) => m.SplitBrand),
  { ssr: true, loading: () => null }
);
const WhyStrip = dynamic(
  () => import("@/components/sections/WhyStrip").then((m) => m.WhyStrip),
  { ssr: true, loading: () => null }
);
const ProductStrip = dynamic(
  () => import("@/components/sections/ProductStrip").then((m) => m.ProductStrip),
  { ssr: true, loading: () => null }
);
const SplitGlobal = dynamic(
  () => import("@/components/sections/SplitGlobal").then((m) => m.SplitGlobal),
  { ssr: true, loading: () => null }
);
const Testimonials = dynamic(
  () => import("@/components/sections/Testimonials").then((m) => m.Testimonials),
  { ssr: true, loading: () => null }
);
const NewsletterSplit = dynamic(
  () => import("@/components/sections/NewsletterSplit").then((m) => m.NewsletterSplit),
  { ssr: true, loading: () => null }
);

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
