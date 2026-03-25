"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { products } from "@/data/content";

export function ProductStrip() {
  return (
    <section id="collection" className="scroll-mt-24 bg-black py-20 md:py-28">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <motion.div variants={fadeInUp}>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#b91c1c]">
              New arrivals
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight text-white md:text-4xl">
              The collection
            </h2>
          </motion.div>
          <motion.p
            variants={fadeInUp}
            className="max-w-md text-sm leading-relaxed text-white/55"
          >
            Masalas, whole spices, and blends — minimal processing, maximum aroma.
          </motion.p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="-mx-5 flex gap-6 overflow-x-auto pb-4 pl-5 pr-5 sm:mx-0 sm:px-0 [scrollbar-width:none] md:gap-8 [&::-webkit-scrollbar]:hidden"
        >
          {products.map((p) => (
            <article
              key={p.id}
              className="group relative w-[72vw] min-w-[72vw] shrink-0 sm:w-[42vw] sm:min-w-[42vw] md:w-[28vw] md:min-w-[28vw] lg:w-[22vw] lg:min-w-[22vw]"
            >
              <div
                className="relative aspect-[3/4] overflow-hidden bg-neutral-900"
                style={{
                  position: "relative",
                  aspectRatio: "3 / 4",
                  overflow: "hidden",
                  width: "100%",
                }}
              >
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 72vw, 28vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
              </div>
              <div className="mt-5 space-y-1">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-white">
                    {p.name}
                  </h3>
                  <span className="shrink-0 font-display text-sm font-semibold text-[#b91c1c]">
                    {p.price}
                  </span>
                </div>
                <p className="line-clamp-2 text-sm text-white/50">{p.description}</p>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
