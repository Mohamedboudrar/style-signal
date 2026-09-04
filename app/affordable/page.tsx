import type { Metadata } from "next";

import { CategoryPage } from "../_components/CategoryPage";
import { categories } from "@/lib/site";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  path: "/affordable",
  title: "Affordable fashion",
  description: categories.affordable.description,
});

export default function AffordablePage() {
  return <CategoryPage category="affordable" />;
}
