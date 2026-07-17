import {Building2, Mail, MapPin, Phone} from "lucide-react";
import {getMessages, getTranslations} from "next-intl/server";

import {PharmacovigilanceForm} from "@/components/forms/pharmacovigilance-form";
import {PageHero} from "@/components/shared/page-hero";
import type {Locale} from "@/i18n/routing";

type Props = {
  params: Promise<{locale: Locale}>;
};

export async function generateMetadata({params}: Props) {
  const {locale} = await params;
  const messages = (await getMessages({locale})) as any;
  const t = messages.PharmacovigilancePage;

  return {
    title: `${t.heroTitle} | Avantika`,
    description: t.description,
  };
}

export default async function PharmacovigilancePage({params}: Props) {
  const {locale} = await params;
  const t = await getTranslations("PharmacovigilancePage");

  const contacts = [
    {
      icon: Building2,
      label: t("company"),
      value: t("companyValue"),
      href: undefined,
    },
    {
      icon: MapPin,
      label: t("address"),
      value: t("addressValue"),
      href: "https://maps.google.com",
    },
    {
      icon: Phone,
      label: `${t("phones")} (1)`,
      value: "(+99890) 990-18-38",
      href: "tel:+998909901838",
    },
    {
      icon: Phone,
      label: `${t("phones")} (2)`,
      value: "(+99895) 171-09-90",
      href: "tel:+998951710990",
    },
    {
      icon: Mail,
      label: t("email"),
      value: "konarkpharm@mail.ru",
      href: "mailto:konarkpharm@mail.ru",
    },
  ];

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
            
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 sm:gap-4">
              {contacts.map((contact, idx) => {
                const Icon = contact.icon;
                const isLink = !!contact.href;
                const Wrapper = isLink ? "a" : "div";
                const isPhone = contact.label.includes(t("phones"));

                return (
                  <Wrapper
                    key={idx}
                    href={contact.href}
                    {...(isLink ? {target: "_blank", rel: "noreferrer"} : {})}
                    className={`flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition duration-300 sm:rounded-2xl sm:p-4 md:p-5 md:gap-4 ${
                      isLink ? "hover:border-blue-200 hover:shadow-md cursor-pointer" : ""
                    } ${isPhone ? "col-span-1" : "col-span-2 lg:col-span-1"}`}
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-800 sm:size-11 sm:rounded-xl md:size-13 md:rounded-2xl">
                      <Icon className="size-4.5 sm:size-5 md:size-6" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400">{contact.label}</span>
                      <span className="mt-0.5 block text-[11px] sm:text-xs md:text-sm font-bold text-slate-950 break-words leading-tight">
                        {contact.value}
                      </span>
                    </span>
                  </Wrapper>
                );
              })}
            </div>
          </div>
          
          <PharmacovigilanceForm locale={locale} />
        </div>
      </section>
    </main>
  );
}
