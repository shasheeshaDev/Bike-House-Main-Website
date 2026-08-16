import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Sanity's CDN serves the originals; Next re-encodes to AVIF/WebP and
    // emits a responsive srcset.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

export default nextConfig;
