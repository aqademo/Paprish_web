"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export function CallToAction() {
  return (
    <section
      id="cta"
      className="scroll-mt-24 bg-paprish-sand py-24 md:py-32"
    >
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8 lg:px-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="rounded-[2rem] border border-stone-200/80 bg-white px-8 py-16 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.12)] sm:px-14 md:py-20"
        >
          <motion.h2
            variants={fadeInUp}
            className="font-display text-3xl font-semibold tracking-tight text-stone-900 text-balance sm:text-4xl"
          >
            Start your journey with authentic spices today
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-5 max-w-lg text-stone-600"
          >
            Order online or message us on WhatsApp — we will help you pick the
            right blends for your kitchen.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="#products"
              className="inline-flex min-w-[10rem] items-center justify-center rounded-full bg-[#b91c1c] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-900/20 transition hover:bg-[#991b1b]"
            >
              Shop Now
            </Link>
            <a
              href="https://wa.me/919000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-w-[10rem] items-center justify-center rounded-full border-2 border-stone-300 bg-transparent px-8 py-3.5 text-sm font-semibold text-stone-800 transition hover:border-[#b91c1c] hover:text-[#b91c1c]"
            >
              Contact Us
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
