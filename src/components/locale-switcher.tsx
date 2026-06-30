"use client";

import {ChevronDown} from "lucide-react";
import {useTranslations} from "next-intl";

import {Link, usePathname} from "@/i18n/navigation";
import {routing, type Locale} from "@/i18n/routing";

type LocaleSwitcherProps = {
  locale: Locale;
  inverse?: boolean;
};

const flagCodes: Record<Locale, string> = {
  uz: "uz",
  ru: "ru",
  en: "gb",
};

export function LocaleSwitcher({locale, inverse = false}: LocaleSwitcherProps) {
  const t = useTranslations("LocaleSwitcher");
  const pathname = usePathname();

  return (
    <details className="group relative">
      <summary
        aria-label={`${t("label")}: ${t(locale)}`}
        className={`flex cursor-pointer list-none items-center gap-2 rounded-full border px-3 py-2.5 text-xs font-bold transition [&::-webkit-details-marker]:hidden ${
          inverse
            ? "border-white/30 bg-white/10 text-white hover:bg-white/20"
            : "border-slate-200 bg-white text-slate-800 hover:border-blue-300 hover:text-blue-700"
        }`}
      >
        <span
          aria-hidden="true"
          className={`fi fi-${flagCodes[locale]} fis rounded-full shadow-sm ring-1 ring-slate-200`}
        />
        <span className="sr-only">{t(locale)}</span>
        <ChevronDown className="size-3.5 transition group-open:rotate-180" />
      </summary>
      <nav
        aria-label={t("label")}
        className="premium-shadow absolute right-0 top-[calc(100%+10px)] z-50 min-w-40 overflow-hidden rounded-2xl border border-slate-100 bg-white p-1.5"
      >
        {routing.locales.map((item) => (
          <Link
            key={item}
            href={pathname}
            locale={item}
            hrefLang={item}
            aria-current={item === locale ? "page" : undefined}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
              item === locale
                ? "bg-blue-50 text-blue-800"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
            }`}
          >
            <span
              aria-hidden="true"
              className={`fi fi-${flagCodes[item]} fis shrink-0 rounded-full shadow-sm ring-1 ring-slate-200`}
            />
            {t(item)}
          </Link>
        ))}
      </nav>
    </details>
  );
}
