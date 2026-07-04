"use client";

import Image from "next/image";
import {Search, X} from "lucide-react";
import {useEffect, useState} from "react";

import {Link} from "@/i18n/navigation";
import type {Locale} from "@/i18n/routing";
import type {Product} from "@/lib/admin/api";
import {imageSrc} from "@/lib/image-src";
import {localize} from "@/lib/localized";
import {fetchPublicProducts} from "@/lib/public-api";

export function SearchModal({open, locale, onClose}: {open: boolean; locale: Locale; onClose: () => void}) {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!open) return;
    void fetchPublicProducts().then(setProducts);
  }, [open]);

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

  return (
    <div className="fixed inset-0 z-[80] bg-slate-950/50 p-4 backdrop-blur-sm">
      <div className="mx-auto mt-24 w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-950/25">
        <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
          <Search className="size-5 text-slate-400" />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products..."
            className="h-10 min-w-0 flex-1 bg-transparent text-base font-semibold text-slate-950 outline-none placeholder:text-slate-400"
          />
          <button type="button" onClick={onClose} className="grid size-10 place-items-center rounded-full text-slate-500 hover:bg-slate-100" aria-label="Close search">
            <X className="size-5" />
          </button>
        </div>
        <div className="max-h-[480px] overflow-y-auto p-3">
          {results.length ? results.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`} onClick={onClose} className="flex items-center gap-4 rounded-2xl p-3 transition hover:bg-blue-50">
              <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                <Image src={imageSrc(product.images[0]?.url, "/d1.jpeg")} alt="" fill sizes="64px" className="object-cover" unoptimized />
              </div>
              <div className="min-w-0">
                <h3 className="line-clamp-1 font-extrabold text-slate-950">{localize(product.title, locale)}</h3>
                <p className="mt-1 line-clamp-1 text-sm text-slate-500">{localize(product.category?.title, locale)} · {localize(product.dosageForm, locale)}</p>
              </div>
            </Link>
          )) : (
            <p className="px-4 py-10 text-center text-sm font-semibold text-slate-400">No products found</p>
          )}
        </div>
      </div>
    </div>
  );
}
