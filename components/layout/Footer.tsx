import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black">
      {/* Big brand first */}
      <div className="px-5 pb-10 pt-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1600px]">
          <p className="font-display text-[clamp(2.75rem,14vw,8.5rem)] font-bold leading-[0.9] tracking-tight text-white">
            PAPRISH
          </p>
        </div>
      </div>

      {/* Privacy / terms / location — directly under the wordmark */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-8 lg:px-12">
          <nav
            className="flex flex-wrap items-center gap-x-8 gap-y-3 text-[11px] font-medium uppercase tracking-[0.28em] text-neutral-400"
            aria-label="Footer"
          >
            <Link href="#" className="transition-colors hover:text-neutral-200">
              Privacy
            </Link>
            <Link href="#" className="transition-colors hover:text-neutral-200">
              Terms
            </Link>
            <a
              href="https://wa.me/919000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-neutral-200"
            >
              WhatsApp
            </a>
            <a
              href="mailto:hello@paprish.com"
              className="transition-colors hover:text-neutral-200"
            >
              Contact
            </a>
          </nav>

          <p className="text-[11px] leading-relaxed text-neutral-500 sm:max-w-[min(100%,22rem)] sm:text-right">
            Tamil Nadu, India · © {year} Paprish Foods
          </p>
        </div>
      </div>
    </footer>
  );
}
