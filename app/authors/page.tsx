import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/Container";
import { getAllAuthors } from "@/lib/authors";
import { site } from "@/lib/site";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  path: "/authors",
  title: "Authors",
  description: `The writers and editors behind ${site.name}.`,
});

export default async function AuthorsIndex() {
  const authors = await getAllAuthors();

  return (
    <Container as="section" className="py-12 md:py-16">
      <header className="mb-10">
        <p className="text-sm uppercase tracking-[0.2em] text-signal-500 font-semibold">
          Team
        </p>
        <h1 className="mt-2 text-4xl md:text-5xl font-serif font-semibold text-ink-900">
          Authors
        </h1>
        <p className="mt-3 text-lg text-ink-600 max-w-2xl">
          The writers and editors behind Style Signal.
        </p>
      </header>

      {authors.length > 0 ? (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {authors.map((author) => (
            <li
              key={author.slug}
              className="rounded-lg border border-ink-100 bg-white p-6"
            >
              <h2 className="text-lg font-serif font-semibold text-ink-900">
                <Link
                  href={`/authors/${author.slug}`}
                  className="hover:text-signal-500"
                >
                  {author.name}
                </Link>
              </h2>
              <p className="mt-1 text-sm uppercase tracking-wider text-signal-500 font-semibold">
                {author.role}
              </p>
              <p className="mt-3 text-sm text-ink-600 line-clamp-3">
                {author.bio}
              </p>
              <p className="mt-4 text-xs text-ink-400">
                {author.posts.length}{" "}
                {author.posts.length === 1 ? "article" : "articles"}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-lg border border-dashed border-ink-200 bg-white p-10 text-center text-ink-400">
          <p>
            No author profiles yet. Add MDX files under{" "}
            <code>content/authors/</code>.
          </p>
        </div>
      )}
    </Container>
  );
}
