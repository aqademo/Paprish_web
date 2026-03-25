"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useState } from "react";

const WA = "919000000000";

export default function CheckoutPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const submitWhatsApp = () => {
    const text = [
      "New order — Paprish Checkout",
      "",
      `Name: ${name || "—"}`,
      `Email: ${email || "—"}`,
      `Phone: ${phone || "—"}`,
      `Address: ${address || "—"}`,
      notes ? `Notes: ${notes}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `https://wa.me/${WA}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black pt-24 pb-20 sm:pt-32">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#b91c1c]">
            Checkout
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight text-white md:text-4xl">
            Complete your order
          </h1>
          <p className="mt-4 text-sm text-white/55">
            Fill in your details — we&apos;ll confirm on WhatsApp. Payment and
            delivery options are coordinated directly with our team.
          </p>

          <form
            className="mt-12 space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              submitWhatsApp();
            }}
          >
            <div>
              <label
                htmlFor="co-name"
                className="block text-xs font-medium uppercase tracking-wider text-white/50"
              >
                Full name
              </label>
              <input
                id="co-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                className="mt-2 w-full border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#b91c1c]/60 focus:outline-none"
                placeholder="Your name"
              />
            </div>
            <div>
              <label
                htmlFor="co-email"
                className="block text-xs font-medium uppercase tracking-wider text-white/50"
              >
                Email
              </label>
              <input
                id="co-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="mt-2 w-full border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#b91c1c]/60 focus:outline-none"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="co-phone"
                className="block text-xs font-medium uppercase tracking-wider text-white/50"
              >
                Phone (WhatsApp)
              </label>
              <input
                id="co-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
                className="mt-2 w-full border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#b91c1c]/60 focus:outline-none"
                placeholder="+91 …"
              />
            </div>
            <div>
              <label
                htmlFor="co-address"
                className="block text-xs font-medium uppercase tracking-wider text-white/50"
              >
                Shipping address
              </label>
              <textarea
                id="co-address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
                className="mt-2 w-full resize-y border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#b91c1c]/60 focus:outline-none"
                placeholder="Street, city, PIN"
              />
            </div>
            <div>
              <label
                htmlFor="co-notes"
                className="block text-xs font-medium uppercase tracking-wider text-white/50"
              >
                Order notes (optional)
              </label>
              <textarea
                id="co-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className="mt-2 w-full resize-y border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#b91c1c]/60 focus:outline-none"
                placeholder="Products & quantities"
              />
            </div>

            <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:items-center">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-[#b91c1c] px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#991b1b]"
              >
                Send order on WhatsApp
              </button>
              <Link
                href="/shop"
                className="text-center text-xs font-medium uppercase tracking-wider text-white/45 transition hover:text-white sm:text-left"
              >
                ← Continue shopping
              </Link>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
