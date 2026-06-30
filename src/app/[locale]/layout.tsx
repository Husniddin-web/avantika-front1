import type {Metadata} from "next";
import {hasLocale, NextIntlClientProvider} from "next-intl";
import {getMessages, getTranslations, setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";

import {SiteFooter} from "@/components/layout/site-footer";
import {SiteHeader} from "@/components/layout/site-header";
import {routing} from "@/i18n/routing";

import "flag-icons/css/flag-icons.min.css";
import "../globals.css";

type LocaleLayoutProps = LayoutProps<"/[locale]">;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({locale, namespace: "Metadata"});

  return {
    title: {
      default: t("title"),
      template: `%s | ${t("siteName")}`,
    },
    description: t("description"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className="h-full antialiased">
      <body className="min-h-full bg-white text-[#10172b]">
        <NextIntlClientProvider messages={messages}>
          <div className="flex min-h-screen flex-col">
            <SiteHeader locale={locale} />
            {children}
            <SiteFooter />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
