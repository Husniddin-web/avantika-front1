import {ExternalLink, Mail, MapPin, Phone, Send} from "lucide-react";
import {hasLocale} from "next-intl";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";

import {PageHero} from "@/components/shared/page-hero";
import {routing} from "@/i18n/routing";
import {InquiryForm} from "@/components/forms/inquiry-form";

const contacts = [
  {icon: Phone, key: "phone", value: "+998 93 388 88 72", href: "tel:+998933888872"},
  {icon: Phone, key: "phone2", value: "+998 93 502 12 37", href: "tel:+998935021237"},
  {icon: Mail, key: "email", value: "infomarketinguz@avantikamedex.com", href: "mailto:infomarketinguz@avantikamedex.com"},
  {icon: MapPin, key: "location", value: "address", href: "https://maps.google.com"},
] as const;
const mapsUrl = "https://www.google.com/maps?q=100047%20%D0%A2%D0%B0%D1%88%D0%BA%D0%B5%D0%BD%D1%82%2C%20%D0%AF%D1%88%D0%BD%D0%B0%D0%B1%D0%B0%D0%B4%D1%81%D0%BA%D0%B8%D0%B9%20%D1%80%D0%B0%D0%B9%D0%BE%D0%BD%2C%20%D0%9C%D0%B0%D1%88%D0%B8%D0%BD%D0%B0%D1%81%D0%BE%D0%B7%D0%BB%D0%B0%D1%80%20%D0%9C%D0%A4%D0%98%2C%20%D1%83%D0%BB.%D0%9B%D1%8F%D0%B4%D0%BE%D0%B2%D0%B0%201-%D1%82%D1%83%D0%BF%D0%B8%D0%BA%2C%20%D0%B4.9&output=embed";
const mapsLink = "https://www.google.com/maps/search/?api=1&query=100047%20%D0%A2%D0%B0%D1%88%D0%BA%D0%B5%D0%BD%D1%82%2C%20%D0%AF%D1%88%D0%BD%D0%B0%D0%B1%D0%B0%D0%B4%D1%81%D0%BA%D0%B8%D0%B9%20%D1%80%D0%B0%D0%B9%D0%BE%D0%BD%2C%20%D0%9C%D0%B0%D1%88%D0%B8%D0%BD%D0%B0%D1%81%D0%BE%D0%B7%D0%BB%D0%B0%D1%80%20%D0%9C%D0%A4%D0%98%2C%20%D1%83%D0%BB.%D0%9B%D1%8F%D0%B4%D0%BE%D0%B2%D0%B0%201-%D1%82%D1%83%D0%BF%D0%B8%D0%BA%2C%20%D0%B4.9";

export default async function ContactsPage({params}: PageProps<"/[locale]/contacts">) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("ContactPage");

  return (
    <main className="bg-white">
      <PageHero title={t("heroTitle")} eyebrow={t("heroEyebrow")} image="/contact-page.jpg" />
      <section className="section-space bg-[#f7faff]">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-blue-700">{t("eyebrow")}</p>
              <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.04em] text-slate-950 sm:text-5xl">{t("title")}</h2>
              <p className="mt-5 text-base leading-8 text-slate-600">{t("description")}</p>
            </div>
            <div className="grid gap-4">
              {contacts.map(({icon: Icon, key, value, href}) => (
                <a key={key} href={href} className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:border-blue-200 hover:shadow-md">
                  <span className="grid size-13 place-items-center rounded-2xl bg-blue-50 text-blue-800"><Icon className="size-6" /></span>
                  <span>
                    <span className="block text-xs font-extrabold uppercase tracking-[0.16em] text-slate-400">{t(`contacts.${key}`)}</span>
                    <span className="mt-1 block font-bold text-slate-950">{value === "address" ? t("address") : value}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
          <InquiryForm locale={locale} />
        </div>

        <div className="container-shell mt-16 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden rounded-[2.2rem] border border-slate-200 bg-white shadow-xl shadow-blue-950/5">
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

          <div className="overflow-hidden rounded-[2.2rem] border border-slate-200 bg-white shadow-xl shadow-blue-950/5 flex flex-col justify-between">
            <div
              className="min-h-[300px] bg-cover bg-center p-8 text-white flex-1 flex flex-col justify-end"
              style={{backgroundImage: "linear-gradient(135deg,rgba(8,10,75,0.92),rgba(41,72,200,0.76)),url('/hero-slide-4.webp')"}}
            >
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-blue-100">{t("officeEyebrow")}</p>
              <h3 className="mt-4 max-w-sm text-2xl font-extrabold">{t("officeTitle")}</h3>
              <p className="mt-4 text-sm leading-6 text-blue-100/75">{t("officeDescription")}</p>
            </div>
            <div className="p-6 bg-slate-50 border-t border-slate-100">
              <a href="mailto:infomarketinguz@avantikamedex.com" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 text-sm font-bold text-white hover:bg-blue-800">
                {t("sendEmail")} <Send className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
