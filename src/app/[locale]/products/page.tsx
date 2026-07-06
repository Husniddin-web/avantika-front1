import {hasLocale} from "next-intl";
import {getTranslations} from "next-intl/server";
import {setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";

import {ProductsCatalog} from "@/components/products/products-catalog";
import {PageHero} from "@/components/shared/page-hero";
import {routing, type Locale} from "@/i18n/routing";
import {fetchPublicCategories, fetchPublicProducts} from "@/lib/public-api";

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
