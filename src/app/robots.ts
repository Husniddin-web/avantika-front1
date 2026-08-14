import type {MetadataRoute} from "next";

export default function robots(): MetadataRoute.Robots {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://avantikamedex.com";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/*/admin/", "/*/admin"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
