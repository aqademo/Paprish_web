import { HeroBackground } from "@/components/sections/HeroBackground";
import { HeroContent } from "@/components/sections/HeroContent";
import { HeroVideoClient } from "@/components/sections/HeroVideoClient";

export function Hero() {
  return (
    <section
      className="relative min-h-[100svh] w-full overflow-hidden"
      style={{
        position: "relative",
        minHeight: "100svh",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <HeroBackground />
      <HeroVideoClient />
      <HeroContent />
    </section>
  );
}
