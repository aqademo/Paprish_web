"use client";

const items = [
  "FREE GLOBAL SHIPPING",
  "AUTHENTIC SPICES",
  "100% NATURAL",
  "NO PRESERVATIVES",
  "FARM FRESH",
  "EXPORT QUALITY",
  "PAPRISH",
];

function Row() {
  return (
    <span className="inline-flex items-center gap-10 whitespace-nowrap px-5">
      {items.map((t, i) => (
        <span key={t} className="inline-flex items-center gap-10">
          {i > 0 ? (
            <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-black/50">
              {" · "}
            </span>
          ) : null}
          <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-black">
            {t}
          </span>
          <span className="h-1 w-1 shrink-0 rounded-full bg-black/40" aria-hidden />
        </span>
      ))}
    </span>
  );
}

export function MarqueeBand() {
  return (
    <div className="paprish-marquee-band relative overflow-hidden border-y border-black/10 bg-amber-500 py-4 paprish-marquee-clip">
      <div className="paprish-marquee-track paprish-marquee-anim flex w-max items-center">
        <div className="flex shrink-0 items-center">
          <Row />
        </div>
        <div className="flex shrink-0 items-center" aria-hidden>
          <Row />
        </div>
      </div>
    </div>
  );
}
