import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
      },
      {
          protocol: "https",
          hostname: "**",
        },
    ]
  },
    async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://161.248.189.80:30012/:path*", // backend
      },
    ];
  },

};

export default nextConfig;
