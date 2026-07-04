import Image from "next/image";
import {CalendarDays} from "lucide-react";
import {hasLocale} from "next-intl";
import {setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";

import {PageHero} from "@/components/shared/page-hero";
import {routing, type Locale} from "@/i18n/routing";
import {imageSrc} from "@/lib/image-src";
import {localize} from "@/lib/localized";
import {fetchPublicNews} from "@/lib/public-api";

export default async function NewsPage({params}: PageProps<"/[locale]/news">) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const currentLocale = locale as Locale;
  const news = await fetchPublicNews();

  return (
    <main className="bg-white">
      <PageHero title="News" eyebrow="Press center" image="/hero-slide-4.webp" />
      <section className="section-space bg-[#f7faff]">
        <div className="container-shell">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {news.map((article) => (
              <article key={article.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm shadow-blue-950/[0.04]">
                <div className="relative aspect-[16/10] bg-slate-100">
                  <Image src={imageSrc(article.images[0]?.url, "https://images.pexels.com/photos/4031416/pexels-photo-4031416.jpeg?auto=compress&cs=tinysrgb&w=1000")} alt={localize(article.title, currentLocale)} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" unoptimized />
                </div>
                <div className="p-6">
                  <p className="flex items-center gap-2 text-xs font-semibold text-slate-400"><CalendarDays className="size-4" />{new Date(article.createdAt).toLocaleDateString()}</p>
                  <h2 className="mt-3 text-2xl font-extrabold leading-8 text-slate-950">{localize(article.title, currentLocale)}</h2>
                  <p className="mt-4 line-clamp-4 text-sm leading-6 text-slate-600">{stripHtml(localize(article.content, currentLocale))}</p>
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
