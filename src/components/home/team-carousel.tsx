"use client";

import Image from "next/image";
import {ArrowLeft, ArrowRight, UserRoundCheck} from "lucide-react";
import {useTranslations} from "next-intl";
import {useEffect, useState} from "react";

import {teamMembers} from "@/data/team";

type Position = "center" | "previous" | "next" | "far-previous" | "far-next";

function getPosition(index: number, active: number): Position {
  const total = teamMembers.length;
  const delta = (index - active + total) % total;

  if (delta === 0) return "center";
  if (delta === 1) return "next";
  if (delta === total - 1) return "previous";
  if (delta === 2) return "far-next";
  return "far-previous";
}

export function TeamCarousel() {
  const t = useTranslations("Home.team");
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % teamMembers.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  const move = (direction: -1 | 1) => {
    setActive((current) => (current + direction + teamMembers.length) % teamMembers.length);
  };

  return (
    <section
      className="relative isolate overflow-hidden bg-[#f8fbff] bg-cover bg-center bg-no-repeat py-20 sm:py-28"
      style={{backgroundImage: "url('/worker-bg.jpeg')"}}
    >
      <div className="absolute inset-0 -z-10 bg-white/[0.38]" />
      <div className="container-shell relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-blue-700">{t("eyebrow")}</p>
          <h2 className="mt-4 text-balance text-3xl font-extrabold tracking-[-0.04em] text-[#10172b] sm:text-5xl">{t("title")}</h2>
          <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">{t("description")}</p>
        </div>

        <div
          className="relative mt-12 h-[500px] sm:h-[560px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
          aria-roledescription="carousel"
          aria-label={t("title")}
        >
          <div aria-hidden="true" className="absolute left-1/2 top-[58%] h-28 w-[88%] -translate-x-1/2 rounded-[50%] border border-blue-100 bg-blue-50/55 blur-[1px] sm:w-[76%]" />

          {teamMembers.map((member, index) => {
            const position = getPosition(index, active);
            const isActive = position === "center";

            return (
              <button
                key={member.key}
                type="button"
                data-position={position}
                onClick={() => setActive(index)}
                tabIndex={isActive || position === "previous" || position === "next" ? 0 : -1}
                aria-current={isActive ? "true" : undefined}
                aria-label={`${t(`members.${member.key}.name`)} — ${t(`members.${member.key}.role`)}`}
                className="team-orbit-card absolute left-1/2 top-0 w-[250px] overflow-hidden rounded-[2rem] border border-slate-200 bg-white text-left shadow-2xl shadow-blue-950/10 outline-none focus-visible:ring-4 focus-visible:ring-blue-200 sm:w-[310px]"
              >
                <div className="relative aspect-[4/4.7] overflow-hidden bg-slate-100">
                  <Image
                    src={member.image}
                    alt={t(`members.${member.key}.name`)}
                    fill
                    sizes="310px"
                    className={`object-cover ${member.position}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080a4b]/80 via-transparent to-transparent" />
                  {isActive ? (
                    <span className="absolute right-4 top-4 grid size-10 place-items-center rounded-full border border-white/20 bg-white/15 text-white backdrop-blur">
                      <UserRoundCheck className="size-4" />
                    </span>
                  ) : null}
                </div>
                <div className="relative p-5 sm:p-6">
                  <span className="absolute -top-3 left-6 h-1.5 w-12 rounded-full bg-blue-600" />
                  <h3 className="text-xl font-extrabold text-[#10172b]">{t(`members.${member.key}.name`)}</h3>
                  <p className="mt-1.5 text-sm font-semibold text-blue-700">{t(`members.${member.key}.role`)}</p>
                </div>
              </button>
            );
          })}

          <div className="absolute inset-x-0 bottom-0 z-40 flex items-center justify-center gap-3">
            <button type="button" onClick={() => move(-1)} aria-label={t("previous")} className="grid size-12 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-lg transition hover:border-blue-300 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200">
              <ArrowLeft className="size-5" />
            </button>
            <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2">
              {teamMembers.map((member, index) => (
                <button
                  key={member.key}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`${t(`members.${member.key}.name`)} ${index + 1}`}
                  className={`h-2 rounded-full transition-all ${index === active ? "w-7 bg-blue-700" : "w-2 bg-slate-300 hover:bg-blue-300"}`}
                />
              ))}
            </div>
            <button type="button" onClick={() => move(1)} aria-label={t("next")} className="grid size-12 place-items-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-lg transition hover:border-blue-300 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200">
              <ArrowRight className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
