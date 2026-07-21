"use client";

import Image from "next/image";
import {Search, X, ArrowRight, Command} from "lucide-react";
import {useEffect, useRef, useState} from "react";

import {Link} from "@/i18n/navigation";
import type {Locale} from "@/i18n/routing";
import type {Product} from "@/lib/admin/api";
import {imageSrc} from "@/lib/image-src";
import {localize} from "@/lib/localized";
import {fetchPublicProducts} from "@/lib/public-api";

export function SearchModal({open, locale, onClose}: {open: boolean; locale: Locale; onClose: () => void}) {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) {
      setMounted(false);
      return;
    }
    void fetchPublicProducts().then(setProducts);
    // Animate in
    requestAnimationFrame(() => setMounted(true));
    // Auto-focus after animation
    const t = setTimeout(() => inputRef.current?.focus(), 80);
    return () => clearTimeout(t);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const normalizedQuery = query.trim().toLowerCase();
  const results = products
    .filter((product) => {
      const haystack = [
        localize(product.title, locale),
        localize(product.dosageForm, locale),
        localize(product.category?.title, locale),
      ].join(" ").toLowerCase();
      return !normalizedQuery || haystack.includes(normalizedQuery);
    })
    .slice(0, 8);

  const placeholder =
    locale === "uz" ? "Preparat nomini kiriting..." :
    locale === "ru" ? "Введите название препарата..." :
    "Search by product name...";

  const emptyText =
    locale === "uz" ? "Preparat topilmadi" :
    locale === "ru" ? "Препарат не найден" :
    "No products found";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      className={`fixed inset-0 z-[80] flex items-start justify-center px-4 pt-20 sm:pt-28 transition-all duration-300 ${
        mounted ? "bg-slate-950/55 backdrop-blur-sm" : "bg-transparent"
      }`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className={`w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-950/30 ring-1 ring-slate-200/80 transition-all duration-300 ${
          mounted ? "translate-y-0 opacity-100 scale-100" : "-translate-y-4 opacity-0 scale-95"
        }`}
      >
        {/* Input row */}
        <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
          <Search className="size-5 shrink-0 text-blue-500" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="h-10 min-w-0 flex-1 bg-transparent text-base font-semibold text-slate-950 outline-none placeholder:text-slate-400"
          />
          <div className="hidden items-center gap-1 sm:flex">
            <kbd className="flex h-6 items-center gap-0.5 rounded border border-slate-200 bg-slate-50 px-1.5 text-[10px] font-bold text-slate-400">
              <Command className="size-3" />
            </kbd>
            <span className="text-[10px] text-slate-400 font-semibold">ESC</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid size-9 shrink-0 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[460px] overflow-y-auto p-2">
          {results.length > 0 ? (
            <>
              {/* Count badge */}
              <p className="px-3 pb-2 pt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                {results.length} {locale === "uz" ? "ta natija" : locale === "ru" ? "результатов" : "results"}
              </p>
              {results.map((product, idx) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  onClick={onClose}
                  className="group flex items-center gap-4 rounded-2xl p-3 transition-all duration-200 hover:bg-blue-50"
                  style={{animationDelay: `${idx * 40}ms`}}
                >
                  <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-slate-100 ring-1 ring-slate-200/60 transition group-hover:ring-blue-200">
                    <Image
                      src={imageSrc(product.images[0]?.url, "/d1.jpeg")}
                      alt=""
                      fill
                      sizes="56px"
                      className="object-cover transition duration-300 group-hover:scale-105"
                      unoptimized
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="line-clamp-1 font-extrabold text-slate-900 transition group-hover:text-blue-700">
                      {localize(product.title, locale)}
                    </h3>
                    <p className="mt-0.5 line-clamp-1 text-sm text-slate-500">
                      {localize(product.category?.title, locale)} · {localize(product.dosageForm, locale)}
                    </p>
                  </div>
                  <ArrowRight className="size-4 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-blue-500" />
                </Link>
              ))}
            </>
          ) : (
            <div className="flex flex-col items-center gap-3 py-12">
              <div className="grid size-14 place-items-center rounded-full bg-slate-100">
                <Search className="size-6 text-slate-400" />
              </div>
              <p className="text-sm font-semibold text-slate-400">{emptyText}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
