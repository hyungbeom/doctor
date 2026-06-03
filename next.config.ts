import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "img.chutcha.kr", pathname: "/**" },
      { protocol: "https", hostname: "imgsc.chutcha.kr", pathname: "/**" },
      { protocol: "https", hostname: "img.chutcha.net", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
