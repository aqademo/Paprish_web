"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const img = "/imagesvideos/vibrant-colors-spices-row-generated-by-ai.jpg";

export function SplitGlobal() {
  return (
    <section id="global" className="scroll-mt-8 bg-black">
      <div className="grid min-h-[min(90svh,920px)] md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative order-2 min-h-[420px] md:order-1 md:min-h-full"
          style={{
            position: "relative",
            minHeight: 420,
            width: "100%",
            overflow: "hidden",
          }}
        >
          <Image
            src={img}
            alt="Vibrant row of spices — colour and texture"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="order-1 flex flex-col justify-center px-5 py-20 sm:px-10 lg:px-16 xl:px-24 md:order-2"
        >
          <motion.p
            variants={fadeInUp}
            className="text-xs font-semibold uppercase tracking-[0.35em] text-[#b91c1c]"
          >
            Worldwide
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="mt-5 font-display text-3xl font-bold uppercase leading-[1.02] tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Export quality.
            <br />
            Global tables.
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-8 max-w-lg text-base leading-relaxed text-white/60"
          >
            Trusted by homes and retailers across regions including the Middle East
            — with growing love from customers in Iraq who seek authentic Indian
            spice profiles. ISO-minded packing, batch traceability, cold-chain
            partners.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-wrap gap-6 text-sm text-white/40"
          >
            <span>12+ countries</span>
            <span>50K+ households</span>
            <span>100% natural</span>
          </motion.div>
          <motion.div variants={fadeInUp} className="mt-10">
            <Link
              href="/shop"
              className="inline-flex rounded-full border border-white/30 px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:border-white hover:bg-white hover:text-black"
            >
              Start your order
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
