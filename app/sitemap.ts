import type { MetadataRoute } from "next";

import { site, categoryList } from "@/lib/site";
import { getAllPosts } from "@/lib/posts";
import { getAllAuthors } from "@/lib/authors";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, authors] = await Promise.all([getAllPosts(), getAllAuthors()]);

  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: `${site.url}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${site.url}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${site.url}/authors`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const categoryEntries: MetadataRoute.Sitemap = categoryList.map((cat) => ({
    url: `${site.url}/${cat.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Article entries use the real lastUpdated/date from frontmatter so
  // Google can use the timestamp as a freshness signal.
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${site.url}/${post.category}/${post.slug}`,
    lastModified: new Date(post.lastUpdated ?? post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const authorEntries: MetadataRoute.Sitemap = authors.map((author) => {
    // Use the most recent post date for the author's lastmod when available,
    // otherwise fall back to "now" so the entry still carries a timestamp.
    const latest = author.posts
      .map((p) => new Date(p.lastUpdated ?? p.date).getTime())
      .sort((a, b) => b - a)[0];
    return {
      url: `${site.url}/authors/${author.slug}`,
      lastModified: latest ? new Date(latest) : now,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    };
  });

  return [
    ...staticEntries,
    ...categoryEntries,
    ...postEntries,
    ...authorEntries,
  ];
}
