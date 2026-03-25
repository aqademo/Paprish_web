"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useEffect, useRef, useState } from "react";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/#collection", label: "Collection" },
  { href: "/#story", label: "Our Story" },
  { href: "/#why", label: "Why Paprish" },
] as const;

function RetailHeaderFallback() {
  return (
    <header className="fixed inset-x-0 top-0 z-[100] border-b border-white/10 bg-black/95 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-[1600px] items-center px-4 sm:px-6 lg:px-8">
        <div className="h-6 w-28 animate-pulse rounded bg-white/10" aria-hidden />
        <div className="ml-auto h-9 w-40 animate-pulse rounded-full bg-white/10" aria-hidden />
      </div>
    </header>
  );
}

function RetailHeaderInner() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [q, setQ] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    setQ(searchParams.get("q") ?? "");
  }, [searchParams]);

  useEffect(() => {
    if (mobileOpen || mobileSearchOpen) setHeaderHidden(false);
  }, [mobileOpen, mobileSearchOpen]);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      window.requestAnimationFrame(() => {
        if (mobileOpen || mobileSearchOpen) {
          ticking.current = false;
          return;
        }

        const y = window.scrollY;
        const delta = y - lastScrollY.current;
        lastScrollY.current = y;

        if (y < 48) {
          setHeaderHidden(false);
        } else if (delta > 12) {
          setHeaderHidden(true);
        } else if (delta < -12) {
          setHeaderHidden(false);
        }

        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileOpen, mobileSearchOpen]);

  function submitSearch(e: FormEvent) {
    e.preventDefault();
    const query = q.trim();
    const params = new URLSearchParams(searchParams.toString());
    if (query) params.set("q", query);
    else params.delete("q");
    const qs = params.toString();
    router.push(qs ? `/shop?${qs}` : "/shop");
    setMobileOpen(false);
    setMobileSearchOpen(false);
  }

  return (
    <header
      className="fixed inset-x-0 top-0 z-[100]"
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100 }}
    >
      <div
        className={cn(
          "will-change-transform transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
          headerHidden && "-translate-y-full",
          headerHidden && "pointer-events-none"
        )}
        aria-hidden={headerHidden}
      >
      {/* Utility row — Nike-style top strip (desktop+); paprish-* = layout fallback if CSS chunk missing */}
      <div className="paprish-utility-wrap border-b border-white/[0.07] bg-black">
        <div className="paprish-utility-inner sm:px-6 lg:px-8">
          <Link href="/checkout" className="transition hover:text-white">
            Help
          </Link>
          <span className="text-white/20" aria-hidden>
            |
          </span>
          <Link href="/account" className="transition hover:text-white">
            Sign in
          </Link>
        </div>
      </div>

      {/* Main bar */}
      <div className="border-b border-white/10 bg-black/95 backdrop-blur-xl paprish-mainbar">
        <div className="mx-auto flex max-w-[1600px] items-center gap-2 px-3 py-3 sm:gap-4 sm:px-6 lg:px-8 paprish-main-row">
          <button
            type="button"
            className="paprish-menu-btn rounded-md p-2 text-white hover:bg-white/10 lg:hidden"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-6 w-6" strokeWidth={1.5} />
          </button>

          <Link
            href="/"
            className="paprish-logo-link flex shrink-0 items-center lg:mr-2"
            aria-label="Paprish home"
          >
            <Image
              src="/paprish-logo.svg"
              alt="Paprish"
              width={132}
              height={28}
              className="h-6 w-auto sm:h-7"
              priority
            />
          </Link>

          <nav
            className="paprish-nav-desktop ml-2 items-center gap-7 xl:gap-9"
            aria-label="Primary"
          >
            {NAV_LINKS.map((item) => {
              const active = item.href === "/shop" && pathname === "/shop";
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-[13px] font-semibold uppercase tracking-[0.12em] transition",
                    active ? "text-white" : "text-white/55 hover:text-white"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Search — desktop */}
          <form
            onSubmit={submitSearch}
            className="paprish-search-desktop mx-2 min-w-0 flex-1 justify-center"
          >
            <div className="relative w-full max-w-md xl:max-w-lg">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-white/35"
                strokeWidth={1.75}
              />
              <input
                type="search"
                name="q"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search spices, masalas…"
                autoComplete="off"
                className="w-full rounded-full border border-white/15 bg-white/[0.06] py-2.5 pl-11 pr-4 text-[13px] text-white placeholder:text-white/35 focus:border-[#b91c1c]/45 focus:outline-none focus:ring-1 focus:ring-[#b91c1c]/25"
              />
            </div>
          </form>

          <div className="paprish-actions ml-auto flex items-center gap-0.5 sm:gap-1">
            <button
              type="button"
              className="rounded-full p-2.5 text-white hover:bg-white/10 lg:hidden"
              aria-label="Search"
              onClick={() => setMobileSearchOpen((o) => !o)}
            >
              <Search className="h-[22px] w-[22px]" strokeWidth={1.5} />
            </button>

            <Link
              href="/account"
              className="hidden rounded-full p-2.5 text-white hover:bg-white/10 sm:inline-flex"
              aria-label="Account"
            >
              <User className="h-[22px] w-[22px]" strokeWidth={1.5} />
            </Link>

            <Link
              href="/wishlist"
              className="rounded-full p-2.5 text-white hover:bg-white/10"
              aria-label="Wishlist"
            >
              <Heart className="h-[22px] w-[22px]" strokeWidth={1.5} />
            </Link>

            <Link
              href="/checkout"
              className="rounded-full p-2.5 text-white hover:bg-white/10"
              aria-label="Cart"
            >
              <ShoppingBag className="h-[22px] w-[22px]" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* Mobile search expand */}
        {mobileSearchOpen && (
          <form
            onSubmit={submitSearch}
            className="border-t border-white/[0.07] px-3 pb-3 lg:hidden"
          >
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35"
                strokeWidth={1.75}
              />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search products…"
                autoFocus
                className="w-full rounded-full border border-white/15 bg-white/[0.06] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/35 focus:border-[#b91c1c]/45 focus:outline-none focus:ring-1 focus:ring-[#b91c1c]/25"
              />
            </div>
          </form>
        )}
      </div>
      </div>

      {/* Mobile drawer — outside the sliding block so it stays full-screen */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[160] lg:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 flex h-full w-[min(88vw,320px)] flex-col border-r border-white/10 bg-[#0a0a0a] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
              <span className="font-display text-lg font-semibold uppercase tracking-wide text-white">
                Menu
              </span>
              <button
                type="button"
                className="rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white"
                aria-label="Close"
                onClick={() => setMobileOpen(false)}
              >
                <X className="h-6 w-6" strokeWidth={1.5} />
              </button>
            </div>
            <nav className="flex flex-1 flex-col gap-1 px-3 py-4" aria-label="Mobile">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white/80 transition hover:bg-white/5 hover:text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/account"
                className="mt-4 flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white/80 hover:bg-white/5"
                onClick={() => setMobileOpen(false)}
              >
                <User className="h-5 w-5" strokeWidth={1.5} />
                Sign in
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

export function RetailHeader() {
  return (
    <Suspense fallback={<RetailHeaderFallback />}>
      <RetailHeaderInner />
    </Suspense>
  );
}
