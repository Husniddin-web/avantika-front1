import Image from "next/image";
import {useTranslations} from "next-intl";

import {Reveal} from "../shared/reveal";
import {SectionHeading} from "../shared/section-heading";

const galleryItems = [
  {
    key: "production",
    image: "/hero-slide5.png",
    layout: "col-span-2 min-h-[280px] sm:col-span-7 sm:row-span-2 sm:min-h-[560px]",
    variant: "wide",
  },
  {
    key: "automation",
    image: "/hero-slide-1.webp",
    layout: "col-span-2 min-h-[230px] sm:col-span-5 sm:min-h-0",
    variant: "wide",
  },
  {
    key: "laboratory",
    image: "/rasm.png",
    layout: "col-span-1 min-h-[220px] sm:col-span-2 sm:min-h-0",
    variant: "compact",
  },
  {
    key: "quality",
    image: "/hero-2.png",
    layout: "col-span-1 min-h-[220px] sm:col-span-3 sm:min-h-0",
    variant: "compact",
  },
] as const;

export function ManufacturingGallery() {
  const t = useTranslations("Home.gallery");

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container-shell">
        <Reveal>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />
        </Reveal>

        <Reveal className="mt-10 sm:mt-12">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-12 sm:grid-rows-2 sm:gap-4">
            {galleryItems.map((item, index) => {
              const isCompact = item.variant === "compact";

              return (
                <article
                  key={item.key}
                  className={`group relative isolate overflow-hidden bg-[#080a4b] text-left ${item.layout}`}
                >
                  <Image
                    src={item.image}
                    alt={t(`items.${item.key}.imageAlt`)}
                    fill
                    sizes="(max-width: 640px) 100vw, 60vw"
                    className="object-cover transition duration-700 ease-out group-hover:scale-[1.045]"
                  />
                  <div className="absolute inset-0 bg-[#05072f]/10 transition duration-500 group-hover:bg-[#05072f]/30" />

                  <span className="absolute right-4 top-4 font-mono text-[10px] font-bold tracking-[0.18em] text-white/70 sm:right-5 sm:top-5">
                    0{index + 1}
                  </span>

                  <div
                    className={
                      isCompact
                        ? "absolute inset-x-0 bottom-0 flex translate-y-0 flex-col justify-end overflow-hidden bg-gradient-to-t from-[#05072f]/96 via-[#080a4b]/78 to-transparent p-4 text-white transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:translate-y-4 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100"
                        : "absolute inset-y-0 left-0 flex w-[88%] -translate-x-0 flex-col justify-end overflow-hidden bg-gradient-to-r from-[#05072f]/95 via-[#080a4b]/88 to-[#080a4b]/25 p-4 text-white transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:w-[72%] sm:-translate-x-full sm:opacity-0 sm:p-6 sm:group-hover:translate-x-0 sm:group-hover:opacity-100 lg:w-[58%]"
                    }
                  >
                    <span className={`${isCompact ? "mb-16 sm:mb-10" : "mb-auto"} h-px w-10 bg-red-500`} />
                    <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-blue-200 sm:text-[10px]">{t(`items.${item.key}.eyebrow`)}</p>
                    <h3 className={`${isCompact ? "max-w-full text-base sm:text-lg" : "max-w-[15rem] text-base sm:text-xl lg:text-2xl"} mt-2 text-wrap font-extrabold leading-tight`}>
                      {t(`items.${item.key}.title`)}
                    </h3>
                    <p className="mt-3 hidden text-xs font-bold uppercase tracking-[0.14em] text-white/60 sm:block">{t("view")}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
