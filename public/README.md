# Placeholder for static assets.

When the production cover image and other assets are ready, drop them here:

- `images/fall-2026-cover.jpg` — hero image for the fall 2026 article (1200x630)
- `images/authors/<slug>.jpg` — author avatars (square, 400x400 recommended)
- Any future inline article images

Until then, MDX files reference `[Replace with ...]` placeholders in their
frontmatter. Article pages detect placeholder strings and skip rendering
the image element so the site builds without errors.
