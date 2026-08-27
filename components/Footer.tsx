import Link from "next/link";
import { Container } from "./Container";
import { site, categoryList } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-ink-200/70 bg-ink-50">
      <Container className="py-14 grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-serif text-2xl font-medium tracking-editorial text-ink-900">
            {site.name}
          </p>
          <p className="mt-2 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-ink-400">
            {site.tagline}
          </p>
          <p className="mt-4 text-sm text-ink-600 max-w-sm leading-relaxed">
            {site.description}
          </p>
        </div>

        <div>
          <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-ink-400">
            Sections
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {categoryList.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/${cat.slug}`}
                  className="text-ink-700 hover:text-signal-500 transition-colors"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-ink-400">
            About
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/about" className="text-ink-700 hover:text-signal-500 transition-colors">
                About Style Signal
              </Link>
            </li>
            <li>
              <Link href="/authors" className="text-ink-700 hover:text-signal-500 transition-colors">
                Authors
              </Link>
            </li>
            <li>
              {/* TODO: wire to a real contact page when the team inbox is set up. */}
              <a
                href={`mailto:${site.editorEmail}`}
                className="text-ink-700 hover:text-signal-500 transition-colors"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </Container>
      <Container className="py-6 border-t border-ink-200/70 flex flex-col sm:flex-row justify-between gap-2 text-xs text-ink-400">
        <p>© {year} {site.name}. All rights reserved.</p>
        <p>Built with Next.js, TypeScript, Tailwind CSS, and MDX.</p>
      </Container>
    </footer>
  );
}
