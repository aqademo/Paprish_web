"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "#story", label: "Story" },
  { href: "#products", label: "Products" },
  { href: "#why", label: "Why Us" },
  { href: "#export", label: "Global" },
  { href: "#reviews", label: "Reviews" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background,box-shadow,backdrop-filter] duration-300 ${
        scrolled
          ? "border-b border-stone-200/80 bg-white/85 shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-paprish-cream/70 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="font-display text-xl font-semibold tracking-tight text-stone-900"
        >
          Paprish
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-stone-600 transition hover:text-[#b91c1c]"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="#cta"
            className="rounded-full bg-[#b91c1c] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#991b1b]"
          >
            Shop Now
          </Link>
        </div>

        <button
          type="button"
          aria-label="Open menu"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-200/80 bg-white/80 text-stone-800 md:hidden"
          onClick={() => setOpen(true)}
        >
          <span className="sr-only">Menu</span>
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
            <path
              d="M1 1h18M1 7h18M1 13h18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-stone-950/40 backdrop-blur-sm md:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="absolute right-0 top-0 flex h-full w-[min(100%,20rem)] flex-col bg-white p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-10 flex items-center justify-between">
                <span className="font-display text-lg font-semibold">Menu</span>
                <button
                  type="button"
                  aria-label="Close menu"
                  className="rounded-full p-2 text-stone-600"
                  onClick={() => setOpen(false)}
                >
                  ✕
                </button>
              </div>
              <div className="flex flex-col gap-6">
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="text-lg font-medium text-stone-800"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                ))}
                <Link
                  href="#cta"
                  className="mt-4 rounded-full bg-[#b91c1c] py-3 text-center font-semibold text-white"
                  onClick={() => setOpen(false)}
                >
                  Shop Now
                </Link>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
