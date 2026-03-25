import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Wishlist | Paprish",
  description: "Your saved Paprish products — order via WhatsApp.",
};

export default function WishlistPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black pt-28 pb-20 sm:pt-32">
        <div className="mx-auto max-w-lg px-5 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#b91c1c]">
            Favourites
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight text-white">
            Wishlist
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-white/55">
            Save products by tapping the heart on a product, or message us on WhatsApp with
            your list — we&apos;ll confirm availability and pricing.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="inline-flex rounded-full bg-[#b91c1c] px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#991b1b]"
            >
              Browse shop
            </Link>
            <a
              href="https://wa.me/919000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full border border-white/25 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:border-white/50"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
