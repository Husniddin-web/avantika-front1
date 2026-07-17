import Image from "next/image";
import {CalendarDays, ChevronRight, Clock, User, ArrowLeft} from "lucide-react";
import {hasLocale} from "next-intl";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";

import {Link} from "@/i18n/navigation";
import {routing, type Locale} from "@/i18n/routing";
import {imageSrc} from "@/lib/image-src";
import {localize} from "@/lib/localized";
import {fetchPublicNews, fetchPublicNewsArticle} from "@/lib/public-api";
import {ShareButtons} from "@/components/news/share-buttons";

export default async function NewsDetailPage({params}: PageProps<"/[locale]/news/[slug]">) {
  const {locale, slug} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const currentLocale = locale as Locale;
  const article = await fetchPublicNewsArticle(slug);
  if (!article) notFound();

  const allNews = await fetchPublicNews();
  const recentNews = allNews
    .filter((n) => n.id !== article.id)
    .slice(0, 3);

  const t = await getTranslations("NewsDetailPage");
  const nav = await getTranslations("Navigation");

  const title = localize(article.title, currentLocale);
  const content = localize(article.content, currentLocale);
  
  // Calculate reading time based on ~200 words per minute (around 800 characters)
  const readTimeMinutes = Math.max(1, Math.ceil(content.length / 800));

  // Determine site base URL for sharing
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://avantika.uz";
  const shareUrl = `${siteUrl}/${currentLocale}/news/${article.slug}`;

  return (
    <main className="bg-[#f8fafc] pb-24 pt-32">
      <div className="container-shell">
        {/* Breadcrumbs */}
        <nav className="mb-8 flex flex-wrap items-center justify-start gap-2 text-xs sm:text-sm font-semibold text-slate-500">
          <Link href="/" className="hover:text-blue-700 transition">{nav("home")}</Link>
          <ChevronRight className="size-4 text-slate-300" />
          <Link href="/news" className="hover:text-blue-700 transition">{nav("news")}</Link>
          <ChevronRight className="size-4 text-slate-300" />
          <span className="text-slate-900 line-clamp-1 max-w-[200px] sm:max-w-xs">{title}</span>
        </nav>

        {/* Back Link */}
        <Link href="/news" className="group mb-8 inline-flex items-center gap-2 text-sm font-bold text-blue-700 transition hover:text-blue-800">
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          <span>{t("backToNews")}</span>
        </Link>

        {/* Main Article Container */}
        <article className="overflow-hidden rounded-[2rem] bg-white border border-slate-100 shadow-xl shadow-blue-950/[0.03]">
          {/* Hero Section */}
          <div className="relative aspect-[21/9] w-full min-h-[260px] bg-slate-900">
            <Image
              src={imageSrc(article.images[0]?.url, "/avantika1.jpg")}
              alt={title}
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-80"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full p-6 sm:p-10 lg:p-14 text-white">
              <span className="inline-flex items-center rounded-full bg-blue-600 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-white">
                {currentLocale === "uz" ? "Yangiliklar" : currentLocale === "ru" ? "Новости" : "News"}
              </span>
              <h1 className="mt-4 text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-outfit">
                {title}
              </h1>
            </div>
          </div>

          <div className="p-6 sm:p-10 lg:p-14">
            {/* Grid Layout for article body */}
            <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
              {/* Sidebar Info */}
              <div className="space-y-6 lg:border-r lg:border-slate-100 lg:pr-8">
                <div className="flex items-center gap-3">
                  <div className="grid size-12 place-items-center rounded-xl bg-slate-50 border border-slate-100 text-slate-600">
                    <User className="size-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase leading-none">{t("by")}</span>
                    <span className="mt-1 block text-sm font-extrabold text-slate-900 leading-tight">{t("author")}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-100 text-xs font-semibold text-slate-500">
                  <div className="flex items-center gap-2.5">
                    <CalendarDays className="size-4.5 text-slate-400" />
                    <span>
                      {t("publishedAt")}: {new Date(article.createdAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="size-4.5 text-slate-400" />
                    <span>{t("readTime", {time: readTimeMinutes})}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <ShareButtons
                    url={shareUrl}
                    title={title}
                    labels={{
                      share: t("share"),
                      copied: t("copied"),
                    }}
                  />
                </div>
              </div>

              {/* Main Body text */}
              <div className="prose prose-slate max-w-none text-slate-800 leading-relaxed text-base sm:text-lg">
                <div className="whitespace-pre-wrap font-medium">
                  {content}
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related News Section */}
        {recentNews.length > 0 && (
          <section className="mt-16 border-t border-slate-200 pt-16">
            <h2 className="text-2xl font-extrabold text-slate-950 tracking-tight font-outfit">
              {t("recentNews")}
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recentNews.map((n) => {
                const nTitle = localize(n.title, currentLocale);
                return (
                  <Link
                    key={n.id}
                    href={`/news/${n.slug}`}
                    className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/5"
                  >
                    <div className="relative aspect-[16/10] bg-slate-100">
                      <Image
                        src={imageSrc(n.images[0]?.url, "/avantika1.jpg")}
                        alt={nTitle}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.02]"
                        unoptimized
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                        <CalendarDays className="size-3.5" />
                        {new Date(n.createdAt).toLocaleDateString()}
                      </p>
                      <h3 className="mt-3 text-lg font-extrabold text-slate-950 line-clamp-2 leading-snug group-hover:text-blue-700 transition">
                        {nTitle}
                      </h3>
                      <p className="mt-3 flex-1 line-clamp-3 text-sm leading-relaxed text-slate-500">
                        {localize(n.content, currentLocale).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()}
                      </p>
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
