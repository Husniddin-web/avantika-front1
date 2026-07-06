import {ExternalLink, Mail, MapPin, Phone, Send} from "lucide-react";
import {hasLocale} from "next-intl";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";

import {PageHero} from "@/components/shared/page-hero";
import {routing} from "@/i18n/routing";

const contacts = [
  {icon: Phone, key: "phone", value: "+998 90 123 45 67", href: "tel:+998901234567"},
  {icon: Mail, key: "email", value: "info@avantika.uz", href: "mailto:info@avantika.uz"},
  {icon: MapPin, key: "location", value: "address", href: "https://maps.google.com"},
] as const;
const mapsUrl = "https://www.google.com/maps?q=Tashkent,+Uzbekistan&output=embed";
const mapsLink = "https://www.google.com/maps/search/?api=1&query=Tashkent%2C%20Uzbekistan";

export default async function ContactsPage({params}: PageProps<"/[locale]/contacts">) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("ContactPage");

  return (
    <main className="bg-white">
      <PageHero title={t("heroTitle")} eyebrow={t("heroEyebrow")} image="/contact-page.jpg" />
      <section className="section-space bg-[#f7faff]">
        <div className="container-shell grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-blue-700">{t("eyebrow")}</p>
            <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.04em] text-slate-950 sm:text-5xl">{t("title")}</h2>
            <p className="mt-5 text-base leading-8 text-slate-600">{t("description")}</p>
            <div className="mt-8 grid gap-4">
              {contacts.map(({icon: Icon, key, value, href}) => (
                <a key={key} href={href} className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200">
                  <span className="grid size-13 place-items-center rounded-2xl bg-blue-50 text-blue-800"><Icon className="size-6" /></span>
                  <span>
                    <span className="block text-xs font-extrabold uppercase tracking-[0.16em] text-slate-400">{t(`contacts.${key}`)}</span>
                    <span className="mt-1 block font-bold text-slate-950">{value === "address" ? t("address") : value}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-blue-950/5">
            <div
              className="min-h-[320px] bg-cover bg-center p-8 text-white"
              style={{backgroundImage: "linear-gradient(135deg,rgba(8,10,75,0.92),rgba(41,72,200,0.76)),url('/hero-slide-4.webp')"}}
            >
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-blue-100">{t("officeEyebrow")}</p>
              <h3 className="mt-4 max-w-sm text-3xl font-extrabold">{t("officeTitle")}</h3>
              <p className="mt-4 max-w-md text-sm leading-7 text-blue-100/75">{t("officeDescription")}</p>
            </div>
            <div className="p-6">
              <a href="mailto:info@avantika.uz" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-blue-700 px-6 text-sm font-bold text-white hover:bg-blue-800">
                {t("sendEmail")} <Send className="size-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="container-shell mt-10">
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-blue-950/5">
            <div className="flex flex-col gap-4 border-b border-slate-100 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-blue-700">{t("mapEyebrow")}</p>
                <h2 className="mt-2 text-2xl font-extrabold text-slate-950">{t("mapTitle")}</h2>
                <p className="mt-2 text-sm text-slate-500">{t("address")}</p>
              </div>
              <a href={mapsLink} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-slate-200 px-5 text-sm font-bold text-slate-700 hover:border-blue-300 hover:text-blue-700">
                {t("openMap")} <ExternalLink className="size-4" />
              </a>
            </div>
            <iframe
              title="Avantika location map"
              src={mapsUrl}
              className="h-[360px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
