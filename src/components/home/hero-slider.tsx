"use client";

import Image from "next/image";
import {ArrowRight} from "lucide-react";
import {useTranslations} from "next-intl";
import {useEffect, useState} from "react";

import {Link} from "@/i18n/navigation";

const slides = [
  {key: "manufacturing", src: "/hero-slide-1.webp", position: "object-center"},
  {key: "global", src: "/hero-slide-4.webp", position: "object-center"},
  {key: "standards", src: "/hero-slide5.png", position: "object-center"},
] as const;

export function HeroSlider() {
  const t = useTranslations("Home.hero");
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  return (
    <section
      className="relative isolate min-h-[720px] overflow-hidden bg-[#75a5bc] lg:min-h-[100svh]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label={t("label")}
    >
      {slides.map((slide, index) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={index === activeSlide ? t(`slides.${slide.key}.imageAlt`) : ""}
          fill
          priority={index === 0}
          sizes="100vw"
          aria-hidden={index !== activeSlide}
          className={`-z-20 object-cover transition-opacity duration-1000 ease-out ${slide.position} ${
            index === activeSlide ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0a3354]/96 via-[#2d6f8d]/75 to-transparent lg:via-[#2d6f8d]/42" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#071d38]/45 via-transparent to-transparent" />

      <div className="container-shell flex min-h-[720px] items-center py-28 lg:min-h-[100svh]">
        <div className="max-w-[620px]">
          <div key={slides[activeSlide].key} className="hero-copy-enter">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-extrabold text-white backdrop-blur">
              <span className="size-2 rounded-full bg-white" />
              {t(`slides.${slides[activeSlide].key}.badge`)}
            </div>
            <h1 className="mt-5 max-w-[19ch] text-balance text-[2.15rem] font-extrabold leading-[1.08] tracking-[-0.045em] text-white sm:mt-7 sm:max-w-2xl sm:text-6xl sm:leading-[1.02] sm:tracking-[-0.055em] lg:text-[4.35rem]">
              {t(`slides.${slides[activeSlide].key}.title`)}
            </h1>
            <p className="mt-4 max-w-sm text-sm leading-6 text-blue-50/90 sm:mt-6 sm:max-w-lg sm:text-lg sm:leading-8">
              {t(`slides.${slides[activeSlide].key}.description`)}
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-blue-700 px-6 text-sm font-bold text-white shadow-lg shadow-blue-950/20 transition hover:-translate-y-0.5 hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {t("products")}<ArrowRight className="size-4" />
            </Link>
            <Link href="/" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 bg-white/10 px-6 text-sm font-bold text-white backdrop-blur transition hover:bg-white hover:text-blue-900">
              {t("partner")}
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/15 bg-[#071d38]/35 px-3 py-2 backdrop-blur-md">
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => setActiveSlide(index)}
            aria-label={`${t(`slides.${slide.key}.title`)} ${index + 1}`}
            aria-current={index === activeSlide ? "true" : undefined}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeSlide ? "w-8 bg-white" : "w-2 bg-white/45 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
