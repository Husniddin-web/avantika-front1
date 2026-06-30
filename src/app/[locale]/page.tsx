import {hasLocale} from "next-intl";
import {setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";

import {HomePageContent} from "@/components/home/home-page-content";
import {routing} from "@/i18n/routing";

type HomePageProps = PageProps<"/[locale]">;

export default async function HomePage({params}: HomePageProps) {
  const {locale} = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  return <HomePageContent />;
}
