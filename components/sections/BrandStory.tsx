"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const img =
  "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85";

export function BrandStory() {
  return (
    <section
      id="story"
      className="scroll-mt-24 border-b border-stone-200/60 bg-paprish-sand py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Our story"
          title="Rooted in the land. Refined for your table."
          subtitle="Paprish partners with farms across Tamil Nadu to source spices at peak harvest — sun-dried where tradition demands it, milled in small batches, and packed with care. No shortcuts. Just the aroma and depth you remember from home."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 grid items-center gap-12 lg:grid-cols-2 lg:gap-20"
        >
          <motion.div
            variants={fadeInUp}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-stone-200 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.2)] ring-1 ring-stone-900/5"
          >
            <Image
              src={img}
              alt="Golden fields and farm landscape"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-stone-900/25 to-transparent" />
          </motion.div>

          <motion.div variants={fadeInUp} className="space-y-6">
            <p className="text-lg leading-relaxed text-stone-700">
              We believe authenticity shows up in flavor — in the crackle of whole
              cumin, the color of true turmeric, and the patience of slow
              roasting. Every batch is traceable, every label honest.
            </p>
            <p className="text-lg leading-relaxed text-stone-700">
              Whether you are cooking for family in Coimbatore or sharing a taste
              of India abroad, Paprish is built to carry that trust from our
              farms to your kitchen.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {["Small-batch milling", "Ethical sourcing", "Tamil Nadu origin"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-stone-300/80 bg-white/80 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-stone-600"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
