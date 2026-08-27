import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

import type { CategorySlug, Post, PostFrontmatter } from "./types";
import { categories, isCategorySlug } from "./site";

const CONTENT_ROOT = path.join(process.cwd(), "content");

// Map category slug -> content/<category> directory.
function categoryDir(category: CategorySlug): string {
  return path.join(CONTENT_ROOT, category);
}

// All post files live at content/<category>/<slug>.mdx.
// Authors live at content/authors/<slug>.mdx (handled by lib/authors.ts).
async function listMdxFiles(dir: string): Promise<string[]> {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile() && /\.mdx?$/.test(entry.name))
      .map((entry) => path.join(dir, entry.name));
  } catch {
    // Directory doesn't exist yet — return empty list. This lets the site
    // build with empty categories during early development.
    return [];
  }
}

function parsePostFile(filePath: string, fileContents: string): Post | null {
  const parsed = matter(fileContents);
  const data = parsed.data as Partial<PostFrontmatter>;

  // Required frontmatter guard. Posts missing required fields are skipped
  // rather than failing the whole build.
  const required: (keyof PostFrontmatter)[] = [
    "title",
    "description",
    "date",
    "author",
    "category",
    "slug",
  ];
  for (const field of required) {
    if (!data[field]) {
      console.warn(
        `[lib/posts] Skipping ${filePath}: missing required frontmatter field "${field}"`
      );
      return null;
    }
  }

  if (!isCategorySlug(data.category!)) {
    console.warn(
      `[lib/posts] Skipping ${filePath}: category "${data.category}" is not a valid CategorySlug`
    );
    return null;
  }

  const { content, readingTimeMinutes } = computeReadTime(parsed.content);

  return {
    ...(data as PostFrontmatter),
    content,
    readingTime: readingTimeMinutes,
    filePath,
  };
}

function computeReadTime(rawContent: string): {
  content: string;
  readingTimeMinutes: number;
} {
  const result = readingTime(rawContent);
  return {
    content: rawContent,
    // Round up; never report less than 1 minute.
    readingTimeMinutes: Math.max(1, Math.round(result.minutes)),
  };
}

export async function getAllPosts(): Promise<Post[]> {
  const all: Post[] = [];
  const slugs = Object.keys(categories) as CategorySlug[];

  for (const slug of slugs) {
    const files = await listMdxFiles(categoryDir(slug));
    for (const file of files) {
      const contents = await fs.readFile(file, "utf8");
      const post = parsePostFile(file, contents);
      if (post) all.push(post);
    }
  }

  // Newest first.
  all.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  return all;
}

export async function getPostsByCategory(category: CategorySlug): Promise<Post[]> {
  const all = await getAllPosts();
  return all.filter((p) => p.category === category);
}

export async function getPostBySlug(
  category: CategorySlug,
  slug: string
): Promise<Post | null> {
  const filePath = path.join(categoryDir(category), `${slug}.mdx`);
  try {
    const contents = await fs.readFile(filePath, "utf8");
    return parsePostFile(filePath, contents);
  } catch {
    return null;
  }
}

export async function getAllSlugs(): Promise<
  { category: CategorySlug; slug: string }[]
> {
  const all = await getAllPosts();
  return all.map((p) => ({ category: p.category, slug: p.slug }));
}

export async function getRecentPosts(limit = 6): Promise<Post[]> {
  const all = await getAllPosts();
  return all.slice(0, limit);
}
