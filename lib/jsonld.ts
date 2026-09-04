import { site } from "./site";

// Site-wide Organization. Used on the homepage and as the publisher on
// every article. The `logo` URL points at the favicon asset; replace with
// a dedicated 112x112 PNG when one is available.
export const organizationJsonLd = {
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  logo: {
    "@type": "ImageObject",
    url: `${site.url}/favicon.jpeg`,
  },
  sameAs: [],
};

export const websiteJsonLd = {
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: site.name,
  description: site.description,
  inLanguage: site.language,
  publisher: { "@id": `${site.url}/#organization` },
};

// Build the homepage @graph: WebPage + WebSite + Organization.
export function buildHomeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${site.url}/#webpage`,
        url: site.url,
        name: `${site.name} — ${site.tagline}`,
        description: site.description,
        inLanguage: site.language,
        isPartOf: { "@id": `${site.url}/#website` },
        about: { "@id": `${site.url}/#organization` },
      },
      websiteJsonLd,
      organizationJsonLd,
    ],
  };
}

// Build a category-hub @graph: CollectionPage + ItemList of posts + BreadcrumbList.
import type { Post, CategoryInfo } from "./types";

export function buildCategoryJsonLd(category: CategoryInfo, posts: Post[]) {
  const url = `${site.url}/${category.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#collection`,
        url,
        name: `${category.name} — ${site.name}`,
        description: category.description,
        inLanguage: site.language,
        isPartOf: { "@id": `${site.url}/#website` },
        about: { "@id": `${site.url}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          {
            "@type": "ListItem",
            position: 2,
            name: category.name,
            item: url,
          },
        ],
      },
      {
        "@type": "ItemList",
        itemListElement: posts.map((post, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          url: `${site.url}/${post.category}/${post.slug}`,
          name: post.title,
        })),
      },
    ],
  };
}

// Build an author Person reference for use inside an article's BlogPosting
// `author` slot. Anchors the Person @id to the public author page so Google
// can reconcile E-E-A-T signals across articles.
export function buildAuthorJsonLd(authorSlug: string, authorName: string) {
  return {
    "@type": "Person",
    "@id": `${site.url}/authors/${authorSlug}#person`,
    name: authorName,
    url: `${site.url}/authors/${authorSlug}`,
  };
}
