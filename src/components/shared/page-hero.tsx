import {ChevronRight} from "lucide-react";
import {useTranslations} from "next-intl";

import {Link} from "@/i18n/navigation";

type PageHeroProps = {
  title: string;
  eyebrow?: string;
  image?: string;
};

export function PageHero({title, eyebrow, image = "/avantika1.jpg"}: PageHeroProps) {
  const t = useTranslations("Navigation");

  return (
    <section className="relative isolate overflow-hidden bg-[#080a4b] pt-24 text-white sm:pt-28">
      <div className="absolute inset-0 -z-20 bg-cover bg-center opacity-60" style={{backgroundImage: `url('${image}')`}} />
      <div className="absolute inset-0 -z-10 bg-[#080a4b]/56" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(154,167,245,0.18),transparent_30%),radial-gradient(circle_at_82%_70%,rgba(34,168,229,0.12),transparent_30%)]" />
      <div className="container-shell relative z-10 flex min-h-[260px] flex-col items-center justify-center pb-20 pt-10 text-center sm:min-h-[320px] sm:py-14">
        {eyebrow ? <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.24em] text-blue-100/75">{eyebrow}</p> : null}
        <h1 className="text-balance text-4xl font-extrabold tracking-[-0.045em] sm:text-5xl">{title}</h1>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm font-semibold text-blue-100/85">
          <Link href="/" className="hover:text-white">{t("home")}</Link>
          <ChevronRight className="size-4" />
          <span className="text-white">{title}</span>
        </div>
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-16 sm:h-32">
        <div className="absolute inset-x-0 bottom-0 h-12 origin-bottom-right -skew-y-2 bg-white sm:h-28" />
        <div className="absolute left-1/2 top-5 h-8 w-[72%] -translate-x-1/2 rounded-full bg-blue-300/20 blur-2xl sm:top-8 sm:h-16" />
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="absolute inset-x-0 bottom-4 h-8 w-full text-white/25 sm:bottom-12 sm:h-16">
          <path fill="none" stroke="currentColor" strokeWidth="2" d="M0 78C190 120 364 116 548 76C769 27 924 11 1116 56C1244 86 1348 91 1440 74" />
        </svg>
      </div>
    </section>
  );
}
