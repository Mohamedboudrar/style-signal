import { notFound } from "next/navigation";

import { Container } from "@/components/Container";
import { ArticleCard } from "@/components/ArticleCard";
import { getPostsByCategory } from "@/lib/posts";
import { getAllAuthors } from "@/lib/authors";
import { categories, isCategorySlug } from "@/lib/site";
import { buildCategoryJsonLd } from "@/lib/jsonld";
import type { CategorySlug } from "@/lib/types";

interface CategoryPageProps {
  category: string;
}

export async function CategoryPage({ category }: CategoryPageProps) {
  if (!isCategorySlug(category)) notFound();
  const slug: CategorySlug = category;

  const [posts, authors] = await Promise.all([
    getPostsByCategory(slug),
    getAllAuthors(),
  ]);
  const authorBySlug = new Map(authors.map((a) => [a.slug, a.name]));
  const info = categories[slug];
  const jsonLd = buildCategoryJsonLd(info, posts);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    <Container as="section" className="py-12 md:py-16">
      <header className="mb-10">
        <p className="text-sm uppercase tracking-[0.2em] text-signal-500 font-semibold">
          Section
        </p>
        <h1 className="mt-2 text-4xl md:text-5xl font-serif font-semibold text-ink-900">
          {info.name}
        </h1>
        <p className="mt-3 text-lg text-ink-600 max-w-2xl">{info.description}</p>
      </header>

      {posts.length > 0 ? (
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <ArticleCard
              key={`${post.category}-${post.slug}`}
              post={post}
              authorName={authorBySlug.get(post.author)}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-ink-200 bg-white p-10 text-center text-ink-400">
          <p className="text-base">
            No articles in this section yet.
          </p>
          <p className="mt-2 text-sm">
            Add MDX files under <code>content/{slug}/</code> to populate it.
          </p>
        </div>
      )}
    </Container>
    </>
  );
}
