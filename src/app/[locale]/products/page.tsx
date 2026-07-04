import Image from "next/image";
import {ArrowRight} from "lucide-react";
import {hasLocale} from "next-intl";
import {setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";

import {PageHero} from "@/components/shared/page-hero";
import {Link} from "@/i18n/navigation";
import {routing, type Locale} from "@/i18n/routing";
import {imageSrc} from "@/lib/image-src";
import {localize} from "@/lib/localized";
import {fetchPublicCategories, fetchPublicProducts} from "@/lib/public-api";

export default async function ProductsPage({params}: PageProps<"/[locale]/products">) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const currentLocale = locale as Locale;
  const [products, categories] = await Promise.all([fetchPublicProducts(), fetchPublicCategories()]);

  return (
    <main className="bg-white">
      <PageHero title="Products" eyebrow="Avantika catalog" image="/hero-slide5.png" />
      <section className="section-space">
        <div className="container-shell">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-blue-700">Therapeutic portfolio</p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.035em] text-slate-950 sm:text-5xl">Medicines by category</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">Browse published Avantika products with dosage forms and therapeutic information.</p>
            </div>
          </div>

          {categories.length ? (
            <div className="mt-8 flex gap-3 overflow-x-auto pb-2">
              {categories.map((category) => (
                <span key={category.id} className="shrink-0 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-800">
                  {localize(category.title, currentLocale)}
                </span>
              ))}
            </div>
          ) : null}

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <article key={product.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm shadow-blue-950/[0.04]">
                <div className="relative aspect-[4/3] overflow-hidden bg-[#f6f8fc]">
                  <Image src={imageSrc(product.images[0]?.url, "/d1.jpeg")} alt={localize(product.title, currentLocale)} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" unoptimized />
                </div>
                <div className="p-6">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-blue-700">{localize(product.category?.title, currentLocale) || product.slug}</p>
                  <h3 className="mt-2 text-2xl font-extrabold text-slate-950">{localize(product.title, currentLocale)}</h3>
                  <p className="mt-2 text-sm font-semibold text-slate-500">{localize(product.dosageForm, currentLocale)}</p>
                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">{stripHtml(localize(product.therapeuticIndication, currentLocale))}</p>
                  <Link href={`/products/${product.id}`} className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-blue-700">Details <ArrowRight className="size-4" /></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
