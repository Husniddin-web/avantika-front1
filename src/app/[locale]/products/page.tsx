import {hasLocale} from "next-intl";
import {getTranslations} from "next-intl/server";
import {setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";
import type {Metadata} from "next";

import {ProductsCatalog} from "@/components/products/products-catalog";
import {PageHero} from "@/components/shared/page-hero";
import {routing, type Locale} from "@/i18n/routing";
import {fetchPublicCategories, fetchPublicProducts} from "@/lib/public-api";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://avantikamedex.com";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/products">): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale: locale as "uz" | "ru" | "en", namespace: "ProductsPage"});
  const metaT = await getTranslations({locale: locale as "uz" | "ru" | "en", namespace: "Metadata"});
  const title = t("heroTitle");
  const description = metaT("description");
  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/products`,
      languages: Object.fromEntries(
        routing.locales.map((loc) => [loc, `${SITE_URL}/${loc}/products`])
      ),
    },
    openGraph: {url: `${SITE_URL}/${locale}/products`, title, description},
  };
}


export default async function ProductsPage({params}: PageProps<"/[locale]/products">) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const currentLocale = locale as Locale;
  const t = await getTranslations("ProductsPage");
  const [products, categories] = await Promise.all([fetchPublicProducts(), fetchPublicCategories()]);

  return (
    <main className="bg-white">
      <PageHero title={t("heroTitle")} eyebrow={t("heroEyebrow")} image="/hero-slide5.png" />
      <section className="section-space">
        <ProductsCatalog products={products} categories={categories} locale={currentLocale} />
      </section>
    </main>
  );
}
