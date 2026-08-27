# Style Signal

**The trends worth knowing.**

US-focused fashion trend intelligence. Runway trends, celebrity fashion, affordable interpretations, and seasonal trend reports.

## Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** for styling
- **MDX** for content
- **gray-matter** for frontmatter parsing
- **remark** + **remark-gfm** for Markdown rendering
- **reading-time** for estimated read time

## Project structure

```
style-signal/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout (header + footer)
│   ├── page.tsx            # Homepage
│   ├── globals.css
│   ├── trends/page.tsx
│   ├── celebrity/page.tsx
│   ├── affordable/page.tsx
│   ├── seasonal/page.tsx
│   ├── about/page.tsx
│   ├── authors/page.tsx
│   └── [category]/[slug]/page.tsx  # Article template
├── components/             # Shared React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Container.tsx
│   ├── ArticleCard.tsx
│   ├── ArticleHeader.tsx
│   ├── KeyTakeaways.tsx
│   ├── PostMeta.tsx
│   └── Prose.tsx
├── content/                # MDX content
│   ├── trends/             # Runway trends
│   ├── celebrity/          # Celebrity fashion
│   ├── affordable/         # Affordable interpretations
│   ├── seasonal/           # Seasonal trend reports
│   └── authors/            # Author profile MDX
├── lib/                    # Shared utilities
│   ├── posts.ts            # Read & parse MDX
│   ├── authors.ts          # Read author profiles
│   ├── types.ts            # Post, Author, Category types
│   └── site.ts             # Site config (name, tagline, nav)
├── public/                 # Static assets
├── package.json
├── tsconfig.json
├── next.config.mjs
├── tailwind.config.ts
└── postcss.config.js
```

## Content model

Each article is a single MDX file in `content/<category>/<slug>.mdx` with this frontmatter:

```yaml
---
title: "..."
description: "..."
date: 2026-08-27
lastUpdated: 2026-08-27
author: "[Author Slug]"           # matches content/authors/<slug>.mdx
category: "seasonal"              # one of: trends | celebrity | affordable | seasonal
tags: [tag-one, tag-two]
keywords: "comma, separated, keywords"
coverImage: "/images/cover.jpg"
coverImageAlt: "Descriptive alt text"
canonical: "https://example.com/seasonal/fall-2026-fashion-trends"
slug: "fall-2026-fashion-trends"
---
```

Each author is a single MDX file in `content/authors/<slug>.mdx` with frontmatter:

```yaml
---
name: "Author Name"
slug: "author-name"
role: "Editor"
bio: "Short factual bio."
twitter: "https://twitter.com/handle"   # optional
---
```

## Categories

| Path        | Pillar                          | Subcategories (add when content exists) |
|-------------|---------------------------------|------------------------------------------|
| `/trends`     | Runway trends                 | runway, colors, silhouettes, forecasts |
| `/celebrity`  | Celebrity fashion             | street-style, red-carpet |
| `/affordable` | Affordable interpretations    | under-50, under-100, designer-alternatives |
| `/seasonal`   | Seasonal trend reports        | spring, summer, fall, winter |

Subcategories are intentionally **not** scaffolded as routes until each has at least one real article. Add them as the content fills in.

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run typecheck    # TypeScript check
```

## Open placeholders

These are intentionally unfilled in the current draft (`content/seasonal/fall-2026-fashion-trends.mdx`):

- `[Author Name]` / `[Author Slug]` — author byline and author profile file
- `[your-site].com` — domain in canonical URL, JSON-LD `@id`, etc.
- `[Site Name]` — Organization name in schema
- Image URLs (hero + 2 inline)
- 4 internal link targets

Fill these in one pass after the first author profile and real cover image are added.
