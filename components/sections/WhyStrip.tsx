"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { whyChoose } from "@/data/content";

export function WhyStrip() {
  return (
    <section id="why" className="scroll-mt-8 border-y border-white/10 bg-black py-20 md:py-24">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4"
        >
          {whyChoose.map((item, i) => (
            <motion.div
              key={item.title}
              variants={fadeInUp}
              transition={{ delay: i * 0.06 }}
              className="border-t border-white/10 pt-8"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#b91c1c]">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 font-display text-lg font-semibold uppercase tracking-wide text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/50">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
