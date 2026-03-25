import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Account | Paprish",
  description: "Sign in or create a Paprish account — coming soon.",
};

export default function AccountPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black pt-28 pb-20 sm:pt-32">
        <div className="mx-auto max-w-lg px-5 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#b91c1c]">
            Account
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight text-white">
            Sign in
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-white/55">
            Online accounts are coming soon. Order today via{" "}
            <a
              href="https://wa.me/919000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#b91c1c] underline-offset-4 hover:underline"
            >
              WhatsApp
            </a>{" "}
            or continue shopping.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-flex rounded-full border border-white/25 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:border-white/50"
          >
            Continue shopping
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
