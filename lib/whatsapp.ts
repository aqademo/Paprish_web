import type { Product } from "@/data/content";

/** Digits only for wa.me (display: +91 8531934020) */
export const WHATSAPP_E164 = "918531934020";

export const WHATSAPP_CHAT_BASE = `https://wa.me/${WHATSAPP_E164}`;

export function whatsappLink(message: string): string {
  return `${WHATSAPP_CHAT_BASE}?text=${encodeURIComponent(message)}`;
}

/** Buy now — includes product name, price, category, id */
export function whatsappBuyProduct(p: Pick<Product, "id" | "name" | "price" | "category">): string {
  return whatsappLink(
    [
      "Hi Paprish — I'd like to buy:",
      "",
      `Product: ${p.name}`,
      `Price: ${p.price}`,
      `Category: ${p.category}`,
      `Ref / SKU: ${p.id}`,
    ].join("\n")
  );
}

/** Add to cart / heart follow-up */
export function whatsappCartProduct(p: Pick<Product, "id" | "name" | "price" | "category">): string {
  return whatsappLink(
    `Add to cart: ${p.name} — ${p.price} · ${p.category} (Ref: ${p.id})`
  );
}

export function whatsappInterestProduct(p: Pick<Product, "name" | "price">): string {
  return whatsappLink(`Interested in: ${p.name} (${p.price})`);
}
