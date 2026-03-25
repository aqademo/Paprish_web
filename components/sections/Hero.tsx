"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/motion";

const bg =
  "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=2400&q=85";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={bg}
          alt="Aromatic spices and herbs"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/75 via-stone-900/55 to-stone-950/85" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay [background-image:url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 pb-24 pt-32 sm:px-8 lg:px-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.p
            variants={fadeInUp}
            className="font-display text-sm font-medium uppercase tracking-[0.35em] text-red-200/90"
          >
            Paprish Foods
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-white text-balance sm:text-5xl md:text-6xl lg:text-[3.35rem] lg:leading-[1.05]"
          >
            From Farm to Table – Pure, Authentic Spices
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="mt-6 max-w-xl text-lg leading-relaxed text-stone-200/95 sm:text-xl"
          >
            100% natural, no compromise on quality or taste
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Link
              href="#cta"
              className="inline-flex items-center justify-center rounded-full bg-[#b91c1c] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_12px_40px_-12px_rgba(185,28,28,0.65)] transition hover:bg-[#991b1b] hover:shadow-[0_16px_48px_-12px_rgba(185,28,28,0.55)]"
            >
              Shop Now
            </Link>
            <a
              href="https://wa.me/919000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/40 hover:bg-white/15"
            >
              Contact on WhatsApp
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 md:block"
          aria-hidden
        >
          <div className="h-12 w-[1px] bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
