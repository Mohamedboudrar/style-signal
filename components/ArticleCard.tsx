import Link from "next/link";
import type { Post } from "@/lib/types";
import { PostMeta } from "./PostMeta";

interface ArticleCardProps {
  post: Post;
  authorName?: string;
  featured?: boolean;
}

export function ArticleCard({ post, authorName, featured = false }: ArticleCardProps) {
  return (
    <article
      className={`group ${featured ? "md:col-span-2" : ""}`}
    >
      <Link
        href={`/${post.category}/${post.slug}`}
        className="block"
      >
        {post.coverImage && !post.coverImage.startsWith("[") && (
          <div
            className={`relative w-full overflow-hidden rounded-lg bg-ink-100 ${
              featured ? "aspect-[16/9]" : "aspect-[4/3]"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.coverImage}
              alt={post.coverImageAlt ?? post.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <div className="mt-4">
          <h2
            className={`font-serif font-semibold tracking-tight text-ink-900 group-hover:text-signal-500 transition-colors ${
              featured ? "text-3xl" : "text-xl"
            }`}
          >
            {post.title}
          </h2>
          {post.description && (
            <p className="mt-2 text-ink-600 line-clamp-3">{post.description}</p>
          )}
          <div className="mt-3">
            <PostMeta post={post} authorName={authorName} />
          </div>
        </div>
      </Link>
    </article>
  );
}
