// Shared content types for Style Signal.
//
// Frontmatter fields are the source of truth — these interfaces describe what
// each MDX file's frontmatter is expected to provide.

export type CategorySlug = "trends" | "celebrity" | "affordable" | "seasonal";

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;            // YYYY-MM-DD
  lastUpdated?: string;    // YYYY-MM-DD
  author: string;          // author slug, matches content/authors/<slug>.mdx
  category: CategorySlug;
  tags?: string[];
  keywords?: string;
  coverImage?: string;     // absolute or root-relative URL
  coverImageAlt?: string;
  canonical?: string;      // absolute URL
  slug: string;
}

export interface Post extends PostFrontmatter {
  content: string;         // raw MDX body (after frontmatter)
  readingTime: number;     // minutes
  filePath: string;        // absolute path on disk
}

export interface AuthorFrontmatter {
  name: string;
  slug: string;
  role: string;            // e.g. "Editor", "Senior Writer"
  bio: string;
  twitter?: string;
  linkedin?: string;
  website?: string;
  avatar?: string;
}

export interface Author extends AuthorFrontmatter {
  posts: Post[];           // populated by getAuthor() in lib/authors.ts
}

export interface CategoryInfo {
  slug: CategorySlug;
  name: string;            // human-readable, e.g. "Seasonal"
  description: string;     // one-line description
}
