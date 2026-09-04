import type { Metadata } from "next";

import { CategoryPage } from "../_components/CategoryPage";
import { categories } from "@/lib/site";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  path: "/seasonal",
  title: "Seasonal trend reports",
  description: categories.seasonal.description,
});

export default function SeasonalPage() {
  return <CategoryPage category="seasonal" />;
}
