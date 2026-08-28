"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "./Container";
import { site, categoryList } from "@/lib/site";

// Publication header. Wordmark in Fraunces, tagline in a thin tracked
// uppercase beside it. The nav is intentionally minimal: section names in
// a small-medium sans, no buttons, no search.
//
// On mobile the horizontal nav collapses behind a hamburger button. The
// tagline (which is the brand's editorial signature) is shown next to the
// wordmark on every screen so the publication's identity is intact
// regardless of breakpoint.
export function Header() {
  const [open, setOpen] = useState(false);

  // Close the menu if the viewport grows past the mobile breakpoint
  // (e.g. after a device rotation) so we don't leave an open panel that
  // is no longer visible.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 640px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Lock body scroll while the mobile menu is open so the panel doesn't
  // sit on top of a moving page.
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  const navItems: { href: string; label: string }[] = [
    ...categoryList.map((c) => ({ href: `/${c.slug}`, label: c.name })),
    { href: "/about", label: "About" },
  ];

  return (
    <header className="border-b border-ink-200/70 bg-ink-50/95 backdrop-blur sticky top-0 z-40">
      <Container className="py-4 sm:py-5 flex items-center justify-between gap-3 sm:gap-6">
        <Link
          href="/"
          className="flex items-baseline gap-2 sm:gap-3 group min-w-0"
          onClick={() => setOpen(false)}
        >
          <span className="font-serif text-xl sm:text-2xl font-medium tracking-editorial text-ink-900 group-hover:text-signal-500 transition-colors whitespace-nowrap">
            {site.name}
          </span>
          {/* Tagline: always visible (header brand identity). On mobile it
              sits smaller and may wrap to a second line if space is tight;
              the parent uses min-w-0 + flex so the wordmark keeps priority. */}
          <span className="text-[0.6rem] sm:text-[0.7rem] font-medium uppercase tracking-[0.18em] sm:tracking-[0.22em] text-ink-400 leading-tight break-words min-w-0">
            {site.tagline}
          </span>
        </Link>

        {/* Desktop nav — hidden on mobile, takes over at sm+ */}
        <nav aria-label="Primary" className="hidden sm:block">
          <ul className="flex items-center gap-6 text-sm font-medium text-ink-600">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="hover:text-signal-500 transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Hamburger button — mobile only */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="sm:hidden inline-flex items-center justify-center w-10 h-10 -mr-2 rounded-md text-ink-700 hover:text-signal-500 hover:bg-ink-100/60 active:bg-ink-100 transition-colors"
        >
          <span className="sr-only">
            {open ? "Close menu" : "Open menu"}
          </span>
          {open ? (
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </Container>

      {/* Mobile nav panel — slides down under the header. Rendered always
          so we can animate it; hidden with `hidden` class when closed. */}
      <div
        id="mobile-nav"
        className={`sm:hidden border-t border-ink-200/70 bg-ink-50 ${
          open ? "block" : "hidden"
        }`}
      >
        <Container className="py-2">
          <nav aria-label="Primary mobile">
            <ul className="flex flex-col py-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-base font-medium text-ink-700 hover:text-signal-500 active:text-signal-600 transition-colors border-b border-ink-100 last:border-b-0"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </div>
    </header>
  );
}
