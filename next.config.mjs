import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Add image provider domains here as needed (e.g. cdn.pixabay.com, images.unsplash.com).
    remotePatterns: [],
  },
};

// Initializes the Cloudflare adapter when running `next dev` locally so
// the dev server matches the Cloudflare runtime (Node compat layer,
// assets binding, etc.). The `initOpenNextCloudflareForDev` call is a
// no-op outside of dev mode.
initOpenNextCloudflareForDev();

export default nextConfig;
