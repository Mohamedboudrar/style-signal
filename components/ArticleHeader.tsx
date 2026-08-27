import Link from "next/link";
import type { Post } from "@/lib/types";
import { getCategory } from "@/lib/site";
import { PostMeta } from "./PostMeta";

interface ArticleHeaderProps {
  post: Post;
  authorName?: string;
}

// Editorial header. The hierarchy is:
//
//   category eyebrow
//   ──── (thin rule)
//   H1 (Fraunces, large, restrained weight, optical-size display)
//   dek / description
//   author + date + reading time
//   hero image (below)
//
// The hero is rendered here (not in the parent page) so the relationship
// between the title and the image feels intentional, not bolted-on.
export function ArticleHeader({ post, authorName }: ArticleHeaderProps) {
  const category = getCategory(post.category);
  return (
    <header className="pt-8 md:pt-12 pb-10 md:pb-14">
      <div className="max-w-prose mx-auto">
        <Link
          href={`/${post.category}`}
          className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-signal-500 hover:text-signal-600"
        >
          {category.name}
        </Link>
        <span aria-hidden className="block h-px w-10 bg-signal-500 mt-4 mb-6" />

        <h1 className="font-serif text-[2.25rem] md:text-[3rem] lg:text-[3.25rem] leading-[1.05] tracking-editorial font-medium text-ink-900">
          {post.title}
        </h1>

        {post.description && (
          <p className="mt-6 text-lg md:text-xl text-ink-600 leading-relaxed max-w-[36rem]">
            {post.description}
          </p>
        )}

        <div className="mt-8 text-sm text-ink-500">
          <PostMeta post={post} authorName={authorName} showCategory={false} />
        </div>
      </div>
    </header>
  );
}
