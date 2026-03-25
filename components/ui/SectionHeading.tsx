"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motion";

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  dark?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  dark = false,
}: Props) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={`mx-auto max-w-3xl ${align === "center" ? "text-center" : "text-left"}`}
    >
      {eyebrow && (
        <p
          className={`mb-3 font-display text-xs font-semibold uppercase tracking-[0.25em] ${
            dark ? "text-red-200/90" : "text-[#b91c1c]"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-[2.65rem] md:leading-[1.12] ${
          dark ? "text-white" : "text-stone-900"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            dark ? "text-stone-300" : "text-stone-600"
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
