"use client";

import Image from "next/image";
import {useTranslations} from "next-intl";
import {ArrowRight} from "lucide-react";

import {Link} from "@/i18n/navigation";
import {teamMembers} from "@/data/team";
import type {Locale} from "@/i18n/routing";
import {imageSrc} from "@/lib/image-src";
import {localize} from "@/lib/localized";
import type {Worker} from "@/lib/admin/api";

export function TeamCarousel({workers = [], locale}: {workers?: Worker[]; locale: Locale}) {
  const t = useTranslations("Home.team");
  
  const allMembers = workers.length
    ? workers.map((worker) => ({
        key: worker.id,
        name: localize(worker.fullName, locale),
        role: localize(worker.role, locale),
        image: imageSrc(worker.image?.url, "/worker-man.png"),
        position: "object-center",
      }))
    : teamMembers.map((member) => ({
        key: member.key,
        name: t(`members.${member.key}.name`),
        role: t(`members.${member.key}.role`),
        image: member.image,
        position: member.position,
      }));

  const displayMembers = allMembers.slice(0, 10);
  const hasMore = allMembers.length > 10;

  const viewAllText = locale === "uz" ? "Barcha jamoa a'zolarini ko'rish" : locale === "ru" ? "Смотреть всю команду" : "View all team members";

  return (
    <section
      className="relative isolate overflow-hidden bg-[#f8fbff] bg-cover bg-center bg-no-repeat py-20 sm:py-28"
      style={{backgroundImage: "url('/worker-bg.jpeg')"}}
    >
      <div className="absolute inset-0 -z-10 bg-white/[0.5]" />
      <div className="container-shell relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-blue-700">{t("eyebrow")}</p>
          <h2 className="mt-4 text-balance text-3xl font-extrabold tracking-[-0.04em] text-[#10172b] sm:text-5xl">{t("title")}</h2>
          <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">{t("description")}</p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {displayMembers.map((member) => (
            <div
              key={member.key}
              className="group relative overflow-hidden rounded-xl border border-slate-200/50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#080a4b]/20 aspect-[1.35/1]"
            >
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className={`object-cover transition duration-700 group-hover:scale-105 ${member.position}`}
              />
              {/* Premium qora/ko'k gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-85 transition duration-300 group-hover:opacity-100" />
              
              <div className="absolute bottom-0 left-0 w-full p-4 sm:p-5">
                <h3 className="text-lg font-bold leading-tight text-white shadow-black drop-shadow-md sm:text-[19px]">{member.name}</h3>
                <p className="mt-1 text-xs font-medium text-white/80 shadow-black drop-shadow-md">{member.role}</p>
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="mt-12 text-center">
            <Link
              href="/about"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#10172b] px-8 text-sm font-bold text-white shadow-lg shadow-[#10172b]/20 transition hover:-translate-y-0.5 hover:bg-blue-800 focus-visible:outline-blue-700"
            >
              {viewAllText} <ArrowRight className="size-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
