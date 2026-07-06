import Image from "next/image";
import {BadgeCheck, ClipboardCheck, Factory, FlaskConical, Globe2, Microscope, PackageCheck, ShieldCheck} from "lucide-react";
import {hasLocale} from "next-intl";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";

import {PageHero} from "@/components/shared/page-hero";
import {routing} from "@/i18n/routing";

const stats = ["experience", "products", "markets"] as const;

const values = [
  {key: "quality", icon: BadgeCheck},
  {key: "science", icon: Microscope},
  {key: "global", icon: Globe2},
] as const;

const processSteps = [
  {key: "materials", icon: ClipboardCheck},
  {key: "formulation", icon: FlaskConical},
  {key: "production", icon: Factory},
  {key: "quality", icon: ShieldCheck},
  {key: "packaging", icon: PackageCheck},
] as const;

export default async function AboutPage({params}: PageProps<"/[locale]/about">) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("AboutPage");

  return (
    <main className="bg-white">
      <PageHero title={t("heroTitle")} eyebrow={t("heroEyebrow")} image="/avantika1.jpg" />
      <section className="section-space">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] bg-blue-50">
            <Image src="/about-logo.png" alt="Avantika" width={360} height={360} className="absolute left-1/2 top-1/2 z-10 w-72 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(41,72,200,0.14),transparent_34%),radial-gradient(circle_at_70%_70%,rgba(237,28,46,0.10),transparent_30%)]" />
          </div>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-red-500">{t("introEyebrow")}</p>
            <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.04em] text-[#080a4b] sm:text-5xl">{t("introTitle")}</h2>
            <div className="mt-6 space-y-5 text-base leading-8 text-slate-600">
              <p>{t("introP1")}</p>
              <p>{t("introP2")}</p>
              <p>{t("introP3")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f7fb] py-16 sm:py-24">
        <div className="container-shell grid gap-6 sm:grid-cols-3">
          {stats.map((key) => (
            <div key={key} className="rounded-3xl border border-white bg-white p-7 shadow-sm">
              <p className="text-4xl font-extrabold text-blue-800">{t(`stats.${key}.value`)}</p>
              <p className="mt-3 text-sm font-semibold leading-6 text-slate-500">{t(`stats.${key}.label`)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-[#080a4b] py-16 text-white sm:py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_20%,rgba(154,167,245,0.24),transparent_28%),radial-gradient(circle_at_84%_76%,rgba(237,28,46,0.18),transparent_28%)]" />
        <div className="absolute left-1/2 top-20 -z-10 h-72 w-[82%] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="container-shell">
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-blue-200">{t("process.eyebrow")}</p>
              <h2 className="mt-4 text-balance text-3xl font-extrabold tracking-[-0.04em] sm:text-5xl">{t("process.title")}</h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-blue-100/70 sm:text-base sm:leading-8">{t("process.description")}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {processSteps.slice(0, 3).map(({key, icon: Icon}, index) => (
                <article key={key} className="group relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/[0.07] p-5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/[0.11] sm:p-6">
                  <div className="absolute -right-8 -top-8 size-24 rounded-full bg-white/[0.05] transition group-hover:scale-125" />
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid size-12 place-items-center rounded-2xl bg-white text-blue-800"><Icon className="size-6" /></span>
                    <span className="font-mono text-xs font-bold text-white/30">0{index + 1}</span>
                  </div>
                  <h3 className="mt-8 text-lg font-extrabold">{t(`process.steps.${key}.title`)}</h3>
                  <p className="mt-3 text-sm leading-6 text-blue-100/62">{t(`process.steps.${key}.description`)}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_1fr_1.05fr]">
            {processSteps.slice(3).map(({key, icon: Icon}, index) => (
              <article key={key} className="group relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/[0.07] p-5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/[0.11] sm:p-6">
                <div className="absolute -right-8 -top-8 size-24 rounded-full bg-white/[0.05] transition group-hover:scale-125" />
                <div className="flex items-start justify-between gap-4">
                  <span className="grid size-12 place-items-center rounded-2xl bg-white text-blue-800"><Icon className="size-6" /></span>
                  <span className="font-mono text-xs font-bold text-white/30">0{index + 4}</span>
                </div>
                <h3 className="mt-8 text-lg font-extrabold">{t(`process.steps.${key}.title`)}</h3>
                <p className="mt-3 text-sm leading-6 text-blue-100/62">{t(`process.steps.${key}.description`)}</p>
              </article>
            ))}
            <div className="relative min-h-[260px] overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/[0.07] lg:min-h-0">
              <Image src="/2026-07-06 15.00.24.jpg" alt={t("process.title")} fill sizes="(max-width: 1024px) 100vw, 34vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05072f]/80 via-[#080a4b]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-blue-100/70">GMP</p>
                <p className="mt-2 text-xl font-extrabold">{t("process.mediaTitle")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell space-y-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-blue-700">{t("manufacturingEyebrow")}</p>
              <h2 className="mt-4 text-3xl font-extrabold text-slate-950 sm:text-5xl">{t("manufacturingTitle")}</h2>
              <p className="mt-5 text-base leading-8 text-slate-600">{t("manufacturingDescription")}</p>
            </div>
            <div className="relative min-h-[360px] overflow-hidden rounded-[2rem]">
              <Image src="/2026-07-06 15.00.21.jpg" alt={t("manufacturingEyebrow")} fill sizes="50vw" className="object-cover" />
            </div>
          </div>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] lg:order-first">
              <Image src="/2026-07-06 15.00.31.jpg" alt={t("qualityEyebrow")} fill sizes="50vw" className="object-cover" />
            </div>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-red-500">{t("qualityEyebrow")}</p>
              <h2 className="mt-4 text-3xl font-extrabold text-slate-950 sm:text-5xl">{t("qualityTitle")}</h2>
              <p className="mt-5 text-base leading-8 text-slate-600">{t("qualityDescription")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#080a4b] py-16 text-white sm:py-24">
        <div className="container-shell grid gap-5 md:grid-cols-3">
          {values.map(({key, icon: Icon}) => (
            <article key={key} className="rounded-3xl border border-white/10 bg-white/[0.06] p-7">
              <span className="grid size-13 place-items-center rounded-2xl bg-[#9aa7f5] text-[#080a4b]"><Icon className="size-6" /></span>
              <h3 className="mt-6 text-xl font-extrabold">{t(`values.${key}.title`)}</h3>
              <p className="mt-3 text-sm leading-7 text-blue-100/70">{t(`values.${key}.description`)}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
