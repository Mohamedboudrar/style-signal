import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { ArticleHeader } from "@/components/ArticleHeader";
import { Prose } from "@/components/Prose";
import { getPostBySlug, getAllSlugs } from "@/lib/posts";
import { getAuthor } from "@/lib/authors";
import { getCategory, isCategorySlug, site } from "@/lib/site";
import { renderMdx } from "@/lib/mdx";
import type { CategorySlug } from "@/lib/types";

interface PageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((s) => ({ category: s.category, slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  if (!isCategorySlug(category)) return { title: "Not found" };
  const post = await getPostBySlug(category, slug);
  if (!post) return { title: "Not found" };

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: post.canonical ?? `${site.url}/${post.category}/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: post.canonical ?? `${site.url}/${post.category}/${post.slug}`,
      images: post.coverImage && !post.coverImage.startsWith("[")
        ? [{ url: post.coverImage }]
        : undefined,
      publishedTime: post.date,
      modifiedTime: post.lastUpdated ?? post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.coverImage && !post.coverImage.startsWith("[")
        ? [post.coverImage]
        : undefined,
    },
  };
}

function buildJsonLd(post: Awaited<ReturnType<typeof getPostBySlug>>, authorName?: string) {
  if (!post) return null;
  const url = post.canonical ?? `${site.url}/${post.category}/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        "headline": post.title,
        "description": post.description,
        "datePublished": post.date,
        "dateModified": post.lastUpdated ?? post.date,
        "author": {
          "@type": "Person",
          "name": authorName ?? post.author,
        },
        "publisher": {
          "@type": "Organization",
          "name": site.name,
          "url": site.url,
        },
        "mainEntityOfPage": { "@type": "WebPage", "@id": url },
        "image": post.coverImage && !post.coverImage.startsWith("[")
          ? post.coverImage
          : undefined,
        "keywords": post.keywords,
        "articleSection": getCategory(post.category).name,
        "wordCount": post.content.split(/\s+/).filter(Boolean).length,
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": site.url },
          { "@type": "ListItem", "position": 2, "name": getCategory(post.category).name, "item": `${site.url}/${post.category}` },
          { "@type": "ListItem", "position": 3, "name": post.title, "item": url },
        ],
      },
    ],
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { category: rawCategory, slug } = await params;
  if (!isCategorySlug(rawCategory)) notFound();
  const category: CategorySlug = rawCategory;
  const post = await getPostBySlug(category, slug);
  if (!post) notFound();

  const author = await getAuthor(post.author);
  const authorName = author?.name;
  const html = await renderMdx(post.content);
  const jsonLd = buildJsonLd(post, authorName);

  return (
    <>
      {/* JSON-LD structured data. Placeholders in canonical/author will fail
          Google Rich Results Test until site URL and author profiles are
          finalized — see memory/style-signal-publication.md. */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <Container as="article" className="pb-20">
        <ArticleHeader post={post} authorName={authorName} />

        {post.coverImage && !post.coverImage.startsWith("[") && (
          <figure className="mx-auto max-w-[56rem] mb-14 md:mb-20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.coverImage}
              alt={post.coverImageAlt ?? post.title}
              className="w-full h-auto rounded-md"
              loading="eager"
            />
          </figure>
        )}

        <Prose>
          <div
            className="article-prose-body"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </Prose>

        <footer className="mx-auto max-w-prose mt-20 pt-10 border-t border-ink-200/70">
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-ink-500"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
          {author && (
            <div className="pt-2">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-ink-400">
                About the author
              </p>
              <p className="mt-3 font-serif text-2xl font-medium text-ink-900">
                <Link
                  href={`/authors/${author.slug}`}
                  className="hover:text-signal-500 transition-colors"
                >
                  {author.name}
                </Link>
              </p>
              <p className="mt-3 text-base text-ink-600 leading-relaxed max-w-prose">
                {author.bio}
              </p>
            </div>
          )}
        </footer>
      </Container>
    </>
  );
}
