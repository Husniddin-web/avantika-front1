import Image from "next/image";
import {ChevronRight} from "lucide-react";
import {hasLocale} from "next-intl";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";

import {Link} from "@/i18n/navigation";
import {routing, type Locale} from "@/i18n/routing";
import {imageSrc} from "@/lib/image-src";
import {localize} from "@/lib/localized";
import {fetchPublicProduct} from "@/lib/public-api";

export default async function ProductDetailPage({params}: PageProps<"/[locale]/products/[id]">) {
  const {locale, id} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const product = await fetchPublicProduct(id);
  if (!product) notFound();

  const currentLocale = locale as Locale;
  const t = await getTranslations("ProductDetailPage");
  const nav = await getTranslations("Navigation");
  const title = localize(product.title, currentLocale);

  return (
    <main className="bg-[#f6f8fc] pb-20 pt-32">
      <div className="container-shell">
        <nav className="mb-8 flex items-center justify-start gap-2 text-sm font-semibold text-slate-500">
          <Link href="/" className="hover:text-blue-700">{nav("home")}</Link>
          <ChevronRight className="size-4" />
          <Link href="/products" className="hover:text-blue-700">{nav("products")}</Link>
          <ChevronRight className="size-4" />
          <span className="text-slate-900">{title}</span>
        </nav>

        <section className="overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-blue-950/5 lg:grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative min-h-[420px] bg-white">
            <div className="absolute left-0 top-0 hidden h-full w-24 border-r border-slate-100 bg-white lg:block">
              <div className="mx-auto mt-20 size-16 overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
                <Image src={imageSrc(product.images[0]?.url, "/d1.jpeg")} alt={title} width={64} height={64} className="size-full object-cover" unoptimized />
              </div>
            </div>
            <div className="relative h-[420px] lg:ml-24 lg:h-full">
              <Image src={imageSrc(product.images[0]?.url, "/d1.jpeg")} alt={title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain p-8" unoptimized />
            </div>
          </div>

          <div className="border-t border-slate-100 p-7 lg:border-l lg:border-t-0 lg:p-12">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-blue-700">{localize(product.category?.title, currentLocale) || t("product")}</p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-[-0.04em] text-slate-950">{title}</h1>

            <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200">
              <div className="grid grid-cols-[0.9fr_1.1fr] border-b border-slate-200 bg-[#fbf7fb]">
                <div className="p-4 text-sm font-semibold text-slate-500">{t("dosageForm")}</div>
                <div className="p-4 text-sm font-bold text-slate-800">{localize(product.dosageForm, currentLocale) || "-"}</div>
              </div>
              <div className="grid grid-cols-[0.9fr_1.1fr]">
                <div className="p-4 text-sm font-semibold text-slate-500">{t("category")}</div>
                <div className="p-4 text-sm font-bold text-slate-800">{localize(product.category?.title, currentLocale) || "-"}</div>
              </div>
            </div>

            <div className="prose prose-slate mt-8 max-w-none">
              <h2 className="text-lg font-extrabold text-slate-950">{t("therapeuticIndication")}</h2>
              <div className="mt-3 text-sm leading-7 text-slate-700" dangerouslySetInnerHTML={{__html: localize(product.therapeuticIndication, currentLocale)}} />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
