// Minimal MDX-to-HTML renderer for our article pages.
//
// We use a server-side pipeline (remark + remark-gfm + remark-html) rather
// than @next/mdx because we need to render arbitrary MDX stored under
// content/ without forcing every author to use a build-time compilation
// step. For richer interactive components later, switch to @next/mdx with
// mdx-components.tsx.

import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

export async function renderMdx(source: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(source);

  return String(result);
}
