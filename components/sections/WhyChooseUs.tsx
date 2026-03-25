"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { whyChoose } from "@/data/content";

const icons: Record<string, ReactNode> = {
  leaf: (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 22c4-4 8-9.5 8-15a8 8 0 10-16 0c0 5.5 4 11 8 15z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M12 22V10M8 14c2 1 4 1 8 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  shield: (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3l8 4v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V7l8-4z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9 12l2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  sprout: (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 22v-8M8 14c-2-4-1-8 2-10 3 4 3 8 2 10M16 14c2-4 1-8-2-10-3 4-3 8-2 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M6 20h12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  globe: (
    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3 12h18M12 3a15 15 0 000 18M12 3a15 15 0 010 18"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  ),
};

export function WhyChooseUs() {
  return (
    <section id="why" className="scroll-mt-24 bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Why Paprish"
          title="Purity you can taste. Standards you can trust."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {whyChoose.map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeInUp}
              transition={{ delay: i * 0.06 }}
              className="group rounded-2xl border border-stone-200/90 bg-paprish-cream/50 p-8 transition hover:border-[#b91c1c]/25 hover:bg-white hover:shadow-[0_16px_48px_-24px_rgba(0,0,0,0.12)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#b91c1c]/10 text-[#b91c1c] transition group-hover:bg-[#b91c1c] group-hover:text-white">
                {icons[item.icon]}
              </div>
              <h3 className="mt-6 font-display text-lg font-semibold text-stone-900">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
