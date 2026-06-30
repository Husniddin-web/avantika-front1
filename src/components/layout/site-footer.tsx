import Image from "next/image";
import {ArrowUpRight, Mail, MapPin, Phone} from "lucide-react";
import {useTranslations} from "next-intl";

import {Link} from "@/i18n/navigation";

export function SiteFooter() {
  const t = useTranslations("Footer");
  const nav = useTranslations("Navigation");

  return (
    <footer className="bg-[#070936] text-white">
      <div className="container-shell grid gap-12 py-16 md:grid-cols-[1.2fr_0.8fr_1fr]">
        <div className="max-w-sm">
          <div className="inline-flex rounded-2xl bg-white px-3 py-2">
            <Image
              src="/logo.webp"
              alt="Avantika Pharmaceuticals"
              width={207}
              height={64}
              className="h-11 w-auto object-contain"
            />
          </div>
          <p className="mt-5 text-sm leading-7 text-blue-100/65">{t("description")}</p>
        </div>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-blue-200">{t("navigation")}</p>
          <div className="mt-5 grid gap-3 text-sm text-blue-100/70">
            <Link href="/" className="hover:text-white">{nav("products")}</Link>
            <Link href="/" className="hover:text-white">{nav("news")}</Link>
            <Link href="/" className="hover:text-white">{nav("about")}</Link>
            <Link href="/" className="hover:text-white">{nav("contacts")}</Link>
          </div>
        </div>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-blue-200">{t("contact")}</p>
          <div className="mt-5 space-y-4 text-sm text-blue-100/70">
            <a href="tel:+998901234567" className="flex items-center gap-3 hover:text-white"><Phone className="size-4" />+998 90 123 45 67</a>
            <a href="mailto:info@avantika.uz" className="flex items-center gap-3 hover:text-white"><Mail className="size-4" />info@avantika.uz</a>
            <p className="flex items-start gap-3"><MapPin className="mt-0.5 size-4 shrink-0" />{t("address")}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-shell flex flex-col gap-3 py-5 text-xs text-blue-100/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Avantika Pharmaceuticals. {t("rights")}</p>
          <Link href="/" className="inline-flex items-center gap-1 text-blue-100/70 hover:text-white">{t("pharmacovigilance")}<ArrowUpRight className="size-3.5" /></Link>
        </div>
      </div>
    </footer>
  );
}
