import type { Metadata } from "next";

import { CategoryPage } from "../_components/CategoryPage";
import { categories } from "@/lib/site";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  path: "/trends",
  title: "Trends",
  description: categories.trends.description,
});

export default function TrendsPage() {
  return <CategoryPage category="trends" />;
}
