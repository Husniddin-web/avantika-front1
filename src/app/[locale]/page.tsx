import {hasLocale} from "next-intl";
import {setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";

import {HomePageContent} from "@/components/home/home-page-content";
import {routing} from "@/i18n/routing";
import type {Locale} from "@/i18n/routing";
import {fetchPublicHomeData} from "@/lib/public-api";

type HomePageProps = PageProps<"/[locale]">;

export const dynamic = "force-dynamic";

export default async function HomePage({params}: HomePageProps) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const cmsData = await fetchPublicHomeData();
  return <HomePageContent cmsData={cmsData} locale={locale as Locale} />;
}
