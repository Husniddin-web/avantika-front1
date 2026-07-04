import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Check,
  Factory,
  Handshake,
  Microscope,
  PackageCheck,
  ShieldCheck,
  Users,
} from "lucide-react";
import {useTranslations} from "next-intl";
import {
  FaCapsules,
  FaCertificate,
  FaShieldHalved,
} from "react-icons/fa6";

import {Link} from "@/i18n/navigation";
import type {Locale} from "@/i18n/routing";
import type {PublicHomeData} from "@/lib/public-api";
import {localize} from "@/lib/localized";
import {imageSrc} from "@/lib/image-src";

import {HeroSlider} from "./hero-slider";
import {TeamCarousel} from "./team-carousel";
import {GlobalPresence} from "./global-presence";
import {ManufacturingGallery} from "./manufacturing-gallery";
import {Reveal} from "../shared/reveal";
import {SectionHeading} from "../shared/section-heading";

const directions = [
  {key: "production", icon: Factory},
  {key: "research", icon: Microscope},
  {key: "quality", icon: ShieldCheck},
  {key: "partnership", icon: Handshake},
] as const;

const advantages = [
  {key: "gmp", icon: BadgeCheck},
  {key: "experience", icon: CalendarDays},
  {key: "specialists", icon: Users},
  {key: "portfolio", icon: PackageCheck},
] as const;

const fallbackCategories = [
  {key: "cardiology", icon: "/cat-2.png"},
  {key: "gastro", icon: "/cat-1.png"},
  {key: "pediatrics", icon: "/cat-3.png"},
  {key: "rheumatology", icon: "/cat-4.png"},
  {key: "antibiotics", icon: "/cat-5.png"},
  {key: "otc", icon: "/cat-6.png"},
] as const;

const fallbackProducts = [
  {id: "velcluza-01", key: "velcluza", image: "/d1.jpeg", imageClass: "object-cover object-bottom", categoryIcon: "/cat-5.png"},
  {id: "ursodox-01", key: "ursodox", image: "/d2.jpg", imageClass: "object-contain", categoryIcon: "/cat-1.png"},
  {id: "jaraflu-01", key: "jaraflu", image: "/d3.jpg", imageClass: "object-contain", categoryIcon: "/cat-6.png"},
  {id: "aenoxap-01", key: "aenoxap", image: "/d4.png", imageClass: "object-contain", categoryIcon: "/cat-2.png"},
  {id: "velcluza-02", key: "velcluza", image: "/d5.jpeg", imageClass: "object-cover object-bottom", categoryIcon: "/cat-5.png"},
  {id: "jaraflu-02", key: "jaraflu", image: "/d3.jpg", imageClass: "object-contain", categoryIcon: "/cat-6.png"},
  {id: "ursodox-02", key: "ursodox", image: "/d2.jpg", imageClass: "object-contain", categoryIcon: "/cat-1.png"},
  {id: "aenoxap-02", key: "aenoxap", image: "/d4.png", imageClass: "object-contain", categoryIcon: "/cat-2.png"},
  {id: "jaraflu-03", key: "jaraflu", image: "/d3.jpg", imageClass: "object-contain", categoryIcon: "/cat-6.png"},
  {id: "velcluza-03", key: "velcluza", image: "/d1.jpeg", imageClass: "object-cover object-bottom", categoryIcon: "/cat-5.png"},
] as const;

const certificates = [
  {key: "gmp", icon: FaShieldHalved},
  {key: "iso", icon: FaCertificate},
  {key: "license", icon: FaCapsules},
] as const;

const fallbackNews = [
  {
    key: "research",
    image: "https://images.pexels.com/photos/4031416/pexels-photo-4031416.jpeg?auto=compress&cs=tinysrgb&w=1000",
  },
  {
    key: "laboratory",
    image: "https://images.pexels.com/photos/8442512/pexels-photo-8442512.jpeg?auto=compress&cs=tinysrgb&w=1000",
  },
  {
    key: "quality",
    image: "https://images.pexels.com/photos/3735714/pexels-photo-3735714.jpeg?auto=compress&cs=tinysrgb&w=1000",
  },
] as const;

function ArrowLink({href, children, inverse = false}: {href: string; children: React.ReactNode; inverse?: boolean}) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 ${
        inverse
          ? "bg-white text-blue-900 hover:bg-blue-50 focus-visible:outline-white"
          : "bg-blue-700 text-white shadow-lg shadow-blue-800/20 hover:-translate-y-0.5 hover:bg-blue-800 focus-visible:outline-blue-700"
      }`}
    >
      {children}<ArrowRight className="size-4" />
    </Link>
  );
}

function repeatToMinimum<T>(items: T[], minimum: number) {
  if (items.length === 0) return items;
  const output = [...items];

  while (output.length < minimum) {
    output.push(...items);
  }

  return output.slice(0, Math.max(minimum, items.length));
}

export function HomePageContent({cmsData, locale}: {cmsData?: PublicHomeData; locale: Locale}) {
  const t = useTranslations("Home");
  const categoryItems = cmsData?.categories.length
      ? cmsData.categories.map((category) => ({
        id: category.id,
        title: localize(category.title, locale),
        icon: imageSrc(category.image?.url, "/cat-2.png"),
      }))
    : fallbackCategories.map(({key, icon}) => ({
        id: key,
        title: t(`categories.items.${key}`),
        icon,
      }));
  const productItems = cmsData?.products.length
    ? repeatToMinimum(
        cmsData.products.map((product) => ({
          id: product.id,
          href: `/products/${product.id}`,
          title: localize(product.title, locale),
          form: localize(product.dosageForm, locale) || product.slug,
          category: localize(product.category?.title, locale),
          image: imageSrc(product.images[0]?.url, "/d1.jpeg"),
          imageClass: "object-cover object-center",
          categoryIcon: imageSrc(product.category?.image?.url, "/cat-2.png"),
          imageAlt: localize(product.title, locale),
        })),
        10,
      )
    : fallbackProducts.map((product) => ({
        id: product.id,
        href: "/products",
        title: t(`products.items.${product.key}.name`),
        form: t(`products.items.${product.key}.form`),
        category: t(`products.items.${product.key}.category`),
        image: product.image,
        imageClass: product.imageClass,
        categoryIcon: product.categoryIcon,
        imageAlt: t(`products.items.${product.key}.imageAlt`),
      }));
  const newsItems = cmsData?.news.length
    ? cmsData.news.slice(0, 3).map((article) => ({
        id: article.id,
        title: localize(article.title, locale),
        description: stripHtml(localize(article.content, locale)),
        category: article.status === "published" ? t("news.eyebrow") : article.status,
        date: new Date(article.createdAt).toLocaleDateString(),
        image: imageSrc(article.images[0]?.url, "https://images.pexels.com/photos/4031416/pexels-photo-4031416.jpeg?auto=compress&cs=tinysrgb&w=1000"),
        imageAlt: localize(article.title, locale),
      }))
    : fallbackNews.map(({key, image}) => ({
        id: key,
        title: t(`news.items.${key}.title`),
        description: t(`news.items.${key}.description`),
        category: t(`news.items.${key}.category`),
        date: t(`news.items.${key}.date`),
        image,
        imageAlt: t(`news.items.${key}.imageAlt`),
      }));

  return (
    <main className="overflow-hidden">
      <HeroSlider />

      <section
        className="directions-parallax section-space relative isolate overflow-hidden bg-[#080a4b] bg-cover bg-center bg-no-repeat text-white"
        style={{backgroundImage: "url('/info.jpg')"}}
      >
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#05072f]/95 via-[#080a4b]/78 to-[#080a4b]/35" />
        <div className="absolute inset-0 z-0 bg-[#080a4b]/20" />
        <div className="container-shell relative z-10">
          <Reveal><SectionHeading eyebrow={t("directions.eyebrow")} title={t("directions.title")} description={t("directions.description")} inverse /></Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {directions.map(({key, icon: Icon}, index) => (
              <Reveal key={key} delay={index * 80}>
                <article className="group h-full rounded-[1.75rem] border border-white/10 bg-white/[0.07] p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-300/40 hover:bg-white/[0.11]">
                  <div className="flex items-start justify-between">
                    <span className="grid size-13 place-items-center rounded-2xl bg-[#9aa7f5] text-[#080a4b]"><Icon className="size-6" /></span>
                    <span className="text-xs font-bold text-white/25">0{index + 1}</span>
                  </div>
                  <h3 className="mt-8 text-xl font-bold">{t(`directions.items.${key}.title`)}</h3>
                  <p className="mt-3 text-sm leading-6 text-blue-100/65">{t(`directions.items.${key}.description`)}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate min-h-[680px] overflow-hidden bg-[#eef5ff] sm:min-h-[720px]">
        <div className="absolute inset-y-0 right-0 -z-30 w-full lg:w-[62%]">
          <Image
            src="https://images.pexels.com/photos/4031416/pexels-photo-4031416.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt={t("advantages.imageAlt")}
            fill
            sizes="(max-width: 1024px) 100vw, 62vw"
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 -z-20 bg-gradient-to-r from-white via-white/92 to-white/20 lg:hidden" />
        <svg aria-hidden="true" viewBox="0 0 1600 720" preserveAspectRatio="none" className="absolute inset-0 -z-20 hidden size-full lg:block">
          <defs>
            <linearGradient id="why-surface" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="0.68" stopColor="#f7faff" />
              <stop offset="1" stopColor="#e7f0ff" />
            </linearGradient>
          </defs>
          <path d="M0 0H1190C1080 80 1040 180 980 292C895 450 838 620 690 696C620 733 545 720 0 720Z" fill="url(#why-surface)" />
        </svg>
        <div className="hero-dot-grid absolute left-0 top-16 -z-10 hidden h-32 w-44 opacity-60 lg:block" />

        <div className="container-shell flex min-h-[680px] items-center py-16 sm:min-h-[720px]">
          <Reveal className="max-w-[570px]">
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-blue-700">{t("advantages.eyebrow")}</p>
            <h2 className="mt-5 max-w-xl text-balance text-4xl font-extrabold leading-[1.05] tracking-[-0.045em] text-[#10172b] sm:text-5xl lg:text-6xl">{t("advantages.title")}</h2>
            <p className="mt-6 max-w-lg text-base leading-8 text-slate-600 sm:text-lg">{t("advantages.description")}</p>
            <div className="mt-9 grid grid-cols-2 gap-3 lg:hidden">
              {advantages.map(({key}) => (
                <div key={key} className="rounded-2xl border border-blue-100 bg-white/80 p-4 backdrop-blur">
                  <p className="font-extrabold text-blue-800">{t(`advantages.items.${key}.value`)}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{t(`advantages.items.${key}.label`)}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={120} className="absolute left-[52%] top-[20%] hidden xl:block">
          <div className="flex min-w-52 items-center gap-4 rounded-3xl border border-white/80 bg-white/88 p-5 premium-shadow backdrop-blur-xl">
            <span className="grid size-12 place-items-center rounded-2xl bg-blue-50 text-blue-700"><BadgeCheck className="size-6" /></span>
            <div><p className="text-lg font-extrabold text-blue-800">{t("advantages.items.gmp.value")}</p><p className="mt-1 text-xs text-slate-500">{t("advantages.items.gmp.label")}</p></div>
          </div>
        </Reveal>
        <Reveal delay={180} className="absolute left-[49%] top-[45%] hidden xl:block">
          <div className="flex min-w-52 items-center gap-4 rounded-3xl border border-white/80 bg-white/88 p-5 premium-shadow backdrop-blur-xl">
            <span className="grid size-12 place-items-center rounded-2xl bg-blue-50 text-blue-700"><CalendarDays className="size-6" /></span>
            <div><p className="text-2xl font-extrabold text-blue-800">{t("advantages.items.experience.value")}</p><p className="mt-1 text-xs text-slate-500">{t("advantages.items.experience.label")}</p></div>
          </div>
        </Reveal>
        <Reveal delay={240} className="absolute bottom-[12%] left-[51%] hidden xl:block">
          <div className="flex min-w-60 items-center gap-4 rounded-3xl bg-gradient-to-br from-blue-600 to-blue-900 p-5 text-white shadow-2xl shadow-blue-900/25">
            <span className="grid size-12 place-items-center rounded-2xl bg-white/15"><Users className="size-6" /></span>
            <div><p className="text-2xl font-extrabold">{t("advantages.items.specialists.value")}</p><p className="mt-1 text-xs text-blue-100">{t("advantages.items.specialists.label")}</p></div>
          </div>
        </Reveal>
      </section>

      <section className="section-space bg-[#f3f6fc]">
        <div className="container-shell">
          <Reveal><SectionHeading eyebrow={t("categories.eyebrow")} title={t("categories.title")} description={t("categories.description")} centered /></Reveal>
          <Reveal className="category-slider mt-8 overflow-hidden py-2 sm:mt-12 sm:py-3">
            <div className="category-track flex w-max gap-3 sm:gap-5">
              {[false, true].map((isDuplicate) => (
                <div
                  key={isDuplicate ? "duplicate" : "original"}
                  aria-hidden={isDuplicate || undefined}
                  className="flex gap-3 sm:gap-5"
                >
                  {categoryItems.map(({id, title, icon}) => (
                    <Link
                      key={`${isDuplicate ? "duplicate" : "original"}-${id}`}
                      href="/products"
                      tabIndex={isDuplicate ? -1 : undefined}
                      className="group flex min-h-36 w-[calc((100vw-2rem-0.75rem)/2)] shrink-0 flex-col items-center justify-center rounded-[1.15rem] border border-slate-200 bg-white p-3 text-center transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-950/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 sm:min-h-60 sm:w-64 sm:rounded-[1.5rem] sm:p-7 lg:w-[280px]"
                    >
                      <span className="relative grid size-16 place-items-center overflow-hidden rounded-full transition duration-300 group-hover:scale-105 sm:size-24">
                        <Image
                          src={icon}
                          alt=""
                          fill
                          sizes="96px"
                          className="object-contain transition duration-300 group-hover:opacity-80 group-focus-visible:opacity-80"
                        />
                      </span>
                      <h3 className="mt-4 text-sm font-extrabold leading-5 text-slate-700 transition-colors group-hover:text-blue-800 group-focus-visible:text-blue-800 sm:mt-6 sm:text-xl sm:leading-6">
                        {title}
                      </h3>
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="container-shell">
          <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
            <Reveal><SectionHeading eyebrow={t("products.eyebrow")} title={t("products.title")} description={t("products.description")} /></Reveal>
            <Reveal><ArrowLink href="/products">{t("products.all")}</ArrowLink></Reveal>
          </div>
          <Reveal className="product-marquee mt-8 space-y-3 overflow-hidden py-2 sm:mt-12 sm:space-y-5">
            {[productItems.slice(0, 5), productItems.slice(5, 10)].map((row, rowIndex) => (
              <div key={rowIndex} className={`product-marquee-track flex w-max gap-3 sm:gap-5 ${rowIndex === 1 ? "product-marquee-track-reverse" : ""}`}>
                {[false, true].map((duplicate) => (
                  <div key={duplicate ? "duplicate" : "original"} aria-hidden={duplicate || undefined} className="flex gap-3 sm:gap-5">
                    {row.map((product) => (
                      <Link
                        key={`${product.id}-${duplicate ? "copy" : "main"}`}
                        href={product.href}
                        tabIndex={duplicate ? -1 : undefined}
                      className="group w-[calc((100vw-2rem-0.75rem)/2)] shrink-0 overflow-hidden rounded-[1.1rem] border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/10 sm:w-[250px] sm:rounded-[1.35rem]"
                      >
                        <div className="relative h-28 overflow-hidden bg-[#f6f8fc] sm:h-40">
                          <Image
                            src={product.image}
                            alt={product.imageAlt}
                            fill
                            sizes="(max-width: 640px) 50vw, 285px"
                            className="object-cover transition duration-500 group-hover:scale-[1.04]"
                          />
                        </div>
                        <div className="p-3 sm:p-5">
                          <h3 className="text-base font-extrabold text-[#10172b] sm:text-xl">{product.title}</h3>
                          <p className="mt-1 line-clamp-1 text-xs text-slate-500">{product.form}</p>
                          <div className="mt-4 border-t border-slate-100 pt-3">
                            <span className="inline-flex min-h-10 w-full min-w-0 items-center justify-between gap-2 text-blue-700 sm:min-h-12">
                              <span className="relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-full sm:size-11">
                                <Image
                                  src={product.categoryIcon}
                                  alt=""
                                  fill
                                  sizes="44px"
                                  className="object-contain transition duration-300 group-hover:opacity-80"
                                />
                              </span>
                              <span className="line-clamp-2 min-w-0 flex-1 text-left text-[8px] font-extrabold uppercase leading-4 tracking-[0.08em] sm:text-[9px] sm:tracking-[0.1em]">
                                {product.category}
                              </span>
                              <ArrowRight className="size-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 sm:size-4" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="manufacturing-parallax relative isolate overflow-hidden pb-20 pt-36 text-white sm:pb-28 sm:pt-56 lg:min-h-[820px] lg:pb-32 lg:pt-64">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#070936]/95 via-[#10156e]/78 to-[#10156e]/35" />
        <div className="absolute inset-0 -z-10 bg-[#080a4b]/25" />

        <svg
          aria-hidden="true"
          viewBox="0 0 1440 110"
          preserveAspectRatio="none"
          className="absolute inset-x-0 top-0 z-10 h-24 w-full sm:hidden"
        >
          <path
            d="M0 0H1440V42C1288 96 1150 82 1018 52C856 16 746 34 616 82C472 136 312 132 164 92C82 70 34 48 0 30Z"
            fill="#ffffff"
          />
        </svg>

        <svg
          aria-hidden="true"
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          className="absolute inset-x-0 top-0 z-10 hidden h-44 w-full sm:block lg:h-52"
        >
          <path
            d="M0 0H1440V54C1268 142 1135 40 954 102C735 177 598 66 414 125C250 177 118 151 0 91Z"
            fill="#ffffff"
          />
        </svg>

        <div className="container-shell relative z-20">
          <Reveal className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-[9px] font-extrabold uppercase tracking-[0.16em] text-blue-100 backdrop-blur sm:px-4 sm:text-[10px] sm:tracking-[0.2em]">
              <Factory className="size-4" />
              {t("manufacturing.eyebrow")}
            </div>
            <h2 className="mt-5 max-w-xl text-balance text-3xl font-extrabold leading-tight tracking-[-0.035em] text-white sm:mt-6 sm:text-5xl sm:tracking-[-0.04em]">
              {t("manufacturing.title")}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-blue-100/75 sm:mt-5 sm:text-lg sm:leading-8">
              {t("manufacturing.description")}
            </p>
            <div className="mt-6 grid gap-3 sm:mt-9 sm:grid-cols-2">
              {(["lines", "control", "capacity", "laboratory"] as const).map((item, index) => (
                <div key={item} className={`${index > 1 ? "hidden sm:flex" : "flex"} items-start gap-3 rounded-2xl border border-white/15 bg-[#080a4b]/55 p-3 backdrop-blur-md sm:p-4`}>
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-red-500"><Check className="size-4" /></span>
                  <p className="text-xs font-semibold leading-5 text-blue-50/90 sm:text-sm sm:leading-6">{t(`manufacturing.points.${item}`)}</p>
                </div>
              ))}
            </div>
            <div className="mt-8"><ArrowLink href="/about" inverse>{t("manufacturing.cta")}</ArrowLink></div>
          </Reveal>
        </div>
      </section>

      <ManufacturingGallery />

      <section className="section-space bg-[#f4f7fb]">
        <div className="container-shell">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
            <Reveal>
              <div className="relative isolate flex h-full min-h-[420px] overflow-hidden rounded-[1.5rem] bg-[#071036] p-6 text-white sm:p-8 lg:rounded-[1.75rem] lg:p-10">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_18%,rgba(65,105,225,0.42),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_42%)]" />
                <div className="absolute -right-16 bottom-10 -z-10 size-56 rounded-full border border-white/10" />
                <div className="absolute right-8 top-8 grid size-20 place-items-center rounded-full border border-white/15 bg-white/10 text-blue-100">
                  <ShieldCheck className="size-9" />
                </div>

                <div className="flex max-w-md flex-col justify-between">
                  <div>
                    <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-blue-100">
                      <BadgeCheck className="size-4" />
                      {t("quality.verified")}
                    </p>
                    <h2 className="mt-7 text-balance text-3xl font-extrabold leading-tight tracking-[-0.035em] sm:text-5xl">
                      {t("quality.title")}
                    </h2>
                    <p className="mt-5 text-sm leading-7 text-blue-100/72 sm:text-base">
                      {t("quality.description")}
                    </p>
                  </div>

                  <div className="mt-10 grid grid-cols-3 gap-3 border-t border-white/10 pt-6">
                    {["GMP", "ISO", "QA"].map((label) => (
                      <div key={label}>
                        <p className="text-xl font-extrabold text-white sm:text-2xl">{label}</p>
                        <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-blue-100/48">
                          {t("quality.verified")}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="grid gap-4">
              {certificates.map(({key, icon: Icon}, index) => (
                <Reveal key={key} delay={index * 90}>
                  <article className="group grid gap-5 rounded-[1.25rem] border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/10 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-6">
                    <span className="grid size-16 place-items-center rounded-2xl bg-[#eef3ff] text-blue-800 transition duration-300 group-hover:bg-blue-700 group-hover:text-white">
                      <Icon className="size-7" />
                    </span>
                    <div>
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-red-500">
                        {t("quality.verified")}
                      </p>
                      <h3 className="mt-2 text-xl font-extrabold text-[#10172b] sm:text-2xl">
                        {t(`quality.items.${key}.title`)}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        {t(`quality.items.${key}.description`)}
                      </p>
                    </div>
                    <span className="hidden h-12 w-px bg-slate-100 sm:block" />
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <GlobalPresence />

      <TeamCarousel workers={cmsData?.workers ?? []} locale={locale} />

      <section className="section-space bg-white">
        <div className="container-shell">
          <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
            <Reveal><SectionHeading eyebrow={t("news.eyebrow")} title={t("news.title")} description={t("news.description")} /></Reveal>
            <Reveal><ArrowLink href="/news">{t("news.all")}</ArrowLink></Reveal>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {newsItems.map((article, index) => (
              <Reveal key={article.id} delay={index * 90}>
                <article className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white transition hover:shadow-2xl hover:shadow-blue-950/10">
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <Image src={article.image} alt={article.imageAlt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
                    <span className="absolute bottom-4 left-4 rounded-full bg-white px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-blue-800">{article.category}</span>
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-semibold text-slate-400">{article.date}</p>
                    <h3 className="mt-3 text-xl font-extrabold leading-7 text-[#10172b]">{article.title}</h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">{article.description}</p>
                    <Link href="/news" className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-blue-700">{t("news.more")}<ArrowRight className="size-4" /></Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="container-shell">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-[#10172b] px-7 py-12 text-white sm:px-12 lg:flex lg:items-center lg:justify-between lg:px-16 lg:py-14">
              <div className="absolute -right-20 -top-28 size-80 rounded-full bg-[#2948c8] blur-3xl" />
              <div className="relative max-w-2xl">
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-blue-200">{t("cta.eyebrow")}</p>
                <h2 className="mt-4 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">{t("cta.title")}</h2>
                <p className="mt-4 text-sm leading-7 text-blue-100/65 sm:text-base">{t("cta.description")}</p>
              </div>
              <div className="relative mt-8 lg:mt-0"><ArrowLink href="/contacts" inverse>{t("cta.button")}</ArrowLink></div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
