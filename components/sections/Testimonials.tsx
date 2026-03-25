"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { testimonials } from "@/data/content";

export function Testimonials() {
  return (
    <section id="reviews" className="scroll-mt-24 bg-neutral-950 py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold uppercase tracking-[0.35em] text-[#b91c1c]"
        >
          Voices
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="mt-4 font-display text-3xl font-bold uppercase tracking-tight text-white md:text-4xl"
        >
          What people say
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8"
        >
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              variants={fadeInUp}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col border border-white/10 bg-black/40 p-8"
            >
              <blockquote className="flex-1 text-sm leading-relaxed text-white/70">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-8 border-t border-white/10 pt-6">
                <p className="font-display text-sm font-semibold uppercase tracking-wide text-white">
                  {t.name}
                </p>
                <p className="mt-1 text-xs text-white/40">{t.role}</p>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
