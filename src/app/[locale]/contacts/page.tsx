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
        <div className="container-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5">
            <div>
              <p className="text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.22em] text-blue-700">{t("eyebrow")}</p>
              <h2 className="mt-3 text-3xl font-extrabold leading-[1.1] tracking-[-0.04em] text-slate-950 sm:text-5xl">{t("title")}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">{t("description")}</p>
            </div>
            <div className="grid gap-3 grid-cols-2 lg:grid-cols-1 sm:gap-4">
              {contacts.map(({icon: Icon, key, value, href}) => {
                const isPhone = key === "phone" || key === "phone2";
                return (
                  <a
                    key={key}
                    href={href}
                    className={`flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition duration-300 hover:border-blue-200 hover:shadow-md sm:rounded-2xl sm:p-4 md:p-5 md:gap-4 ${
                      isPhone ? "col-span-1" : "col-span-2 lg:col-span-1"
                    }`}
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-800 sm:size-11 sm:rounded-xl md:size-13 md:rounded-2xl"><Icon className="size-4.5 sm:size-5 md:size-6" /></span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[9px] sm:text-xs font-extrabold uppercase tracking-[0.16em] text-slate-400">{t(`contacts.${key}`)}</span>
                      <span className="mt-0.5 block text-xs sm:text-sm md:text-base font-bold text-slate-950 break-words leading-tight">{value === "address" ? t("address") : value}</span>
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
          <InquiryForm locale={locale} />
        </div>

        <div className="container-shell mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] sm:mt-16 sm:gap-8">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-blue-950/5 sm:rounded-[2.2rem] h-[320px] sm:h-[450px]">
            <iframe
              title="Avantika location map"
              src={mapsUrl}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-blue-950/5 flex flex-col justify-between sm:rounded-[2.2rem]">
            <div
              className="min-h-[250px] bg-cover bg-center p-6 text-white flex-1 flex flex-col justify-end sm:min-h-[300px] sm:p-8"
              style={{backgroundImage: "linear-gradient(135deg,rgba(8,10,75,0.92),rgba(41,72,200,0.76)),url('/hero-slide-4.webp')"}}
            >
              <p className="text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.22em] text-blue-100">{t("officeEyebrow")}</p>
              <h3 className="mt-3 max-w-sm text-xl font-extrabold sm:text-2xl">{t("officeTitle")}</h3>
              <p className="mt-3 text-xs leading-5 text-blue-100/75 sm:text-sm sm:leading-6">{t("officeDescription")}</p>
            </div>
            <div className="p-5 bg-slate-50 border-t border-slate-100 sm:p-6">
              <a href="mailto:infomarketinguz@avantikamedex.com" className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 text-sm font-bold text-white hover:bg-blue-800 sm:min-h-12">
                {t("sendEmail")} <Send className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
