import type { CategoryInfo, CategorySlug } from "./types";

// Single source of truth for site identity, nav, and category metadata.
// The `url` is the production canonical origin. Keep it bare (no trailing
// slash) — every consumer concatenates `${site.url}/path`.

export const site = {
  name: "Style Signal",
  tagline: "The trends worth knowing.",
  description:
    "US-focused fashion trend intelligence — runway trends, celebrity fashion, affordable interpretations, and seasonal trend reports.",
  url: "https://stylesignal.dpdns.org",
  twitter: "@stylesignal",
  editorEmail: "editor@stylesignal.com",
  language: "en-US",
};

export const categories: Record<CategorySlug, CategoryInfo> = {
  trends: {
    slug: "trends",
    name: "Trends",
    description:
      "Runway trends, color forecasts, silhouette shifts, and the direction the season is heading.",
  },
  celebrity: {
    slug: "celebrity",
    name: "Celebrity",
    description:
      "Street style and red-carpet fashion decoded — what stars are actually wearing and how to get the look.",
  },
  affordable: {
    slug: "affordable",
    name: "Affordable",
    description:
      "Runway and celebrity looks translated into wearable, under-$100 finds.",
  },
  seasonal: {
    slug: "seasonal",
    name: "Seasonal",
    description:
      "Quarterly trend reports for spring, summer, fall, and winter — what to buy and what to skip.",
  },
};

export const categoryList: CategoryInfo[] = [
  categories.trends,
  categories.celebrity,
  categories.affordable,
  categories.seasonal,
];

export function isCategorySlug(value: string): value is CategorySlug {
  return value in categories;
}

export function getCategory(slug: CategorySlug): CategoryInfo {
  return categories[slug];
}
