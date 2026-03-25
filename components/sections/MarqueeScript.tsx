"use client";

const phrase = "Pure spices · Pure taste ·";

function ScriptRow() {
  return (
    <span className="inline-flex shrink-0 items-center whitespace-nowrap px-5 font-script text-2xl text-white/90 sm:text-3xl md:text-4xl">
      {Array.from({ length: 10 }).map((_, i) => (
        <span key={i} className="mr-12">
          {phrase}
        </span>
      ))}
    </span>
  );
}

export function MarqueeScript() {
  return (
    <div className="paprish-marquee-script relative overflow-hidden border-y border-white/10 bg-black py-5 paprish-marquee-clip">
      <div className="paprish-marquee-track paprish-marquee-anim-slow flex w-max items-center">
        <div className="flex shrink-0">
          <ScriptRow />
        </div>
        <div className="flex shrink-0" aria-hidden>
          <ScriptRow />
        </div>
      </div>
    </div>
  );
}
