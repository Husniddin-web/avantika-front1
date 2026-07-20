"use client";

import Image from "next/image";
import {ArrowRight, Search} from "lucide-react";
import {useEffect, useRef, useState} from "react";
import {useTranslations} from "next-intl";

import {Link} from "@/i18n/navigation";
import type {Locale} from "@/i18n/routing";
import type {Category, Product} from "@/lib/admin/api";
import {imageSrc} from "@/lib/image-src";
import {localize} from "@/lib/localized";

type ProductsCatalogProps = {
  products: Product[];
  categories: Category[];
  locale: Locale;
};

export function ProductsCatalog({products, categories, locale}: ProductsCatalogProps) {
  const t = useTranslations("ProductsPage");
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(12);
  const observerTarget = useRef<HTMLDivElement>(null);

  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragged, setDragged] = useState(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDown(true);
    setDragged(false);
    setStartX(e.pageX - e.currentTarget.offsetLeft);
    setScrollLeft(e.currentTarget.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDown) return;
    const x = e.pageX - e.currentTarget.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(x - startX) > 5) {
      setDragged(true);
    }
    e.currentTarget.scrollLeft = scrollLeft - walk;
  };

  const handleCategoryClick = (id: string, e: React.MouseEvent) => {
    if (dragged) {
      e.preventDefault();
      return;
    }
    setSelectedCategory(id);
    setVisibleCount(12);
  };

  const handleQueryChange = (val: string) => {
    setQuery(val);
    setVisibleCount(12);
  };

  const normalizedQuery = query.trim().toLowerCase();
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || 
      (product.categoryIds && product.categoryIds.includes(selectedCategory)) ||
      product.categoryId === selectedCategory;
    const haystack = [
      localize(product.title, locale),
      localize(product.category?.title, locale),
      localize(product.dosageForm, locale),
      stripHtml(localize(product.therapeuticIndication, locale)),
    ].join(" ").toLowerCase();

    return matchesCategory && (!normalizedQuery || haystack.includes(normalizedQuery));
  });

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  useEffect(() => {
    const target = observerTarget.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => prev + 12);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [filteredProducts.length]);

  return (
    <div className="container-shell">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-blue-700">{t("eyebrow")}</p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.035em] text-slate-950 sm:text-5xl">{t("title")}</h2>
          <p className="mt-4 text-base leading-7 text-slate-600">{t("description")}</p>
        </div>
        <label className="flex min-h-12 w-full items-center gap-3 rounded-full border border-slate-200 bg-white px-5 shadow-sm lg:max-w-sm">
          <Search className="size-5 shrink-0 text-slate-400" />
          <input
            value={query}
            onChange={(event) => handleQueryChange(event.target.value)}
            placeholder={t("searchPlaceholder")}
            className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-slate-950 outline-none placeholder:text-slate-400"
          />
        </label>
      </div>

      {categories.length ? (
        <div 
          className="mt-8 flex overflow-x-auto select-none cursor-grab active:cursor-grabbing scrollbar-none gap-3 py-2 scroll-smooth"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <button
            type="button"
            onClick={(e) => handleCategoryClick("all", e)}
            className={`shrink-0 rounded-full border px-5 py-2 text-sm font-bold transition ${selectedCategory === "all" ? "border-blue-700 bg-blue-700 text-white" : "border-blue-100 bg-blue-50 text-blue-800 hover:border-blue-300"}`}
          >
            {t("allCategories")}
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={(e) => handleCategoryClick(category.id, e)}
              className={`shrink-0 rounded-full border px-5 py-2 text-sm font-bold transition ${selectedCategory === category.id ? "border-blue-700 bg-blue-700 text-white" : "border-blue-100 bg-blue-50 text-blue-800 hover:border-blue-300"}`}
            >
              {localize(category.title, locale)}
            </button>
          ))}
        </div>
      ) : null}

      <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
        {visibleProducts.length ? visibleProducts.map((product) => (
          <article key={product.id} className="overflow-hidden rounded-[1.25rem] border border-slate-200 bg-white shadow-sm shadow-blue-950/[0.04] sm:rounded-3xl">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#f6f8fc]">
              <Image src={imageSrc(product.images[0]?.url, "/d1.jpeg")} alt={localize(product.title, locale)} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" unoptimized />
            </div>
            <div className="p-3 sm:p-6">
              <p className="line-clamp-1 text-[8px] font-extrabold uppercase tracking-[0.12em] text-blue-700 sm:text-[10px] sm:tracking-[0.18em]">
                {product.categories && product.categories.length > 0 
                  ? product.categories.map(c => localize(c.title, locale)).join(", ") 
                  : (localize(product.category?.title, locale) || product.slug)}
              </p>
              <h3 className="mt-2 line-clamp-2 text-base font-extrabold leading-5 text-slate-950 sm:text-2xl sm:leading-8">{localize(product.title, locale)}</h3>
              <p className="mt-2 line-clamp-1 text-xs font-semibold text-slate-500 sm:text-sm">{localize(product.dosageForm, locale)}</p>
              <Link href={`/products/${product.id}`} className="mt-4 inline-flex items-center gap-1.5 text-xs font-extrabold text-blue-700 sm:mt-5 sm:gap-2 sm:text-sm">{t("details")} <ArrowRight className="size-3.5 sm:size-4" /></Link>
            </div>
          </article>
        )) : (
          <p className="col-span-full rounded-3xl border border-slate-200 bg-white p-10 text-center text-sm font-bold text-slate-400">{t("empty")}</p>
        )}
      </div>

      {visibleCount < filteredProducts.length ? (
        <div ref={observerTarget} className="my-8 flex h-12 w-full items-center justify-center">
          <div className="size-6 animate-spin rounded-full border-2 border-blue-700 border-t-transparent" />
        </div>
      ) : null}
    </div>
  );
}

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
