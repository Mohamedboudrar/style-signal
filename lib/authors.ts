import { promises as fs } from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import type { Author, AuthorFrontmatter, Post } from "./types";
import { getAllPosts } from "./posts";

const AUTHORS_DIR = path.join(process.cwd(), "content", "authors");

async function listAuthorFiles(): Promise<string[]> {
  try {
    const entries = await fs.readdir(AUTHORS_DIR, { withFileTypes: true });
    return entries
      .filter(
        (entry) =>
          entry.isFile() &&
          /\.mdx?$/.test(entry.name) &&
          // Skip template/draft files (anything starting with "_" or ".").
          !entry.name.startsWith("_") &&
          !entry.name.startsWith(".")
      )
      .map((entry) => path.join(AUTHORS_DIR, entry.name));
  } catch {
    return [];
  }
}

function parseAuthorFile(filePath: string, fileContents: string): Author | null {
  const parsed = matter(fileContents);
  const data = parsed.data as Partial<AuthorFrontmatter>;

  const required: (keyof AuthorFrontmatter)[] = ["name", "slug", "role", "bio"];
  for (const field of required) {
    if (!data[field]) {
      console.warn(
        `[lib/authors] Skipping ${filePath}: missing required frontmatter field "${field}"`
      );
      return null;
    }
  }

  return {
    ...(data as AuthorFrontmatter),
    posts: [], // populated by getAuthor() / getAllAuthors()
  };
}

export async function getAllAuthors(): Promise<Author[]> {
  const files = await listAuthorFiles();
  const authors: Author[] = [];
  for (const file of files) {
    const contents = await fs.readFile(file, "utf8");
    const author = parseAuthorFile(file, contents);
    if (author) authors.push(author);
  }

  // Attach posts to each author.
  const allPosts = await getAllPosts();
  const byAuthor = new Map<string, Post[]>();
  for (const post of allPosts) {
    const list = byAuthor.get(post.author) ?? [];
    list.push(post);
    byAuthor.set(post.author, list);
  }
  for (const author of authors) {
    author.posts = byAuthor.get(author.slug) ?? [];
  }

  return authors;
}

export async function getAuthor(slug: string): Promise<Author | null> {
  const all = await getAllAuthors();
  return all.find((a) => a.slug === slug) ?? null;
}
