"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ProductCarousel } from "@/components/sections/ProductCarousel";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { products } from "@/data/content";
import { cn } from "@/lib/utils";

type FilterId = "all" | "masalas" | "whole" | "bestsellers";

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "masalas", label: "Masalas" },
  { id: "whole", label: "Whole spices" },
  { id: "bestsellers", label: "Best sellers" },
];

export function ProductShop() {
  const [filter, setFilter] = useState<FilterId>("all");

  const filtered = useMemo(() => {
    switch (filter) {
      case "masalas":
        return products.filter((p) => p.category === "Masalas");
      case "whole":
        return products.filter((p) => p.category === "Whole spices");
      case "bestsellers":
        return products.filter((p) => p.badge);
      default:
        return products;
    }
  }, [filter]);

  /** Enough cards to scroll on most viewports */
  const carouselProducts = useMemo(() => {
    let list = filtered;
    if (list.length < 9) {
      list = [...list, ...list, ...list];
    }
    return list;
  }, [filtered]);

  return (
    <section
      id="shop"
      className="scroll-mt-28 border-b border-white/10 bg-black py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        {/* Title row — reference: New arrivals + Popular right now | Shop now */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <motion.div variants={fadeInUp}>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#b91c1c]">
              New arrivals
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl md:text-4xl">
              Popular right now
            </h2>
          </motion.div>
          <motion.div variants={fadeInUp} className="sm:shrink-0">
            <Link
              href="/shop"
              className="text-sm font-semibold uppercase tracking-[0.12em] text-white underline decoration-white/30 underline-offset-4 transition hover:decoration-[#b91c1c] hover:text-[#fecaca]"
            >
              Shop now
            </Link>
          </motion.div>
        </motion.div>

        {/* Filters — above the carousel */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-5 flex flex-wrap gap-2"
        >
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={cn(
                "rounded-sm border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition",
                filter === f.id
                  ? "border-[#b91c1c] bg-[#b91c1c] text-white"
                  : "border-white/25 bg-transparent text-white hover:border-white/50 hover:text-white"
              )}
            >
              {f.id === "bestsellers" ? (
                <span className="inline-flex items-center gap-1.5">
                  <span className="text-amber-400" aria-hidden>
                    ⚡
                  </span>
                  {f.label}
                </span>
              ) : (
                f.label
              )}
            </button>
          ))}
        </motion.div>

        <p className="mb-6 max-w-xl text-sm text-white/45">
          Masalas, whole spices, and blends — scroll sideways to explore.
        </p>

        <ProductCarousel products={carouselProducts} />
      </div>
    </section>
  );
}
