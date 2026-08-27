/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Add image provider domains here as needed (e.g. cdn.pixabay.com, images.unsplash.com).
    remotePatterns: [],
  },
};

export default nextConfig;
