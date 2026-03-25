import Link from "next/link";

const social = [
  { name: "Instagram", href: "#" },
  { name: "Facebook", href: "#" },
  { name: "LinkedIn", href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-stone-200/80 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="font-display text-2xl font-semibold text-stone-900">
              Paprish
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-stone-600">
              Pure spices from Tamil Nadu — crafted for homes and kitchens
              worldwide. Authentic taste, transparent sourcing.
            </p>
            <p className="mt-6 flex items-start gap-2 text-sm text-stone-600">
              <span className="mt-0.5 text-[#b91c1c]" aria-hidden>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 21s-6-4.35-6-10a6 6 0 1112 0c0 5.65-6 10-6 10z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <circle cx="12" cy="11" r="2.5" fill="currentColor" />
                </svg>
              </span>
              Based in Tamil Nadu, India
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Connect
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href="https://wa.me/919000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-700 transition hover:text-[#b91c1c]"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@paprish.com"
                  className="text-stone-700 transition hover:text-[#b91c1c]"
                >
                  hello@paprish.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Social
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              {social.map((s) => (
                <li key={s.name}>
                  <Link
                    href={s.href}
                    className="text-stone-700 transition hover:text-[#b91c1c]"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-stone-200/80 pt-8 text-xs text-stone-500 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Paprish Foods. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-stone-800">
              Privacy
            </Link>
            <Link href="#" className="hover:text-stone-800">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
