"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Product } from "@/data/content";

const WA = "919000000000";

type Props = {
  product: Product;
  className?: string;
  /** PLP = Nike-style grid card; compact = home featured row */
  variant?: "plp" | "compact";
};

export function ShopProductCard({ product: p, className, variant = "compact" }: Props) {
  const waBuy = `https://wa.me/${WA}?text=${encodeURIComponent(
    `Hi Paprish — I'd like to buy: ${p.name} (${p.price})`
  )}`;
  const waCart = `https://wa.me/${WA}?text=${encodeURIComponent(
    `Add to cart: ${p.name} — ${p.price}`
  )}`;

  if (variant === "plp") {
    return (
      <article
        className={cn(
          "group flex w-full flex-col",
          className
        )}
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-b from-stone-800/40 to-stone-950/80">
          <Image
            src={p.image}
            alt={p.name}
            fill
            className="object-contain object-center p-6 transition duration-500 group-hover:scale-[1.04] sm:p-8"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          <button
            type="button"
            aria-label={`Save ${p.name}`}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/80 backdrop-blur-md transition hover:border-[#b91c1c]/50 hover:text-[#b91c1c]"
            onClick={() => window.open(waCart, "_blank", "noopener,noreferrer")}
          >
            <Heart className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>

        <div className="mt-4 flex flex-col gap-1.5 px-0.5">
          {p.badge ? (
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#b91c1c]">
              {p.badge}
            </p>
          ) : (
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/35">
              {p.category}
            </p>
          )}
          <h3 className="font-display text-[0.95rem] font-semibold uppercase leading-snug tracking-[0.06em] text-white">
            {p.name}
          </h3>
          <p className="line-clamp-2 text-[13px] leading-relaxed text-white/45">{p.description}</p>
          <p className="pt-1 font-display text-lg font-bold tracking-tight text-white">{p.price}</p>
          <div className="mt-4 flex items-stretch gap-2">
            <Link
              href={waBuy}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center rounded-full bg-[#b91c1c] px-4 py-2.5 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#991b1b]"
            >
              Buy now
            </Link>
            <button
              type="button"
              aria-label={`Add ${p.name} to cart`}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white transition hover:border-[#b91c1c]/60 hover:bg-[#b91c1c]/15"
              onClick={() => window.open(waCart, "_blank", "noopener,noreferrer")}
            >
              <ShoppingCart className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "group flex w-full flex-col overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5)] backdrop-blur-sm",
        className
      )}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900">
        <Image
          src={p.image}
          alt={p.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 280px, (max-width: 1024px) 50vw, 300px"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-base font-semibold uppercase tracking-wide text-white">
          {p.name}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-white/50">{p.description}</p>
        <p className="mt-3 font-display text-xl font-semibold text-white">{p.price}</p>
        <div className="mt-4 flex items-stretch gap-2.5">
          <Link
            href={waBuy}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center rounded-full bg-[#b91c1c] px-3 py-2.5 text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#991b1b]"
          >
            Buy now
          </Link>
          <button
            type="button"
            aria-label={`Add ${p.name} to cart`}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:border-[#b91c1c] hover:bg-[#b91c1c]/20"
            onClick={() => window.open(waCart, "_blank", "noopener,noreferrer")}
          >
            <ShoppingCart className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </article>
  );
}
