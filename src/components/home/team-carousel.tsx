"use client";

import Image from "next/image";
import {ChevronLeft, ChevronRight, ArrowRight} from "lucide-react";
import {useCallback, useEffect, useRef, useState} from "react";
import {useTranslations} from "next-intl";

import {Link} from "@/i18n/navigation";
import {teamMembers} from "@/data/team";
import type {Locale} from "@/i18n/routing";
import {imageSrc} from "@/lib/image-src";
import {localize} from "@/lib/localized";
import type {Worker} from "@/lib/admin/api";

/* ─── Position helpers ───────────────────────── */
function wrappedOffset(index: number, active: number, total: number): number {
  let off = index - active;
  if (off > total / 2)  off -= total;
  if (off < -total / 2) off += total;
  return off;
}

interface SlotStyle {
  translateX: number;
  translateY: number;
  rotate: number;
  scale: number;
  opacity: number;
  zIndex: number;
  brightness: number;
  pointerEvents: "auto" | "none";
}

function slotStyle(offset: number): SlotStyle {
  switch (offset) {
    case  0: return { translateX:   0, translateY:  0, rotate:  0, scale: 1,    opacity: 1,   zIndex: 30, brightness: 1,    pointerEvents: "auto" };
    case -1: return { translateX: -76, translateY: 12, rotate: -8, scale: 0.84, opacity: 1,   zIndex: 20, brightness: 0.68, pointerEvents: "auto" };
    case  1: return { translateX:  76, translateY: 12, rotate:  8, scale: 0.84, opacity: 1,   zIndex: 20, brightness: 0.68, pointerEvents: "auto" };
    case -2: return { translateX:-140, translateY: 26, rotate:-16, scale: 0.65, opacity: 0,   zIndex: 10, brightness: 0.4,  pointerEvents: "none" };
    case  2: return { translateX: 140, translateY: 26, rotate: 16, scale: 0.65, opacity: 0,   zIndex: 10, brightness: 0.4,  pointerEvents: "none" };
    default: return { translateX: offset < 0 ? -190 : 190, translateY: 40, rotate: offset < 0 ? -22 : 22, scale: 0.5, opacity: 0, zIndex: 0, brightness: 0.3, pointerEvents: "none" };
  }
}

/* ─── Component ──────────────────────────────── */
export function TeamCarousel({workers = [], locale}: {workers?: Worker[]; locale: Locale}) {
  const t = useTranslations("Home.team");

  const allMembers = workers.length
    ? workers.map((w) => ({
        key: w.id,
        name: localize(w.fullName, locale),
        role: localize(w.role, locale),
        image: imageSrc(w.image?.url, "/worker-man.png"),
        position: "object-top",
      }))
    : teamMembers.map((m) => ({
        key: m.key,
        name: t(`members.${m.key}.name`),
        role: t(`members.${m.key}.role`),
        image: m.image,
        position: "object-top",
      }));

  const total = allMembers.length;
  const [active, setActive] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = useCallback((dir: 1 | -1) => {
    if (isAnimating || total < 2) return;
    setIsAnimating(true);
    setActive((a) => (a + dir + total) % total);
    timerRef.current = setTimeout(() => setIsAnimating(false), 650);
  }, [isAnimating, total]);

  const prev = useCallback(() => go(-1), [go]);
  const next = useCallback(() => go(1),  [go]);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [prev, next]);

  const activeMember = allMembers[active];

  return (
    <section
      className="relative isolate overflow-hidden py-20 sm:py-28"
      style={{backgroundImage: "url('/worker-bg.jpeg')", backgroundSize: "cover", backgroundPosition: "center"}}
    >
      {/* Overlay */}
      <div className="absolute inset-0 -z-10 bg-white/55 backdrop-blur-[2px]" />

      <div className="container-shell relative select-none">

        {/* ── Heading ── */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-blue-700">
            {t("eyebrow")}
          </p>
          <h2 className="mt-4 text-balance text-3xl font-extrabold uppercase tracking-tight text-[#0a1833] sm:text-[2.6rem] sm:leading-[1.1]">
            {t("title")}
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
            {t("description")}
          </p>
        </div>

        {/* ── Slider Stage ── */}
        {total > 0 && (
          <div className="relative mt-16 sm:mt-20">

            {/* Nav arrows */}
            <button
              type="button" onClick={prev} disabled={isAnimating || total < 2}
              className="absolute left-0 sm:-left-5 top-[38%] z-40 -translate-y-1/2 grid size-11 place-items-center rounded-full border border-slate-300 bg-white shadow-lg text-slate-700 transition hover:bg-slate-50 hover:scale-110 disabled:opacity-40"
              aria-label="Oldingi"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button" onClick={next} disabled={isAnimating || total < 2}
              className="absolute right-0 sm:-right-5 top-[38%] z-40 -translate-y-1/2 grid size-11 place-items-center rounded-full border border-slate-300 bg-white shadow-lg text-slate-700 transition hover:bg-slate-50 hover:scale-110 disabled:opacity-40"
              aria-label="Keyingi"
            >
              <ChevronRight className="size-5" />
            </button>

            {/* Cards stage */}
            <div
              className="relative mx-auto"
              style={{
                height: "clamp(300px, 55vw, 520px)",
                maxWidth: 860,
                perspective: "1400px",
                perspectiveOrigin: "50% 30%",
              }}
            >
              {allMembers.map((member, i) => {
                const offset = wrappedOffset(i, active, total);
                const s = slotStyle(offset);
                const isCenter = offset === 0;

                return (
                  <div
                    key={member.key}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{zIndex: s.zIndex, pointerEvents: s.pointerEvents}}
                  >
                    <div
                      onClick={() => {
                        if (isAnimating) return;
                        if (offset === -1) { prev(); return; }
                        if (offset ===  1) { next(); return; }
                      }}
                      style={{
                        width: "clamp(180px, 34vw, 360px)",
                        aspectRatio: "3/4",
                        transform: `translateX(${s.translateX}%) translateY(${s.translateY}px) rotate(${s.rotate}deg) scale(${s.scale})`,
                        opacity: s.opacity,
                        filter: `brightness(${s.brightness})`,
                        cursor: isCenter ? "default" : "pointer",
                        transition: [
                          "transform 620ms cubic-bezier(0.22, 1, 0.36, 1)",
                          "opacity 420ms cubic-bezier(0.22, 1, 0.36, 1)",
                          "filter 420ms ease",
                          "box-shadow 420ms ease",
                        ].join(", "),
                        boxShadow: isCenter
                          ? "0 40px 90px -16px rgba(0,0,0,0.30), 0 8px 24px -4px rgba(0,0,0,0.10)"
                          : "0 12px 40px -8px rgba(0,0,0,0.16)",
                        borderRadius: 18,
                        overflow: "hidden",
                        position: "relative",
                        background: "#e2e8f0",
                      }}
                    >
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="(max-width: 640px) 80vw, 36vw"
                        className={`object-cover ${member.position}`}
                        priority={i === 0}
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

                      {/* Name / role — only on center card */}
                      {isCenter && (
                        <div className="absolute inset-x-0 bottom-0 px-5 pb-6 pt-12">
                          <h3 className="text-xl font-extrabold leading-tight text-white drop-shadow-md sm:text-2xl">
                            {member.name}
                          </h3>
                          <p className="mt-1 text-xs font-semibold text-white/75 drop-shadow-md">
                            {member.role}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dots */}
            <div className="mt-8 flex items-center justify-center gap-2">
              {allMembers.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    if (isAnimating || i === active) return;
                    setIsAnimating(true);
                    setActive(i);
                    timerRef.current = setTimeout(() => setIsAnimating(false), 650);
                  }}
                  className={`rounded-full transition-all duration-500 ${
                    i === active
                      ? "w-7 h-2.5 bg-[#0a1833]"
                      : "size-2.5 bg-slate-400 hover:bg-slate-600"
                  }`}
                  aria-label={`${i + 1}-a'zo`}
                />
              ))}
            </div>

            {/* Active member label */}
            <div className="mt-5 text-center">
              <p className="text-base font-extrabold text-[#0a1833]">{activeMember.name}</p>
              <p className="mt-0.5 text-xs font-semibold text-slate-500">{activeMember.role}</p>
            </div>
          </div>
        )}

        {/* "Barchani ko'rish" tugmasi */}
        {allMembers.length > 5 && (
          <div className="mt-14 text-center">
            <Link
              href="/about"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#0a1833] px-8 text-sm font-bold text-white shadow-lg shadow-[#0a1833]/20 transition hover:-translate-y-0.5 hover:bg-blue-800 focus-visible:outline-blue-700"
            >
              {locale === "uz"
                ? "Barcha jamoa a'zolarini ko'rish"
                : locale === "ru"
                ? "Смотреть всю команду"
                : "View all team members"}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
