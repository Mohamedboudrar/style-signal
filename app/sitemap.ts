import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://stylesignal.dpdns.org",
      lastModified: new Date(),
    },
    {
      url: "https://stylesignal.dpdns.org/seasonal",
      lastModified: new Date(),
    },
    {
      url: "https://stylesignal.dpdns.org/affordable",
      lastModified: new Date(),
    },
    {
      url: "https://stylesignal.dpdns.org/celebrity",
      lastModified: new Date(),
    },
    {
      url: "https://stylesignal.dpdns.org/trends",
      lastModified: new Date(),
    },
    {
      url: "https://stylesignal.dpdns.org/seasonal/fall-2026-fashion-trends",
      lastModified: new Date(),
    },
    {
      url: "https://stylesignal.dpdns.org/affordable/fall-2026-fashion-trends-under-100",
      lastModified: new Date(),
    },
    {
      url: "https://stylesignal.dpdns.org/trends/fall-2026-fashion-trends-youll-actually-see-everywhere",
      lastModified: new Date(),
    },
    {
      url: "https://stylesignal.dpdns.org/about",
      lastModified: new Date(),
    },
    {
      url: "https://stylesignal.dpdns.org/authors",
      lastModified: new Date(),
    },

  ];
}