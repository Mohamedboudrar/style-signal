import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Local images in /public are served from the same origin and don't
    // need to be listed here. Add image provider domains here as needed
    // (e.g. cdn.pixabay.com, images.unsplash.com) when migrating MDX
    // <img> tags to next/image.
    remotePatterns: [],
    // AVIF first, then WebP as a fallback. Both are universally supported
    // by evergreen browsers and reduce JPEG payload by 25-35% for the
    // cover images on the home and category pages.
    formats: ["image/avif", "image/webp"],
  },
};

// Initializes the Cloudflare adapter when running `next dev` locally so
// the dev server matches the Cloudflare runtime (Node compat layer,
// assets binding, etc.). The `initOpenNextCloudflareForDev` call is a
// no-op outside of dev mode.
initOpenNextCloudflareForDev();

export default nextConfig;
