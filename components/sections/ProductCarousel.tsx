"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import type { Product } from "@/data/content";
import {
  whatsappBuyProduct,
  whatsappCartProduct,
  whatsappInterestProduct,
} from "@/lib/whatsapp";

type Props = {
  products: Product[];
};

export function ProductCarousel({ products }: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [scrollMetrics, setScrollMetrics] = useState({
    thumbW: 100,
    thumbLeft: 0,
  });

  const updateScrollBar = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    if (scrollWidth <= clientWidth) {
      setScrollMetrics({ thumbW: 100, thumbLeft: 0 });
      return;
    }
    const thumbW = (clientWidth / scrollWidth) * 100;
    const maxScroll = scrollWidth - clientWidth;
    const scrollRatio = scrollLeft / maxScroll;
    const thumbLeft = scrollRatio * (100 - thumbW);
    setScrollMetrics({ thumbW, thumbLeft });
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateScrollBar();
    el.addEventListener("scroll", updateScrollBar, { passive: true });
    const ro = new ResizeObserver(updateScrollBar);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollBar);
      ro.disconnect();
    };
  }, [updateScrollBar, products]);

  useEffect(() => {
    scrollerRef.current?.scrollTo({ left: 0, behavior: "auto" });
  }, [products]);

  return (
    <>
      <div className="relative">
        <div
          ref={scrollerRef}
          className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-3 [scrollbar-width:none] sm:mx-0 sm:scroll-px-0 sm:px-0 sm:pl-0 [&::-webkit-scrollbar]:hidden"
        >
          {products.map((p, index) => {
            const waBuy = whatsappBuyProduct(p);
            const waCart = whatsappCartProduct(p);

            return (
              <article
                key={`${p.id}-${index}`}
                className="group relative w-[148px] min-w-[148px] max-w-[148px] snap-start sm:w-[170px] sm:min-w-[170px] sm:max-w-[170px] md:w-[182px] md:min-w-[182px] md:max-w-[182px]"
              >
                <div className="relative">
                  <Link
                    href="/shop"
                    className="block"
                    aria-label={`${p.name} — ${p.price}`}
                  >
                    <div
                      className="relative aspect-square overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.04]"
                      style={{
                        position: "relative",
                        aspectRatio: "1 / 1",
                        overflow: "hidden",
                        width: "100%",
                      }}
                    >
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-contain p-3 transition duration-300 group-hover:scale-[1.05]"
                        sizes="(max-width: 640px) 148px, 182px"
                      />
                    </div>
                  </Link>
                  <button
                    type="button"
                    className="absolute right-1.5 top-1.5 rounded-full border border-white/15 bg-black/50 p-1.5 text-white/90 backdrop-blur-sm transition hover:border-[#b91c1c]/60 hover:text-[#fecaca]"
                    aria-label={`Wishlist ${p.name}`}
                    onClick={() =>
                      window.open(
                        whatsappInterestProduct(p),
                        "_blank",
                        "noopener,noreferrer"
                      )
                    }
                  >
                    <Heart className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </button>

                  <div className="mt-3 space-y-0.5">
                    <p className="font-display text-sm font-bold text-white">{p.price}</p>
                    <h3 className="line-clamp-2 font-display text-[11px] font-semibold uppercase leading-snug tracking-[0.06em] text-white/90">
                      {p.name}
                    </h3>
                    <p className="text-[10px] font-medium uppercase tracking-wider text-white/35">
                      {p.category}
                    </p>
                  </div>

                  <div className="mt-2.5 flex items-stretch gap-1.5">
                    <Link
                      href={waBuy}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[32px] flex-1 items-center justify-center rounded-full bg-[#b91c1c] px-2 py-1.5 text-center text-[9px] font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-[#991b1b]"
                    >
                      Buy now
                    </Link>
                    <button
                      type="button"
                      aria-label={`Add ${p.name} to cart`}
                      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/[0.06] text-white transition hover:border-[#b91c1c]/60 hover:bg-[#b91c1c]/15"
                      onClick={() => window.open(waCart, "_blank", "noopener,noreferrer")}
                    >
                      <ShoppingCart className="h-3.5 w-3.5" strokeWidth={1.75} />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-[#b91c1c] transition-[width,transform] duration-150 ease-out"
          style={{
            width: `${scrollMetrics.thumbW}%`,
            marginLeft: `${scrollMetrics.thumbLeft}%`,
          }}
        />
      </div>
    </>
  );
}
