export type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  /** Numeric INR for filters / sort on the shop page */
  priceInr: number;
  category: string;
  badge?: string;
};

/** Paprish pack photography — cycles across the collection grid */
const PACK_IMG = [
  "/products/IMG_3740.PNG",
  "/products/IMG_3741.PNG",
  "/products/IMG_3742.PNG",
] as const;

export const products: Product[] = [
  {
    id: "1",
    name: "Garam Masala",
    description: "Warm, aromatic blend for curries and rice.",
    image: PACK_IMG[0],
    price: "₹299",
    priceInr: 299,
    category: "Masalas",
    badge: "Bestseller",
  },
  {
    id: "2",
    name: "Turmeric Powder",
    description: "Vibrant, single-origin turmeric with earthy depth.",
    image: PACK_IMG[1],
    price: "₹249",
    priceInr: 249,
    category: "Masalas",
    badge: "Farm fresh",
  },
  {
    id: "3",
    name: "Red Chili Powder",
    description: "Sun-dried chilies, stone-ground for bold heat.",
    image: PACK_IMG[2],
    price: "₹189",
    priceInr: 189,
    category: "Masalas",
  },
  {
    id: "4",
    name: "Whole Coriander",
    description: "Citrusy aroma — toast & grind fresh for peak flavor.",
    image: PACK_IMG[0],
    price: "₹159",
    priceInr: 159,
    category: "Whole spices",
  },
  {
    id: "5",
    name: "Cumin Whole",
    description: "Cooling, nutty notes for dals and tadkas.",
    image: PACK_IMG[1],
    price: "₹179",
    priceInr: 179,
    category: "Whole spices",
  },
  {
    id: "6",
    name: "Biryani Masala",
    description: "Layered spices crafted for fragrant, slow-cooked rice.",
    image: PACK_IMG[2],
    price: "₹329",
    priceInr: 329,
    category: "Masalas",
    badge: "Just in",
  },
];

/** First three items — featured shop row above Story */
export const featuredProducts = products.slice(0, 3);

export const whyChoose = [
  {
    title: "100% Natural",
    description: "No fillers. Ingredients you can trace from soil to jar.",
    icon: "leaf",
  },
  {
    title: "No Preservatives",
    description: "Clean labels. Traditional processing, modern safety.",
    icon: "shield",
  },
  {
    title: "Farm Fresh",
    description: "Partner farms across Tamil Nadu with seasonal harvests.",
    icon: "sprout",
  },
  {
    title: "Export Quality",
    description: "Packed to global standards — trusted beyond borders.",
    icon: "globe",
  },
];

export const testimonials = [
  {
    quote:
      "The aroma when you open a Paprish jar is unmatched. Our kitchen in Baghdad finally tastes like home.",
    name: "Layla H.",
    role: "Home chef, Iraq",
  },
  {
    quote:
      "We stock Paprish for our restaurant — consistent grind, bold flavor, happy guests every service.",
    name: "Vikram S.",
    role: "Chef & owner, Chennai",
  },
  {
    quote:
      "Clean ingredients, beautiful packaging, and a team that cares about sourcing. Highly recommend.",
    name: "Priya M.",
    role: "Food blogger, UK",
  },
];
