"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const img = "/imagesvideos/various-colorful-spices-spice-bazaar.jpg";

export function SplitBrand() {
  return (
    <section id="story" className="scroll-mt-8 bg-black">
      <div className="grid min-h-[min(90svh,920px)] md:grid-cols-2">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col justify-center px-5 py-20 sm:px-10 lg:px-16 xl:px-24"
        >
          <motion.p
            variants={fadeInUp}
            className="text-xs font-semibold uppercase tracking-[0.35em] text-[#b91c1c]"
          >
            The story
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="mt-5 font-display text-3xl font-bold uppercase leading-[1.02] tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Farm sourcing.
            <br />
            Absolute authenticity.
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-8 max-w-lg text-base leading-relaxed text-white/60"
          >
            Paprish partners with farms across Tamil Nadu to harvest at peak
            season — sun-dried, slow-roasted, and milled in small batches. Every
            label tells the truth: what is inside, and where it came from.
          </motion.p>
          <motion.div variants={fadeInUp} className="mt-10">
            <Link
              href="#collection"
              className="inline-flex rounded-full border border-white/30 px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:border-white hover:bg-white hover:text-black"
            >
              Shop the range
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-[420px] md:min-h-full"
          style={{
            position: "relative",
            minHeight: 420,
            width: "100%",
            overflow: "hidden",
          }}
        >
          <Image
            src={img}
            alt="Colourful spices at a spice bazaar"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
      </div>
    </section>
  );
}
