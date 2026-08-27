import Link from "next/link";
import { Container } from "@/components/Container";
import { ArticleCard } from "@/components/ArticleCard";
import { getRecentPosts } from "@/lib/posts";
import { getAllAuthors } from "@/lib/authors";
import { site, categoryList } from "@/lib/site";

export default async function HomePage() {
  const [recent, authors] = await Promise.all([
    getRecentPosts(6),
    getAllAuthors(),
  ]);
  const authorBySlug = new Map(authors.map((a) => [a.slug, a.name]));

  const [featured, ...rest] = recent;

  return (
    <>
      {/* Hero */}
      <section className="border-b border-ink-100">
        <Container className="py-16 md:py-24 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-signal-500 font-semibold">
            {site.name}
          </p>
          <h1 className="mt-4 text-5xl md:text-7xl font-serif font-semibold tracking-tight text-ink-900">
            {site.tagline}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-ink-600 max-w-2xl mx-auto">
            {site.description}
          </p>
        </Container>
      </section>

      {/* Featured + recent */}
      {recent.length > 0 ? (
        <Container as="section" className="py-12 md:py-16">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="text-2xl font-serif font-semibold text-ink-900">
              Latest
            </h2>
            <Link
              href="/seasonal"
              className="text-sm text-signal-500 hover:text-signal-600"
            >
              See all →
            </Link>
          </div>
          <div className="grid gap-10 md:grid-cols-2">
            {featured && (
              <ArticleCard
                post={featured}
                authorName={authorBySlug.get(featured.author)}
                featured
              />
            )}
            {rest.map((post) => (
              <ArticleCard
                key={`${post.category}-${post.slug}`}
                post={post}
                authorName={authorBySlug.get(post.author)}
              />
            ))}
          </div>
        </Container>
      ) : (
        <Container as="section" className="py-16 text-center text-ink-400">
          <p>No articles yet. Add MDX files under <code>content/</code>.</p>
        </Container>
      )}

      {/* Category grid */}
      <section className="border-t border-ink-100 bg-ink-100/30">
        <Container className="py-12 md:py-16">
          <h2 className="text-2xl font-serif font-semibold text-ink-900 mb-8">
            Browse by section
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categoryList.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="block rounded-lg border border-ink-100 bg-white p-6 hover:border-signal-500 transition-colors"
              >
                <h3 className="text-lg font-serif font-semibold text-ink-900">
                  {cat.name}
                </h3>
                <p className="mt-2 text-sm text-ink-600">{cat.description}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
