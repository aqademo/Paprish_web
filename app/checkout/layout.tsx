import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Checkout | Paprish",
  description: "Complete your Paprish order — shipping details and WhatsApp confirmation.",
};

export default function CheckoutLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
