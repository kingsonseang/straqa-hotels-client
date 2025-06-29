import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    remotePatterns: ["http://localhost:3000", process.env.VERCEL_URL]
      .filter((url) => url !== undefined)
      .map((url) => {
        return new URL(`${url}/**`);
      }),
  },
};

export default nextConfig;
