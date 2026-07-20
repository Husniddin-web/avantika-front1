import Image from "next/image";
import {ChevronRight, Info} from "lucide-react";
import {hasLocale} from "next-intl";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";

import {Link} from "@/i18n/navigation";
import {routing, type Locale} from "@/i18n/routing";
import {imageSrc} from "@/lib/image-src";
import {localize} from "@/lib/localized";
import {fetchPublicProduct, fetchPublicProducts} from "@/lib/public-api";
import {ProductTabs} from "@/components/products/product-tabs";

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

  const allProducts = await fetchPublicProducts();
  const relatedProducts = allProducts
    .filter((p) => {
      const shareCategory = p.categoryIds?.some((id) => product.categoryIds?.includes(id)) || p.categoryId === product.categoryId;
      return shareCategory && p.id !== product.id;
    })
    .slice(0, 4);

  const disclaimers = {
    uz: "Tibbiy ogohlantirish: Saytda keltirilgan barcha ma'lumotlar faqat tanishish maqsadida berilgan va shifokor maslahatini almashtira olmaydi. Dorini qo'llashdan oldin shifokor bilan maslahatlashing va dori qutisidagi rasmiy yo'riqnoma bilan tanishib chiqing.",
    ru: "Медицинское предупреждение: Вся информация на сайте предоставлена исключительно в ознакомительных целях и не заменяет консультацию врача. Перед использованием проконсультируйтесь со специалистом и ознакомьтесь с официальной инструкцией.",
    en: "Medical Disclaimer: All information provided on this website is for educational purposes only and does not substitute professional medical advice. Consult a healthcare professional and read the official packaging insert before use.",
  };

  return (
    <main className="bg-[#f6f8fc] pb-10 sm:pb-20 pt-20 sm:pt-32">
      <div className="container-shell">
        <nav className="mb-4 sm:mb-8 flex flex-wrap items-center justify-start gap-1.5 text-xs sm:text-sm font-semibold text-slate-500">
          <Link href="/" className="hover:text-blue-700">{nav("home")}</Link>
          <ChevronRight className="size-3.5 sm:size-4" />
          <Link href="/products" className="hover:text-blue-700">{nav("products")}</Link>
          <ChevronRight className="size-3.5 sm:size-4" />
          <span className="text-slate-900 line-clamp-1">{title}</span>
        </nav>

        <section className="overflow-hidden rounded-2xl sm:rounded-[2rem] bg-white shadow-xl shadow-blue-950/5 lg:grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative min-h-[240px] sm:min-h-[350px] lg:min-h-[420px] bg-white">
            <div className="absolute left-0 top-0 hidden h-full w-24 border-r border-slate-100 bg-white lg:block">
              <div className="mx-auto mt-20 size-16 overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
                <Image src={imageSrc(product.images[0]?.url, "/d1.jpeg")} alt={title} width={64} height={64} className="size-full object-cover" unoptimized />
              </div>
            </div>
            <div className="relative h-[240px] sm:h-[350px] lg:ml-24 lg:h-full">
              <Image src={imageSrc(product.images[0]?.url, "/d1.jpeg")} alt={title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain p-4 sm:p-8" unoptimized />
            </div>
          </div>

          <div className="border-t border-slate-100 p-4 sm:p-7 lg:border-l lg:border-t-0 lg:p-12">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.16em] sm:tracking-[0.2em] text-blue-700">
                {product.categories && product.categories.length > 0 
                  ? product.categories.map(c => localize(c.title, currentLocale)).join(", ") 
                  : (localize(product.category?.title, currentLocale) || t("product"))}
              </span>
              <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] sm:text-xs font-bold ${
                product.prescriptionType === "rx" 
                  ? "bg-red-50 text-red-600 border border-red-200" 
                  : "bg-emerald-50 text-emerald-600 border border-emerald-200"
              }`}>
                {product.prescriptionType === "rx" ? "Rx (Retseptli)" : "OTC (Retseptsiz)"}
              </span>
            </div>
            <h1 className="mt-2 sm:mt-4 text-xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl text-slate-950 leading-tight">{title}</h1>

            <div className="mt-4 sm:mt-6 rounded-2xl bg-slate-50/80 p-3.5 sm:p-5 border border-slate-200/80 space-y-2.5">
              <div className="flex items-start justify-between gap-3 text-xs sm:text-sm">
                <span className="font-semibold text-slate-500 shrink-0">{t("dosageForm")}:</span>
                <span className="font-extrabold text-slate-900 text-right">{localize(product.dosageForm, currentLocale) || "-"}</span>
              </div>
              <div className="flex items-start justify-between gap-3 text-xs sm:text-sm border-t border-slate-200/60 pt-2.5">
                <span className="font-semibold text-slate-500 shrink-0">{t("category")}:</span>
                <span className="font-extrabold text-blue-700 text-right">
                  {product.categories && product.categories.length > 0 
                    ? product.categories.map(c => localize(c.title, currentLocale)).join(", ") 
                    : (localize(product.category?.title, currentLocale) || "-")}
                </span>
              </div>
            </div>

            {/* Product tabs for composition, indications, storage and documents */}
            <ProductTabs
              therapeuticIndication={localize(product.therapeuticIndication, currentLocale)}
              indications={localize(product.indications, currentLocale)}
              composition={localize(product.composition, currentLocale)}
              activeIngredient={localize(product.activeIngredient, currentLocale)}
              dosage={localize(product.dosage, currentLocale)}
              usageInstructions={localize(product.usageInstructions, currentLocale)}
              contraindications={localize(product.contraindications, currentLocale)}
              storageConditions={localize(product.storageConditions, currentLocale)}
              packageDescription={localize(product.packageDescription, currentLocale)}
              instructionPdf={product.instructionPdf ?? null}
              locale={currentLocale}
            />
          </div>
        </section>

        {/* Medical disclaimer */}
        <section className="mt-8 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50/55 p-5 text-amber-900 shadow-sm shadow-amber-950/5">
          <Info className="size-5 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm leading-6 font-medium text-amber-800/90">{disclaimers[currentLocale] || disclaimers.uz}</p>
        </section>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 border-t border-slate-200 pt-16">
            <h2 className="text-2xl font-extrabold text-slate-950 tracking-tight">
              {currentLocale === "uz" ? "O'xshash preparatlar" : currentLocale === "ru" ? "Похожие препараты" : "Related Products"}
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((p) => {
                const pTitle = localize(p.title, currentLocale);
                return (
                  <Link
                    key={p.id}
                    href={`/products/${p.id}`}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/10"
                  >
                    <div className="relative aspect-[4/3] bg-[#f6f8fc]">
                      <Image
                        src={imageSrc(p.images[0]?.url, "/d1.jpeg")}
                        alt={pTitle}
                        fill
                        sizes="(max-width: 640px) 100vw, 25vw"
                        className="object-contain p-4 transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="border-t border-slate-100 p-4">
                      <h3 className="text-base font-extrabold text-slate-950 line-clamp-1">{pTitle}</h3>
                      <p className="mt-1 text-xs font-semibold text-slate-400 line-clamp-1">{localize(p.dosageForm, currentLocale)}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
