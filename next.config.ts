import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // domains: ["https://www.amazon.in/"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      {
        protocol: "https",
        hostname: "www.amazon.in",
      },
      {
        protocol: "https",
        hostname: "freelogopng.com",
      },
    ],
  },
};

export default nextConfig;
