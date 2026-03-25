"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";

const img = "/newsletter-spices.jpg";

export function NewsletterSplit() {
  return (
    <section id="cta" className="scroll-mt-8 bg-black">
      <div className="grid min-h-[min(85svh,800px)] md:grid-cols-2">
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
            Community
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="mt-5 font-display text-3xl font-bold uppercase leading-[1.02] tracking-tight text-white sm:text-4xl"
          >
            Join our table
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="mt-6 max-w-md text-base leading-relaxed text-white/55"
          >
            Recipes, harvest notes, and new drops — leave your email. No spam,
            only flavor.
          </motion.p>
          <motion.form
            variants={fadeInUp}
            className="mt-10 flex max-w-md flex-col gap-3 sm:flex-row sm:items-stretch"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="email-cta" className="sr-only">
              Email
            </label>
            <input
              id="email-cta"
              type="email"
              placeholder="Email address"
              className="min-h-[48px] flex-1 border border-white/20 bg-white/5 px-4 text-sm text-white placeholder:text-white/35 focus:border-white/50 focus:outline-none"
            />
            <button
              type="submit"
              className="min-h-[48px] rounded-full border border-white bg-white px-8 text-xs font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-[#b91c1c] hover:text-white"
            >
              Join
            </button>
          </motion.form>
          <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50 underline-offset-4 hover:text-white"
            >
              Shop Now
            </Link>
            <a
              href="https://wa.me/919000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50 underline-offset-4 hover:text-white"
            >
              Contact Us
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-[380px] md:min-h-full"
          style={{
            position: "relative",
            minHeight: 380,
            width: "100%",
            overflow: "hidden",
          }}
        >
          <Image
            src={img}
            alt="Cooking with spices"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent md:hidden" />
        </motion.div>
      </div>
    </section>
  );
}
