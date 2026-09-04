import type { Metadata } from "next";

import { CategoryPage } from "../_components/CategoryPage";
import { categories } from "@/lib/site";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  path: "/celebrity",
  title: "Celebrity style",
  description: categories.celebrity.description,
});

export default function CelebrityPage() {
  return <CategoryPage category="celebrity" />;
}
