import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/Container";
import { ArticleCard } from "@/components/ArticleCard";
import { getAuthor } from "@/lib/authors";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = await getAuthor(slug);
  if (!author) return { title: "Author not found" };
  return {
    title: author.name,
    description: author.bio,
  };
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = await getAuthor(slug);
  if (!author) notFound();

  return (
    <Container as="section" className="py-12 md:py-16">
      <header className="mb-10">
        <p className="text-sm uppercase tracking-[0.2em] text-signal-500 font-semibold">
          {author.role}
        </p>
        <h1 className="mt-2 text-4xl md:text-5xl font-serif font-semibold text-ink-900">
          {author.name}
        </h1>
        <p className="mt-3 text-lg text-ink-600 max-w-2xl">{author.bio}</p>
        <div className="mt-4 flex gap-4 text-sm text-signal-500">
          {author.twitter && (
            <a
              href={author.twitter}
              className="hover:text-signal-600"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          )}
          {author.linkedin && (
            <a
              href={author.linkedin}
              className="hover:text-signal-600"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          )}
          {author.website && (
            <a
              href={author.website}
              className="hover:text-signal-600"
              rel="noopener noreferrer"
            >
              Website
            </a>
          )}
        </div>
      </header>

      {author.posts.length > 0 ? (
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {author.posts.map((post) => (
            <ArticleCard
              key={`${post.category}-${post.slug}`}
              post={post}
              authorName={author.name}
            />
          ))}
        </div>
      ) : (
        <p className="text-ink-400">No articles yet from this author.</p>
      )}

      <p className="mt-12">
        <Link href="/authors" className="text-signal-500 hover:text-signal-600">
          ← All authors
        </Link>
      </p>
    </Container>
  );
}
