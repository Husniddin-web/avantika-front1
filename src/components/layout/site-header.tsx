"use client";

import Image from "next/image";
import {Mail, Menu, Phone, Search, X} from "lucide-react";
import {useTranslations} from "next-intl";
import {useEffect, useState} from "react";

import {Link, usePathname} from "@/i18n/navigation";
import {routing, type Locale} from "@/i18n/routing";

import {LocaleSwitcher} from "../locale-switcher";
import {SearchModal} from "./search-modal";

const flagCodes: Record<Locale, string> = {
  uz: "uz",
  ru: "ru",
  en: "gb",
};

const navItems = ["home", "products", "news", "about", "contacts", "pharmacovigilance"] as const;

const hrefs = {
  home: "/",
  products: "/products",
  news: "/news",
  about: "/about",
  contacts: "/contacts",
  pharmacovigilance: "/pharmacovigilance",
} as const;

export function SiteHeader({locale}: {locale: Locale}) {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
            <a href="tel:+998933888872" className="inline-flex items-center gap-2 transition hover:text-white">
              <Phone className="size-3.5" />
              +998 93 388 88 72
            </a>
            <a href="mailto:infomarketinguz@avantikamedex.com" className="hidden items-center gap-2 transition hover:text-white sm:inline-flex">
              <Mail className="size-3.5" />
              infomarketinguz@avantikamedex.com
            </a>
          </div>
          <span className="hidden text-blue-200/70 md:inline">{t("topbar")}</span>
        </div>
      </div>

      <div className="container-shell flex h-[72px] items-center justify-between gap-6">
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="Avantika">
          <Image
            src="/main-logo.png"
            alt="Avantika Pharmaceuticals"
            width={250}
            height={250}
            priority
            className="h-11 w-auto object-contain sm:h-14"
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label={t("label")}>
          {navItems.map((item) => (
            <Link
              key={item}
              href={hrefs[item]}
              className={`relative text-[15px] font-semibold transition after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:rounded-full after:transition-all ${isActiveNav(pathname, hrefs[item]) ? "after:w-full" : "after:w-0"} ${isTransparent ? (isActiveNav(pathname, hrefs[item]) ? "text-white after:bg-white" : "text-white/85 hover:text-white after:bg-white") : (isActiveNav(pathname, hrefs[item]) ? "text-blue-700 after:bg-blue-700" : "text-slate-600 hover:text-blue-700 after:bg-blue-700")}`}
            >
              {t(item)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={t("search")}
            onClick={() => setSearchOpen(true)}
            className={`grid size-10 place-items-center rounded-full transition ${isTransparent ? "text-white hover:bg-white/10" : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"}`}
          >
            <Search className="size-5" />
          </button>
          <div className="hidden lg:block">
            <LocaleSwitcher locale={locale} inverse={isTransparent} />
          </div>
          <details open={mobileMenuOpen} className="group lg:hidden">
            <summary
              onClick={(event) => {
                event.preventDefault();
                setMobileMenuOpen((open) => !open);
              }}
              className={`grid size-10 cursor-pointer list-none place-items-center rounded-full border [&::-webkit-details-marker]:hidden ${isTransparent ? "border-white/30 text-white" : "border-slate-200"}`}
            >
              <Menu className="size-5 group-open:hidden" />
              <X className="hidden size-5 group-open:block" />
              <span className="sr-only">{t("menu")}</span>
            </summary>
            <nav className="premium-shadow absolute inset-x-4 top-[116px] rounded-3xl border border-slate-100 bg-white p-3">
              {navItems.map((item) => (
                <Link key={item} href={hrefs[item]} onClick={() => setMobileMenuOpen(false)} className={`block rounded-2xl px-4 py-3 text-[15px] font-bold ${isActiveNav(pathname, hrefs[item]) ? "bg-blue-50 text-blue-800" : "text-slate-700 hover:bg-blue-50 hover:text-blue-800"}`}>
                  {t(item)}
                </Link>
              ))}

              <div className="mt-2 flex items-center justify-between border-t border-slate-100 px-4 pt-4">
                <span className="text-xs font-bold text-slate-400">Til / Язык / Language</span>
                <div className="flex gap-1.5">
                  {routing.locales.map((item) => (
                    <Link
                      key={item}
                      href={pathname}
                      locale={item}
                      hrefLang={item}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs font-bold transition ${
                        item === locale
                          ? "border-blue-200 bg-blue-50 text-blue-800"
                          : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <span className={`fi fi-${flagCodes[item]} fis rounded-full shadow-sm ring-1 ring-slate-100 size-3.5`} />
                      {item.toUpperCase()}
                    </Link>
                  ))}
                </div>
              </div>

              <a href="mailto:infomarketinguz@avantikamedex.com" className="mt-2 flex items-center gap-2 border-t border-slate-100 px-4 pt-4 text-xs text-slate-500 sm:hidden">
                <Mail className="size-3.5" /> infomarketinguz@avantikamedex.com
              </a>
            </nav>
          </details>
        </div>
      </div>
      <SearchModal open={searchOpen} locale={locale} onClose={() => setSearchOpen(false)} />
    </header>
  );
}

function isActiveNav(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
