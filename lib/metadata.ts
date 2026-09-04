import type { Metadata } from "next";
import { site } from "./site";

// Build a fully-formed Next.js Metadata object for a page, with the
// publication-wide defaults already applied (title template, OG type, etc.)
// and `alternates.canonical` set to the absolute URL on the production domain.
//
// `path` is the URL path on the site, e.g. "/about" or "/trends". It is
// resolved against `site.url` to produce an absolute canonical. Pass
// `overrideTitle` to bypass the default `${site.name} — ${site.tagline}`
// for the homepage-equivalent routes; otherwise the template is applied.
export function buildPageMetadata({
  path,
  title,
  description,
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  tags,
}: {
  path: string;
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
}): Metadata {
  const canonical = new URL(path, site.url).toString();

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type,
      title,
      description,
      url: canonical,
      siteName: site.name,
      locale: site.language,
      images: image ? [{ url: image }] : undefined,
      publishedTime,
      modifiedTime,
      authors,
      tags,
    },
    twitter: {
      card: "summary_large_image",
      site: site.twitter,
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}
