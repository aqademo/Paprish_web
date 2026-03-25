"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/content";

export function Testimonials() {
  return (
    <section
      id="reviews"
      className="scroll-mt-24 bg-paprish-cream py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Voices"
          title="Loved by cooks who care about flavor"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-16 grid gap-6 md:grid-cols-3"
        >
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              variants={fadeInUp}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col rounded-2xl border border-stone-200/80 bg-white p-8 shadow-sm"
            >
              <div className="text-[#b91c1c]" aria-hidden>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 17h3l1-4H7v-4h5l1-4H5v12h2zm8 0h3l1-4h-4v-4h5l1-4h-8v12h2z" />
                </svg>
              </div>
              <blockquote className="mt-5 flex-1 text-base leading-relaxed text-stone-700">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-8 border-t border-stone-100 pt-6">
                <p className="font-display font-semibold text-stone-900">{t.name}</p>
                <p className="text-sm text-stone-500">{t.role}</p>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
