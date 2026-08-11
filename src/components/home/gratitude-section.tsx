"use client";

import Image from "next/image";
import {Download, Eye, FileText, X} from "lucide-react";
import {useEffect, useState} from "react";
import {useTranslations} from "next-intl";

import {Reveal} from "../shared/reveal";

/* ── PDF Modal ── */
function PdfModal({file, title, onClose}: {file: string; title: string; onClose: () => void}) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", fn); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative flex flex-col w-full max-w-4xl h-[90vh] rounded-2xl overflow-hidden bg-white shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-[#0a1833] text-white">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-xl bg-white/10">
              <FileText className="size-5 text-blue-300" />
            </span>
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-400">Hujjat</p>
              <h2 className="text-sm font-extrabold">{title}</h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={file}
              download
              className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-white/20"
            >
              <Download className="size-3.5" />
              <span className="hidden sm:inline">Yuklab olish</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              className="grid size-9 place-items-center rounded-xl bg-white/10 text-slate-300 transition hover:text-white"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* PDF iframe */}
        <iframe
          src={`${file}#toolbar=1&navpanes=0`}
          title={title}
          className="flex-1 w-full border-0"
        />
      </div>
    </div>
  );
}

/* ── Section Component ── */
export function GratitudeSection() {
  const t = useTranslations("Home.gratitude");
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-24">
        {/* Decorative backgrounds */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_10%,rgba(37,99,235,0.04),transparent_50%),radial-gradient(circle_at_15%_90%,rgba(99,102,241,0.03),transparent_40%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        <div className="container-shell">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center xl:gap-16">
            
            {/* Left side: PDF Image Preview */}
            <div className="lg:col-span-5">
              <Reveal variant="left">
                <div
                  onClick={() => setOpen(true)}
                  className="group relative mx-auto max-w-[340px] cursor-pointer rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-md transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-blue-950/10 lg:max-w-none"
                >
                  {/* Paper aspect-ratio wrapper (A4 proportion is 1:1.414) */}
                  <div className="relative w-full overflow-hidden rounded-xl bg-slate-100 shadow-sm" style={{aspectRatio: "1/1.414"}}>
                    <Image
                      src="/gratitude-preview.png"
                      alt={t("title")}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                      priority
                      unoptimized
                    />

                    {/* Interactive Zoom Indicator */}
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-950/0 transition duration-300 group-hover:bg-slate-950/15">
                      <span className="grid size-12 place-items-center rounded-full bg-white/95 text-slate-800 shadow-lg opacity-0 transition duration-300 group-hover:opacity-100 backdrop-blur-sm scale-90 group-hover:scale-100">
                        <Eye className="size-5 text-blue-700" />
                      </span>
                    </div>

                    {/* Document Badge */}
                    <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-sm">
                      <FileText className="size-3.5" />
                      Official
                    </span>
                  </div>

                  {/* Corner Accent Ribbon */}
                  <div className="absolute -right-1 -top-1 size-16 overflow-hidden pointer-events-none">
                    <div className="absolute right-[-17px] top-[14px] w-[75px] rotate-45 bg-blue-600 py-0.5 text-center text-[7px] font-bold uppercase tracking-widest text-white shadow-sm">
                      PDF
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right side: Detailed Description and Actions */}
            <div className="lg:col-span-7">
              <Reveal variant="right" delay={100}>
                <div className="max-w-2xl">
                  <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/70 px-4 py-2 text-xs font-bold text-blue-700 uppercase tracking-widest">
                    <FileText className="size-4 text-blue-600" />
                    {t("eyebrow")}
                  </span>

                  <h2 className="mt-6 text-balance text-3xl font-extrabold tracking-tight text-[#0a1833] sm:text-4xl lg:text-5xl leading-tight">
                    {t("title")}
                  </h2>

                  <p className="mt-6 text-base leading-8 text-slate-600">
                    {t("description")}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4">
                    {/* View Button */}
                    <button
                      type="button"
                      onClick={() => setOpen(true)}
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#0a1833] px-8 text-sm font-bold text-white shadow-lg shadow-[#0a1833]/20 transition hover:-translate-y-0.5 hover:bg-blue-800"
                    >
                      <Eye className="size-4" />
                      {t("view")}
                    </button>

                    {/* Download Button */}
                    <a
                      href="/gratitude.pdf"
                      download
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-8 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                    >
                      <Download className="size-4 text-slate-500" />
                      {t("download")}
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* PDF Viewer Lightbox */}
      {open && (
        <PdfModal
          file="/gratitude.pdf"
          title={t("title")}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
