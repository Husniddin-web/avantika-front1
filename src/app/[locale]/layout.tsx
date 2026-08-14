import type {Metadata} from "next";
import {Poppins} from "next/font/google";
import {hasLocale, NextIntlClientProvider} from "next-intl";
import {getMessages, getTranslations, setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";

import {SiteFooter} from "@/components/layout/site-footer";
import {SiteHeader} from "@/components/layout/site-header";
import {routing} from "@/i18n/routing";
import {ScrollProgressBar} from "@/components/ui/scroll-progress-bar";
import {BackToTop} from "@/components/ui/back-to-top";

import "flag-icons/css/flag-icons.min.css";
import "../globals.css";

type LocaleLayoutProps = LayoutProps<"/[locale]">;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://avantikamedex.com";

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

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

  const title = t("title");
  const description = t("description");
  const siteName = t("siteName");

  const alternates: Record<string, string> = {};
  for (const loc of routing.locales) {
    alternates[loc] = `${SITE_URL}/${loc}`;
  }

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | ${siteName}`,
    },
    description,
    keywords: [
      "Avantika", "Avantika Medex", "farmatsevtika", "pharmaceuticals",
      "dori", "препараты", "фармацевтика", "GMP", "Toshkent", "Узбекистан", "Uzbekistan",
    ],
    authors: [{name: "Avantika Medex Pvt. Ltd"}],
    creator: "Avantika Medex Pvt. Ltd",
    publisher: "Avantika Medex Pvt. Ltd",
    robots: {
      index: true,
      follow: true,
      googleBot: {index: true, follow: true, "max-image-preview": "large"},
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: alternates,
    },
    openGraph: {
      type: "website",
      locale,
      url: `${SITE_URL}/${locale}`,
      siteName,
      title,
      description,
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/og-image.png`],
    },
    icons: {
      icon: [
        {url: "/favicon-16x16.png", sizes: "16x16", type: "image/png"},
        {url: "/favicon-32x32.png", sizes: "32x32", type: "image/png"},
        {url: "/favicon.ico"},
      ],
      apple: [{url: "/apple-touch-icon.png", sizes: "180x180"}],
      other: [{rel: "manifest", url: "/site.webmanifest"}],
    },
  };
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Avantika Medex Pvt. Ltd",
  url: SITE_URL,
  logo: `${SITE_URL}/main-logo.png`,
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+998933888872",
      contactType: "customer service",
      availableLanguage: ["Uzbek", "Russian", "English"],
    },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Yashnabad tumani, Mashinasozlar MFI, ul.Lyadova 1-tupik, d.9",
    addressLocality: "Toshkent",
    postalCode: "100047",
    addressCountry: "UZ",
  },
  sameAs: ["https://www.instagram.com/avantikamedex.uzb"],
};

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
    <html lang={locale} className={`${poppins.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: JSON.stringify(organizationSchema)}}
        />
      </head>
      <body className="min-h-full bg-white text-[#10172b]">
        <NextIntlClientProvider messages={messages}>
          <ScrollProgressBar />
          <div className="flex min-h-screen flex-col">
            <SiteHeader locale={locale} />
            {children}
            <SiteFooter />
          </div>
          <BackToTop />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
