import { HeroCanvasBackground } from "@/components/sections/HeroCanvasBackground";
import { HeroContent } from "@/components/sections/HeroContent";

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
      <HeroCanvasBackground />
      <HeroContent />
    </section>
  );
}
