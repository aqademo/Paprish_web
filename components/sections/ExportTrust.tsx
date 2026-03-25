"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const stats = [
  { value: "12+", label: "Countries served" },
  { value: "50K+", label: "Happy households" },
  { value: "100%", label: "Natural ingredients" },
];

const badges = ["ISO-minded packing", "Batch traceability", "Cold-chain partners"];

export function ExportTrust() {
  return (
    <section
      id="export"
      className="scroll-mt-24 border-y border-stone-200/60 bg-gradient-to-br from-[#7f1d1d] via-[#b91c1c] to-[#991b1b] py-24 text-white md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <SectionHeading
          eyebrow="Global reach"
          title="Trusted from Tamil Nadu to tables worldwide"
          subtitle="We proudly serve families and retailers across regions including the Middle East — with growing love from customers in Iraq who seek authentic Indian spice profiles."
          dark
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 grid gap-6 sm:grid-cols-3"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              variants={fadeInUp}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-white/15 bg-white/10 px-6 py-8 text-center backdrop-blur-sm"
            >
              <p className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                {s.value}
              </p>
              <p className="mt-2 text-sm text-red-100/90">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          {badges.map((b) => (
            <span
              key={b}
              className="rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-medium uppercase tracking-wider text-red-50"
            >
              {b}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
