"use client";

import Image from "next/image";
import {Mail, Menu, Phone, Search, X} from "lucide-react";
import {useTranslations} from "next-intl";
import {useEffect, useState} from "react";

import {Link, usePathname} from "@/i18n/navigation";
import type {Locale} from "@/i18n/routing";

import {LocaleSwitcher} from "../locale-switcher";

const navItems = ["home", "products", "news", "about", "contacts"] as const;

const hrefs = {
  home: "/",
  products: "/",
  news: "/",
  about: "/",
  contacts: "/",
} as const;

export function SiteHeader({locale}: {locale: Locale}) {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const isTransparent = isHome && !isScrolled;

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 32);
    updateHeader();
    window.addEventListener("scroll", updateHeader, {passive: true});
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  return (
    <header className={`${isHome ? "fixed inset-x-0 top-0" : "sticky top-0"} z-40 transition-all duration-300 ${
      isTransparent
        ? "bg-[#06132f]/32 text-white"
        : "bg-white text-slate-900 shadow-sm"
    }`}>
      <div
        aria-hidden={isHome && !isScrolled}
        inert={isHome && !isScrolled ? true : undefined}
        className={`overflow-hidden text-white transition-all duration-300 ${
          isHome && !isScrolled ? "max-h-0 opacity-0" : "max-h-9 opacity-100"
        } ${isTransparent ? "bg-transparent" : "bg-[#080a4b]"}`}
      >
        <div className="container-shell flex h-9 items-center justify-between text-[11px] font-medium text-blue-100/85 sm:text-xs">
          <div className="flex items-center gap-5">
            <a href="tel:+998901234567" className="inline-flex items-center gap-2 transition hover:text-white">
              <Phone className="size-3.5" />
              +998 90 123 45 67
            </a>
            <a href="mailto:info@avantika.uz" className="hidden items-center gap-2 transition hover:text-white sm:inline-flex">
              <Mail className="size-3.5" />
              info@avantika.uz
            </a>
          </div>
          <span className="hidden text-blue-200/70 md:inline">{t("topbar")}</span>
        </div>
      </div>

      <div className="container-shell flex h-[72px] items-center justify-between gap-6">
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="Avantika">
          <Image
            src="/logo.webp"
            alt="Avantika Pharmaceuticals"
            width={250}
            height={78}
            priority
            className="h-11 w-auto object-contain sm:h-14"
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label={t("label")}>
          {navItems.map((item) => (
            <Link
              key={item}
              href={hrefs[item]}
              className={`text-sm font-semibold transition ${isTransparent ? "text-white/85 hover:text-white" : "text-slate-600 hover:text-blue-700"}`}
            >
              {t(item)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={t("search")}
            className={`grid size-10 place-items-center rounded-full transition ${isTransparent ? "text-white hover:bg-white/10" : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"}`}
          >
            <Search className="size-5" />
          </button>
          <LocaleSwitcher locale={locale} inverse={isTransparent} />
          <details className="group lg:hidden">
            <summary className={`grid size-10 cursor-pointer list-none place-items-center rounded-full border [&::-webkit-details-marker]:hidden ${isTransparent ? "border-white/30 text-white" : "border-slate-200"}`}>
              <Menu className="size-5 group-open:hidden" />
              <X className="hidden size-5 group-open:block" />
              <span className="sr-only">{t("menu")}</span>
            </summary>
            <nav className="premium-shadow absolute inset-x-4 top-[116px] rounded-3xl border border-slate-100 bg-white p-3">
              {navItems.map((item) => (
                <Link key={item} href={hrefs[item]} className="block rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-800">
                  {t(item)}
                </Link>
              ))}
              <a href="mailto:info@avantika.uz" className="mt-2 flex items-center gap-2 border-t border-slate-100 px-4 pt-4 text-xs text-slate-500 sm:hidden">
                <Mail className="size-3.5" /> info@avantika.uz
              </a>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
