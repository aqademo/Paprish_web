import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ShopBrowse } from "@/components/shop/ShopBrowse";

export const metadata: Metadata = {
  title: "Shop | Paprish",
  description:
    "Browse Paprish masalas, whole spices, and blends — farm-sourced from Tamil Nadu.",
};

export default function ShopPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0a0a0a] pt-20 sm:pt-28">
        <ShopBrowse />
      </main>
      <Footer />
    </>
  );
}
