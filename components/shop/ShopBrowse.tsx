"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { products } from "@/data/content";
import { ShopProductCard } from "@/components/shop/ShopProductCard";
import { cn } from "@/lib/utils";

const SORT = [
  { value: "featured" as const, label: "Featured" },
  { value: "price-asc" as const, label: "Price: Low to High" },
  { value: "price-desc" as const, label: "Price: High to Low" },
  { value: "name" as const, label: "Name A–Z" },
];

const PRICE_BANDS = [
  { id: "under200", label: "Under ₹200", fn: (n: number) => n < 200 },
  { id: "200-300", label: "₹200 – ₹300", fn: (n: number) => n >= 200 && n <= 300 },
  { id: "over300", label: "Above ₹300", fn: (n: number) => n > 300 },
] as const;

type SortValue = (typeof SORT)[number]["value"];

function toggleSet<T>(set: Set<T>, key: T): Set<T> {
  const next = new Set(set);
  if (next.has(key)) next.delete(key);
  else next.add(key);
  return next;
}

function ShopBrowseSkeleton() {
  return (
    <div className="min-h-[50vh] bg-[#0a0a0a] px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-[1600px] space-y-6 animate-pulse">
        <div className="h-8 w-48 rounded bg-white/10" />
        <div className="h-12 w-72 rounded bg-white/10" />
        <div className="grid grid-cols-2 gap-4 pt-8 lg:grid-cols-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-[4/5] rounded-2xl bg-white/5" />
          ))}
        </div>
      </div>
    </div>
  );
}

function ShopBrowseInner() {
  const searchParams = useSearchParams();
  const qRaw = searchParams.get("q")?.trim().toLowerCase() ?? "";

  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))).sort(),
    []
  );

  const [sort, setSort] = useState<SortValue>("featured");
  const [catOpen, setCatOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [selectedCats, setSelectedCats] = useState<Set<string>>(new Set());
  const [selectedBands, setSelectedBands] = useState<Set<string>>(new Set());
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];

    if (qRaw) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(qRaw) ||
          p.description.toLowerCase().includes(qRaw) ||
          p.category.toLowerCase().includes(qRaw)
      );
    }

    if (selectedCats.size > 0) {
      list = list.filter((p) => selectedCats.has(p.category));
    }
    if (selectedBands.size > 0) {
      list = list.filter((p) =>
        Array.from(selectedBands).some((id) => {
          const band = PRICE_BANDS.find((b) => b.id === id);
          return band?.fn(p.priceInr);
        })
      );
    }

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.priceInr - b.priceInr);
        break;
      case "price-desc":
        list.sort((a, b) => b.priceInr - a.priceInr);
        break;
      case "name":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return list;
  }, [qRaw, selectedCats, selectedBands, sort]);

  const clearFilters = () => {
    setSelectedCats(new Set());
    setSelectedBands(new Set());
  };

  const hasFilters = selectedCats.size > 0 || selectedBands.size > 0;

  const filterPanel = (
    <div className="space-y-6">
      <div>
        <button
          type="button"
          onClick={() => setCatOpen((o) => !o)}
          className="flex w-full items-center justify-between border-b border-white/10 py-3 text-left text-sm font-semibold uppercase tracking-[0.12em] text-white"
        >
          Category
          <ChevronDown
            className={cn("h-4 w-4 transition", catOpen && "rotate-180")}
            strokeWidth={1.75}
          />
        </button>
        {catOpen && (
          <ul className="mt-3 space-y-2.5 pb-1">
            {categories.map((c) => (
              <li key={c}>
                <label className="flex cursor-pointer items-center gap-3 text-sm text-white/70 transition hover:text-white">
                  <input
                    type="checkbox"
                    checked={selectedCats.has(c)}
                    onChange={() => setSelectedCats((s) => toggleSet(s, c))}
                    className="h-4 w-4 rounded border-white/25 bg-transparent text-[#b91c1c] focus:ring-[#b91c1c]"
                  />
                  {c}
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <button
          type="button"
          onClick={() => setPriceOpen((o) => !o)}
          className="flex w-full items-center justify-between border-b border-white/10 py-3 text-left text-sm font-semibold uppercase tracking-[0.12em] text-white"
        >
          Price
          <ChevronDown
            className={cn("h-4 w-4 transition", priceOpen && "rotate-180")}
            strokeWidth={1.75}
          />
        </button>
        {priceOpen && (
          <ul className="mt-3 space-y-2.5 pb-1">
            {PRICE_BANDS.map((b) => (
              <li key={b.id}>
                <label className="flex cursor-pointer items-center gap-3 text-sm text-white/70 transition hover:text-white">
                  <input
                    type="checkbox"
                    checked={selectedBands.has(b.id)}
                    onChange={() => setSelectedBands((s) => toggleSet(s, b.id))}
                    className="h-4 w-4 rounded border-white/25 bg-transparent text-[#b91c1c] focus:ring-[#b91c1c]"
                  />
                  {b.label}
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>

      {hasFilters && (
        <button
          type="button"
          onClick={clearFilters}
          className="text-xs font-semibold uppercase tracking-[0.15em] text-[#b91c1c] underline-offset-4 hover:underline"
        >
          Reset filters
        </button>
      )}
    </div>
  );

  return (
    <div className="bg-[#0a0a0a] text-neutral-100">
      {/* Announcement strip — Nike-style utility bar, Paprish colours */}
      <div className="border-b border-white/[0.06] bg-stone-900/80">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-center gap-x-6 gap-y-1 px-5 py-2.5 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-white/65 sm:justify-between sm:text-left">
          <span>
            Farm-sourced in Tamil Nadu · <span className="text-[#b91c1c]">100% natural</span>
          </span>
          <span className="hidden sm:inline text-white/40">|</span>
          <span>Order on WhatsApp · Easy bulk enquiries</span>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-5 pb-20 pt-8 sm:px-8 lg:px-12 lg:pt-10">
        {/* Title row + sort — PLP header */}
        <div className="flex flex-col gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#b91c1c]">
              Shop
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-white md:text-4xl lg:text-5xl">
              All products
              <span className="ml-2 text-lg font-normal text-white/40 md:text-xl">
                ({filtered.length})
              </span>
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/50">
              {qRaw ? (
                <>
                  Results for &ldquo;{searchParams.get("q")?.trim()}&rdquo; — refine with
                  filters or clear search from the header.
                </>
              ) : (
                <>
                  Masalas, whole spices, and blends — small-batch milled. Filter by category
                  or price, then order via WhatsApp or checkout.
                </>
              )}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/checkout"
                className="inline-flex rounded-full border border-white/20 bg-white/[0.04] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:border-[#b91c1c]/50 hover:bg-[#b91c1c]/10"
              >
                Go to checkout
              </Link>
              <Link
                href="/#collection"
                className="inline-flex items-center rounded-full px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-white/45 transition hover:text-white"
              >
                ← Back to home
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 lg:shrink-0">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" strokeWidth={1.75} />
              Filters
              {hasFilters && (
                <span className="flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-[#b91c1c] px-1 text-[10px] font-bold text-white">
                  {selectedCats.size + selectedBands.size}
                </span>
              )}
            </button>

            <label className="relative inline-flex items-center">
              <span className="sr-only">Sort by</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortValue)}
                className="appearance-none rounded-full border border-white/20 bg-stone-900/90 py-2.5 pl-4 pr-10 text-xs font-semibold uppercase tracking-[0.1em] text-white"
              >
                {SORT.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50"
                strokeWidth={1.75}
              />
            </label>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:gap-12">
          {/* Desktop sidebar */}
          <aside className="hidden w-56 shrink-0 lg:block">
            <div className="sticky top-32 xl:top-36">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                Refine
              </p>
              {filterPanel}
            </div>
          </aside>

          {/* Mobile filter drawer */}
          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-[200] lg:hidden" role="dialog" aria-modal="true">
              <button
                type="button"
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                aria-label="Close filters"
                onClick={() => setMobileFiltersOpen(false)}
              />
              <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-2xl border border-white/10 bg-[#111] p-6 shadow-2xl">
                <div className="mb-4 flex items-center justify-between">
                  <p className="font-display text-lg font-semibold uppercase tracking-wide text-white">
                    Filters
                  </p>
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(false)}
                    className="rounded-full p-2 text-white/60 hover:bg-white/10 hover:text-white"
                    aria-label="Close"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                {filterPanel}
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="mt-8 w-full rounded-full bg-[#b91c1c] py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white"
                >
                  Show {filtered.length} products
                </button>
              </div>
            </div>
          )}

          {/* Grid */}
          <div className="min-w-0 flex-1">
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-20 text-center">
                <p className="font-display text-lg text-white/80">No products match</p>
                <p className="mt-2 text-sm text-white/45">Try adjusting filters or reset.</p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 text-xs font-semibold uppercase tracking-[0.15em] text-[#b91c1c] underline-offset-4 hover:underline"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
                {filtered.map((p) => (
                  <li key={p.id}>
                    <ShopProductCard product={p} variant="plp" />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ShopBrowse() {
  return (
    <Suspense fallback={<ShopBrowseSkeleton />}>
      <ShopBrowseInner />
    </Suspense>
  );
}
