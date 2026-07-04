import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";
const uploadsOrigin = apiUrl.replace(/\/api\/?$/, "");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "3001",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: `${uploadsOrigin}/uploads/:path*`,
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);
