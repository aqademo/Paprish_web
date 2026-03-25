"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { products } from "@/data/content";

export function ProductShowcase() {
  return (
    <section
      id="products"
      className="scroll-mt-24 bg-paprish-cream py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Collection"
          title="Spices & masalas, crafted with intention"
          subtitle="A glimpse of our range — from everyday essentials to signature blends."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {products.map((p, i) => (
            <motion.article
              key={p.id}
              variants={fadeInUp}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] ring-1 ring-stone-200/80 transition-shadow duration-300 hover:shadow-[0_20px_50px_-20px_rgba(185,28,28,0.18)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-stone-900">
                  {p.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">
                  {p.description}
                </p>
                <p className="mt-4 inline-flex items-center text-sm font-semibold text-[#b91c1c] transition group-hover:gap-2">
                  View details
                  <span className="ml-1 transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
