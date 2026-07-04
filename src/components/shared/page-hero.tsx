import {ChevronRight} from "lucide-react";

import {Link} from "@/i18n/navigation";

type PageHeroProps = {
  title: string;
  eyebrow?: string;
  image?: string;
};

export function PageHero({title, eyebrow, image = "/hero-slide-1.webp"}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-[#080a4b] pt-24 text-white sm:pt-28">
      <div className="absolute inset-0 -z-20 bg-cover bg-center opacity-60" style={{backgroundImage: `url('${image}')`}} />
      <div className="absolute inset-0 -z-10 bg-[#080a4b]/56" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(154,167,245,0.18),transparent_30%),radial-gradient(circle_at_82%_70%,rgba(34,168,229,0.12),transparent_30%)]" />
      <div className="container-shell flex min-h-[240px] flex-col items-center justify-center py-10 text-center sm:min-h-[320px] sm:py-14">
        {eyebrow ? <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.24em] text-blue-100/75">{eyebrow}</p> : null}
        <h1 className="text-balance text-4xl font-extrabold tracking-[-0.045em] sm:text-5xl">{title}</h1>
        <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-blue-100/75">
          <Link href="/" className="hover:text-white">Home</Link>
          <ChevronRight className="size-4" />
          <span className="text-white">{title}</span>
        </div>
      </div>
      <svg aria-hidden="true" viewBox="0 0 1440 120" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-10 w-full text-white sm:h-16">
        <path fill="currentColor" d="M0 74L80 90C160 106 320 138 480 98C640 58 800-54 960 30C1120 114 1280 114 1360 106L1440 98V120H0Z" />
      </svg>
    </section>
  );
}
