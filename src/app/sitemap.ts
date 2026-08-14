import type {MetadataRoute} from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://avantikamedex.com";
const locales = ["uz", "ru", "en"] as const;

const staticPages = [
  "",           // home
  "/products",
  "/about",
  "/contacts",
  "/news",
  "/pharmacovigilance",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Static pages for all locales
  const staticEntries: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    for (const page of staticPages) {
      staticEntries.push({
        url: `${SITE_URL}/${locale}${page}`,
        lastModified: now,
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1.0 : page === "/products" ? 0.9 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((loc) => [loc, `${SITE_URL}/${loc}${page}`])
          ),
        },
      });
    }
  }

  // Try to fetch dynamic product and news slugs
  let productEntries: MetadataRoute.Sitemap = [];
  let newsEntries: MetadataRoute.Sitemap = [];

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api";

    const [productsRes, newsRes] = await Promise.allSettled([
      fetch(`${apiUrl}/products?limit=500`, {next: {revalidate: 3600}}),
      fetch(`${apiUrl}/news?limit=200`, {next: {revalidate: 3600}}),
    ]);

    if (productsRes.status === "fulfilled" && productsRes.value.ok) {
      const data = await productsRes.value.json();
      const products: Array<{id: string; updatedAt?: string}> =
        data.data ?? data ?? [];
      productEntries = locales.flatMap((locale) =>
        products.map((p) => ({
          url: `${SITE_URL}/${locale}/products/${p.id}`,
          lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
          changeFrequency: "monthly" as const,
          priority: 0.7,
        }))
      );
    }

    if (newsRes.status === "fulfilled" && newsRes.value.ok) {
      const data = await newsRes.value.json();
      const articles: Array<{slug: string; createdAt?: string}> =
        data.data ?? data ?? [];
      newsEntries = locales.flatMap((locale) =>
        articles.map((a) => ({
          url: `${SITE_URL}/${locale}/news/${a.slug}`,
          lastModified: a.createdAt ? new Date(a.createdAt) : now,
          changeFrequency: "weekly" as const,
          priority: 0.6,
        }))
      );
    }
  } catch {
    // silently continue if API not available at build time
  }

  return [...staticEntries, ...productEntries, ...newsEntries];
}
