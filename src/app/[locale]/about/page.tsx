import Image from "next/image";
import {BadgeCheck, Globe2, Microscope} from "lucide-react";
import {hasLocale} from "next-intl";
import {setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";

import {PageHero} from "@/components/shared/page-hero";
import {routing} from "@/i18n/routing";

const stats = [
  {value: "15+", label: "Years of pharmaceutical expertise"},
  {value: "200+", label: "Products across therapeutic categories"},
  {value: "30+", label: "International markets and partners"},
];

const values = [
  {icon: BadgeCheck, title: "Quality first", description: "Every process is built around traceability, compliance and patient safety."},
  {icon: Microscope, title: "Science-led", description: "Research, laboratory control and evidence shape our product decisions."},
  {icon: Globe2, title: "Global mindset", description: "We build responsible partnerships across regional and international markets."},
];

export default async function AboutPage({params}: PageProps<"/[locale]/about">) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <main className="bg-white">
      <PageHero title="About us" eyebrow="Company profile" image="/about-hero.jpg" />
      <section className="section-space">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] bg-blue-50">
            <Image src="/about-logo.png" alt="Avantika" width={360} height={360} className="absolute left-1/2 top-1/2 z-10 w-72 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(41,72,200,0.14),transparent_34%),radial-gradient(circle_at_70%_70%,rgba(237,28,46,0.10),transparent_30%)]" />
          </div>
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-red-500">Who are we?</p>
            <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.04em] text-[#080a4b] sm:text-5xl">Responsible pharmaceutical growth</h2>
            <div className="mt-6 space-y-5 text-base leading-8 text-slate-600">
              <p>Avantika develops, manufactures and promotes pharmaceutical products with a strong focus on quality, accessibility and long-term trust.</p>
              <p>Our work connects production discipline, laboratory control and market partnerships into one reliable healthcare ecosystem.</p>
              <p>We support healthcare professionals, distributors and patients with clear product information and consistent operational standards.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f7fb] py-16 sm:py-24">
        <div className="container-shell grid gap-6 sm:grid-cols-3">
          {stats.map((item) => (
            <div key={item.label} className="rounded-3xl border border-white bg-white p-7 shadow-sm">
              <p className="text-4xl font-extrabold text-blue-800">{item.value}</p>
              <p className="mt-3 text-sm font-semibold leading-6 text-slate-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell space-y-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-blue-700">Manufacturing</p>
              <h2 className="mt-4 text-3xl font-extrabold text-slate-950 sm:text-5xl">Built around controlled processes</h2>
              <p className="mt-5 text-base leading-8 text-slate-600">Modern production infrastructure, trained specialists and documented workflows help maintain consistent quality from raw material to finished product.</p>
            </div>
            <div className="relative min-h-[360px] overflow-hidden rounded-[2rem]">
              <Image src="/hero-slide5.png" alt="Manufacturing" fill sizes="50vw" className="object-cover" />
            </div>
          </div>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="relative min-h-[360px] overflow-hidden rounded-[2rem] lg:order-first">
              <Image src="/rasm.png" alt="Laboratory" fill sizes="50vw" className="object-cover" />
            </div>
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-red-500">Quality</p>
              <h2 className="mt-4 text-3xl font-extrabold text-slate-950 sm:text-5xl">Evidence, control and responsibility</h2>
              <p className="mt-5 text-base leading-8 text-slate-600">Our quality culture brings together analytical testing, regulatory discipline and a practical commitment to safer everyday healthcare.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#080a4b] py-16 text-white sm:py-24">
        <div className="container-shell grid gap-5 md:grid-cols-3">
          {values.map(({icon: Icon, title, description}) => (
            <article key={title} className="rounded-3xl border border-white/10 bg-white/[0.06] p-7">
              <span className="grid size-13 place-items-center rounded-2xl bg-[#9aa7f5] text-[#080a4b]"><Icon className="size-6" /></span>
              <h3 className="mt-6 text-xl font-extrabold">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-blue-100/70">{description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
