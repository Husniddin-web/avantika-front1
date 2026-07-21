import Image from "next/image";
import {Building2, Factory, Globe2, MapPin} from "lucide-react";
import {useTranslations} from "next-intl";

import {CountUp} from "../ui/count-up";
import {Reveal} from "../shared/reveal";
import {SectionHeading} from "../shared/section-heading";

const locations = [
  {key: "uzbekistan", kind: "headquarters"},
  {key: "tajikistan", kind: "office"},
  {key: "kyrgyzstan", kind: "office"},
  {key: "poland", kind: "partner"},
  {key: "hungary", kind: "partner"},
  {key: "mauritania", kind: "partner"},
  {key: "philippines", kind: "partner"},
  {key: "ivory_coast", kind: "partner"},
  {key: "togo", kind: "partner"},
  {key: "myanmar", kind: "partner"},
  {key: "cambodia", kind: "partner"},
  {key: "ghana", kind: "partner"},
  {key: "ethiopia", kind: "partner"},
  {key: "vietnam", kind: "partner"},
  {key: "yemen", kind: "partner"},
] as const;

export function GlobalPresence() {
  const t = useTranslations("Home.global");

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#cfe0ff] via-[#e7efff] to-[#f8fbff] py-12 sm:py-24 lg:py-28">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_15%,rgba(37,99,235,0.28),transparent_32%),radial-gradient(circle_at_12%_88%,rgba(8,10,75,0.16),transparent_30%)]" />
      <div className="container-shell">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center xl:gap-16">
          <Reveal variant="clip">
            <SectionHeading
              eyebrow={t("eyebrow")}
              title={t("title")}
              description={t("description")}
            />

            <div className="mt-6 grid max-w-md grid-cols-2 gap-3 sm:mt-8">
              <div className="rounded-2xl border border-blue-100 bg-white/78 p-4 shadow-sm shadow-blue-950/5 backdrop-blur sm:rounded-3xl sm:bg-white/82 sm:p-5">
                <p className="text-2xl font-extrabold text-blue-800 sm:text-3xl">
                  <CountUp target={30} suffix="+" duration={2000} />
                </p>
                <p className="mt-1 text-xs font-bold leading-5 text-slate-500">{t("markets")}</p>
              </div>
              <div className="rounded-2xl border border-blue-100 bg-white/78 p-4 shadow-sm shadow-blue-950/5 backdrop-blur sm:rounded-3xl sm:bg-white/82 sm:p-5">
                <p className="text-2xl font-extrabold text-red-500 sm:text-3xl">
                  <CountUp target={24} duration={2000} />
                </p>
                <p className="mt-1 text-xs font-bold leading-5 text-slate-500">{t("partners")}</p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2 sm:mt-6">
              {locations.map((location) => (
                <span
                  key={location.key}
                  className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/78 px-4 py-2 text-xs font-bold text-slate-600 shadow-sm shadow-blue-950/5 backdrop-blur sm:bg-white/82"
                >
                  <span className={`size-2 rounded-full ${location.key === "uzbekistan" ? "bg-red-500" : "bg-blue-600"}`} />
                  {t(`locations.${location.key}.country`)}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120} variant="right">
            <div className="relative overflow-hidden rounded-[1.5rem] bg-[#080a4b] shadow-[0_30px_80px_-32px_rgba(8,10,75,0.65)] sm:rounded-[2rem]">
              <div className="relative min-h-[560px] sm:min-h-[460px] lg:min-h-[520px]">
                <Image
                  src="/2026-07-06 15.00.12.jpg"
                  alt={t("mapLabel")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#05072f]/92 via-[#080a4b]/58 to-[#315da0]/18" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_24%,rgba(255,255,255,0.24),transparent_24%),radial-gradient(circle_at_34%_68%,rgba(82,116,255,0.38),transparent_34%)]" />

                <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-blue-100 backdrop-blur sm:left-7 sm:top-7">
                  <Globe2 className="size-4" />
                  Global
                </div>

                <div className="absolute bottom-0 left-0 right-0 grid gap-2.5 bg-gradient-to-t from-[#05072f] via-[#05072f]/86 to-transparent p-4 pt-24 sm:grid-cols-2 sm:gap-3 sm:p-7 sm:pt-28">
                  {locations.slice(0, 4).map((location) => {
                    const isHeadquarters = location.key === "uzbekistan";
                    const Icon = isHeadquarters ? Factory : Building2;

                    return (
                      <div
                        key={location.key}
                        className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.10] p-3 text-white shadow-lg shadow-black/10 backdrop-blur-md"
                      >
                        <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${isHeadquarters ? "bg-red-500" : "bg-blue-100 text-blue-800"}`}>
                          <Icon className="size-5" />
                        </span>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-blue-100/65">
                            {t(`types.${location.kind}`)}
                          </p>
                          <h3 className="mt-1 text-sm font-extrabold">
                            {t(`locations.${location.key}.country`)}
                          </h3>
                          <p className="mt-1 flex items-center gap-1.5 text-xs text-blue-100/65">
                            <MapPin className="size-3.5" />
                            {t(`locations.${location.key}.city`)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
