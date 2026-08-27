import Link from "next/link";
import type { Post } from "@/lib/types";

interface PostMetaProps {
  post: Post;
  authorName?: string; // resolved by caller from lib/authors.ts
  showCategory?: boolean;
}

export function PostMeta({ post, authorName, showCategory = true }: PostMetaProps) {
  const date = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="text-sm text-ink-400 flex flex-wrap items-center gap-x-3 gap-y-1">
      {showCategory && (
        <>
          <Link
            href={`/${post.category}`}
            className="uppercase tracking-wider font-semibold text-signal-500 hover:text-signal-600"
          >
            {post.category}
          </Link>
          <span aria-hidden>·</span>
        </>
      )}
      <time dateTime={post.date}>{date}</time>
      <span aria-hidden>·</span>
      <span>{post.readingTime} min read</span>
      {authorName && (
        <>
          <span aria-hidden>·</span>
          <span>
            By{" "}
            <Link
              href={`/authors/${post.author}`}
              className="text-ink-600 hover:text-signal-500"
            >
              {authorName}
            </Link>
          </span>
        </>
      )}
    </div>
  );
}
