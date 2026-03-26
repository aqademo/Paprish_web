"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { fadeInUp } from "@/lib/motion";

/** Parent stays opaque — `staggerContainer` used to set parent opacity 0, which hid all copy if motion stalled. */
const heroStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

export function HeroContent() {
  return (
    <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1600px] flex-col justify-end px-5 pb-20 pt-36 sm:px-8 sm:pt-40 lg:justify-center lg:px-12 lg:pb-0">
      <motion.div
        variants={heroStagger}
        initial="hidden"
        animate="visible"
        className="relative max-w-4xl"
      >
        <motion.p
          variants={fadeInUp}
          className="font-display text-xs font-semibold uppercase tracking-[0.4em] text-red-400/90"
        >
          Paprish · Farm to table
        </motion.p>
        <motion.h1
          variants={fadeInUp}
          className="mt-6 font-display text-[clamp(2.25rem,6vw,4.25rem)] font-bold uppercase leading-[1.02] tracking-tight text-white"
        >
          From Farm to Table
          <br />
          <span className="text-white/90">Pure, Authentic Spices</span>
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          className="mt-6 max-w-lg text-base leading-relaxed text-white/75 sm:text-lg"
        >
          100% natural, no compromise on quality or taste
        </motion.p>
        <motion.div
          variants={fadeInUp}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Link
            href="/shop"
            className="inline-flex rounded-full border border-white/50 bg-white/10 px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition hover:border-white hover:bg-white hover:text-black"
          >
            Shop Now
          </Link>
          <a
            href="https://wa.me/919000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-full border border-white/25 px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/90 transition hover:border-white/60"
          >
            WhatsApp
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
