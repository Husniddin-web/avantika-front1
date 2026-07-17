import Image from "next/image";
import {CalendarDays} from "lucide-react";
import {hasLocale} from "next-intl";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";

import {Link} from "@/i18n/navigation";
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
  const t = await getTranslations("NewsPage");
  const news = await fetchPublicNews();

  return (
    <main className="bg-white">
      <PageHero title={t("heroTitle")} eyebrow={t("heroEyebrow")} image="/avantika1.jpg" />
      <section className="section-space bg-[#f7faff]">
        <div className="container-shell">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {news.map((article) => {
              const articleTitle = localize(article.title, currentLocale);
              return (
                <Link
                  key={article.id}
                  href={`/news/${article.slug}`}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm shadow-blue-950/[0.04] transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/5"
                >
                  <div className="relative aspect-[16/10] bg-slate-100">
                    <Image src={imageSrc(article.images[0]?.url, "/avantika1.jpg")} alt={articleTitle} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.01]" unoptimized />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="flex items-center gap-2 text-xs font-semibold text-slate-400"><CalendarDays className="size-4" />{new Date(article.createdAt).toLocaleDateString()}</p>
                    <h2 className="mt-3 text-2xl font-extrabold leading-8 text-slate-950 group-hover:text-blue-700 transition duration-300">{articleTitle}</h2>
                    <p className="mt-4 flex-1 line-clamp-4 text-sm leading-6 text-slate-600">{stripHtml(localize(article.content, currentLocale))}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
