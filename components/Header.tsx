import Link from "next/link";
import { Container } from "./Container";
import { site, categoryList } from "@/lib/site";

// Publication header. Wordmark in Fraunces, tagline in a thin tracked
// uppercase beside it. The nav is intentionally minimal: section names in
// a small-medium sans, no buttons, no search.
export function Header() {
  return (
    <header className="border-b border-ink-200/70 bg-ink-50/95 backdrop-blur sticky top-0 z-40">
      <Container className="py-5 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-baseline gap-3 group">
          <span className="font-serif text-2xl font-medium tracking-editorial text-ink-900 group-hover:text-signal-500 transition-colors">
            {site.name}
          </span>
          <span className="hidden sm:inline text-[0.7rem] font-medium uppercase tracking-[0.22em] text-ink-400">
            {site.tagline}
          </span>
        </Link>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-6 text-sm font-medium text-ink-600">
            {categoryList.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/${cat.slug}`}
                  className="hover:text-signal-500 transition-colors"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/about"
                className="hover:text-signal-500 transition-colors"
              >
                About
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
