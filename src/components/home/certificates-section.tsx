"use client";

import Image from "next/image";
import {Download, ChevronLeft, ChevronRight, X} from "lucide-react";
import {useCallback, useEffect, useRef, useState} from "react";

const CERTS = [
  {
    id: "uzbekistan",
    country: "O'zbekiston",
    flag: "🇺🇿",
    authority: "O'zbekiston Sog'liqni Saqlash Vazirligi",
    accent: "#2563eb",
    image: "/certificates/gmp-uzbekistan.png",
    file: "/certificates/gmp-uzbekistan.pdf",
  },
  {
    id: "avantika-2024",
    country: "Avantika Medex",
    flag: "🏭",
    authority: "Xalqaro GMP Sertifikat · 2024",
    accent: "#4f46e5",
    image: "/certificates/gmp-avantika-2024.png",
    file: "/certificates/gmp-avantika-2024.pdf",
  },
  {
    id: "cambodia",
    country: "Kambodja",
    flag: "🇰🇭",
    authority: "Kingdom of Cambodia MoH",
    accent: "#7c3aed",
    image: "/certificates/gmp-cambodia.png",
    file: "/certificates/gmp-cambodia.pdf",
  },
  {
    id: "ghana",
    country: "Gana",
    flag: "🇬🇭",
    authority: "Ghana Food & Drugs Authority",
    accent: "#d97706",
    image: "/certificates/gmp-ghana.png",
    file: "/certificates/gmp-ghana.pdf",
  },
  {
    id: "ivory-coast",
    country: "Fil Suyagi Qirg'og'i",
    flag: "🇨🇮",
    authority: "Côte d'Ivoire MoH",
    accent: "#059669",
    image: "/certificates/gmp-ivory-coast.png",
    file: "/certificates/gmp-ivory-coast.pdf",
  },
  {
    id: "nigeria",
    country: "Nigeriya",
    flag: "🇳🇬",
    authority: "NAFDAC Nigeria",
    accent: "#16a34a",
    image: "/certificates/gmp-nigeria.png",
    file: "/certificates/gmp-nigeria.pdf",
  },
  {
    id: "ukraine",
    country: "Ukraina",
    flag: "🇺🇦",
    authority: "PIC/S Ukraine",
    accent: "#0284c7",
    image: "/certificates/gmp-ukraine.png",
    file: "/certificates/gmp-ukraine.pdf",
  },
  {
    id: "yemen",
    country: "Yaman",
    flag: "🇾🇪",
    authority: "Yemen MoPHP",
    accent: "#dc2626",
    image: "/certificates/gmp-yemen.png",
    file: "/certificates/gmp-yemen.pdf",
  },
] as const;

type Cert = (typeof CERTS)[number];

/* ─── Helpers ─────────────────────────────────── */
const total = CERTS.length;

function wrappedOffset(index: number, active: number): number {
  let off = index - active;
  if (off > total / 2)  off -= total;
  if (off < -total / 2) off += total;
  return off;
}

interface CardStyle {
  translateX: number;  // % of card width
  translateY: number;  // px
  rotate: number;      // deg
  scale: number;
  opacity: number;
  zIndex: number;
  brightness: number;
  pointerEvents: "auto" | "none";
}

function positionStyle(offset: number): CardStyle {
  switch (offset) {
    case  0: return { translateX:   0, translateY:  0, rotate:   0, scale: 1,    opacity: 1,   zIndex: 30, brightness: 1,    pointerEvents: "auto" };
    case -1: return { translateX: -82, translateY: 10, rotate:  -9, scale: 0.85, opacity: 1,   zIndex: 20, brightness: 0.72, pointerEvents: "auto" };
    case  1: return { translateX:  82, translateY: 10, rotate:   9, scale: 0.85, opacity: 1,   zIndex: 20, brightness: 0.72, pointerEvents: "auto" };
    case -2: return { translateX:-155, translateY: 24, rotate: -18, scale: 0.65, opacity: 0,   zIndex: 10, brightness: 0.5,  pointerEvents: "none" };
    case  2: return { translateX: 155, translateY: 24, rotate:  18, scale: 0.65, opacity: 0,   zIndex: 10, brightness: 0.5,  pointerEvents: "none" };
    default: return { translateX: offset < 0 ? -200 : 200, translateY: 40, rotate: offset < 0 ? -24 : 24, scale: 0.5, opacity: 0, zIndex: 0, brightness: 0.3, pointerEvents: "none" };
  }
}

/* ─── PDF Modal ────────────────────────────────── */
function PdfModal({cert, onClose}: {cert: Cert; onClose: () => void}) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", fn); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm"
      onClick={onClose} role="dialog" aria-modal="true"
    >
      <div
        className="relative flex flex-col w-full max-w-4xl h-[92vh] rounded-2xl overflow-hidden bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex shrink-0 items-center justify-between px-5 py-3.5 border-b border-slate-100"
          style={{borderLeftColor: cert.accent, borderLeftWidth: 4}}
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">{cert.flag}</span>
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-400">GMP Sertifikat</p>
              <h2 className="text-sm font-extrabold text-[#10172b]">{cert.country}</h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href={cert.file} download className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-50">
              <Download className="size-3.5" />
              <span className="hidden sm:inline">Yuklab olish</span>
            </a>
            <button type="button" onClick={onClose} className="grid size-9 place-items-center rounded-xl border border-slate-200 text-slate-400 transition hover:bg-slate-50">
              <X className="size-4" />
            </button>
          </div>
        </div>
        <iframe src={`${cert.file}#toolbar=1&navpanes=0`} title={`${cert.country} GMP`} className="flex-1 w-full border-0" />
      </div>
    </div>
  );
}

/* ─── Section ──────────────────────────────────── */
export function CertificatesSection() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<Cert | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = useCallback((dir: 1 | -1) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActive((a) => (a + dir + total) % total);
    timerRef.current = setTimeout(() => setIsAnimating(false), 650);
  }, [isAnimating]);

  const prev = useCallback(() => go(-1), [go]);
  const next = useCallback(() => go(1),  [go]);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (open) return;
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [prev, next, open]);

  return (
    <>
      <section className="relative overflow-hidden bg-white py-20 sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(37,99,235,0.06),transparent_60%)]" />

        <div className="container-shell">

          {/* ── Heading ── */}
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-extrabold uppercase tracking-tight text-[#0a1833] sm:text-[2.6rem] sm:leading-[1.1]">
              Our Best Achievement<br className="hidden sm:block" /> in the Journey
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
              The certifications we hold are a symbol of quality, reflecting our relentless
              pursuit of superior pharmaceuticals manufacturing standards
            </p>
          </div>

          {/* ── Stage ── */}
          <div className="relative mt-16 sm:mt-20 select-none">

            {/* Nav arrows */}
            <button
              type="button" onClick={prev}
              disabled={isAnimating}
              className="absolute left-0 sm:-left-5 top-[38%] z-40 -translate-y-1/2 grid size-11 place-items-center rounded-full border border-slate-200 bg-white shadow-lg text-slate-600 transition hover:bg-slate-50 hover:scale-110 disabled:opacity-40"
              aria-label="Oldingi"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button" onClick={next}
              disabled={isAnimating}
              className="absolute right-0 sm:-right-5 top-[38%] z-40 -translate-y-1/2 grid size-11 place-items-center rounded-full border border-slate-200 bg-white shadow-lg text-slate-600 transition hover:bg-slate-50 hover:scale-110 disabled:opacity-40"
              aria-label="Keyingi"
            >
              <ChevronRight className="size-5" />
            </button>

            {/* Cards */}
            <div
              className="relative mx-auto"
              style={{
                height: "clamp(280px, 52vw, 560px)",
                maxWidth: 900,
                perspective: "1400px",
                perspectiveOrigin: "50% 30%",
              }}
            >
              {CERTS.map((cert, i) => {
                const offset = wrappedOffset(i, active);
                const s = positionStyle(offset);
                const isCenter = offset === 0;

                return (
                  <div
                    key={cert.id}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{zIndex: s.zIndex, pointerEvents: s.pointerEvents}}
                  >
                    <div
                      onClick={() => {
                        if (isAnimating) return;
                        if (offset === -1) { prev(); return; }
                        if (offset ===  1) { next(); return; }
                        if (isCenter) setOpen(cert);
                      }}
                      style={{
                        width: "clamp(180px, 36vw, 400px)",
                        aspectRatio: "1/1.414",
                        transform: `translateX(${s.translateX}%) translateY(${s.translateY}px) rotate(${s.rotate}deg) scale(${s.scale})`,
                        opacity: s.opacity,
                        filter: `brightness(${s.brightness})`,
                        zIndex: s.zIndex,
                        cursor: isCenter ? "zoom-in" : offset === -1 || offset === 1 ? "pointer" : "default",
                        transition: [
                          "transform 620ms cubic-bezier(0.22, 1, 0.36, 1)",
                          "opacity 420ms cubic-bezier(0.22, 1, 0.36, 1)",
                          "filter 420ms ease",
                          "box-shadow 420ms ease",
                        ].join(", "),
                        boxShadow: isCenter
                          ? "0 40px 90px -16px rgba(0,0,0,0.32), 0 8px 24px -4px rgba(0,0,0,0.12)"
                          : "0 12px 40px -8px rgba(0,0,0,0.18)",
                        borderRadius: 14,
                        overflow: "hidden",
                        position: "relative",
                        background: "#f1f5f9",
                      }}
                    >
                      <Image
                        src={cert.image}
                        alt={`${cert.country} GMP`}
                        fill
                        sizes="(max-width: 640px) 80vw, 40vw"
                        className="object-cover object-top"
                        priority={i === 0}
                        unoptimized
                      />

                      {/* Active card bottom bar */}
                      {isCenter && (
                        <div
                          className="absolute inset-x-0 bottom-0 flex items-center justify-between px-4 py-3"
                          style={{
                            background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)",
                            transition: "opacity 300ms ease",
                          }}
                        >
                          <div>
                            <p className="text-[9px] font-extrabold uppercase tracking-[0.16em] text-white/60">GMP Sertifikat</p>
                            <p className="mt-0.5 text-sm font-extrabold text-white">{cert.flag} {cert.country}</p>
                          </div>
                          <a
                            href={cert.file}
                            download
                            onClick={(e) => e.stopPropagation()}
                            className="grid size-8 place-items-center rounded-lg bg-white/20 text-white backdrop-blur-sm transition hover:bg-white/35"
                            aria-label="Yuklab olish"
                          >
                            <Download className="size-3.5" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── Dots ── */}
            <div className="mt-8 flex items-center justify-center gap-2">
              {CERTS.map((_, i) => (
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
                      : "size-2.5 bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`${i + 1}-sertifikat`}
                />
              ))}
            </div>

            {/* ── Active cert label ── */}
            <div
              className="mt-5 text-center"
              style={{
                opacity: 1,
                transition: "opacity 300ms ease",
              }}
            >
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400">GMP Sertifikat</p>
              <p className="mt-1 text-base font-extrabold text-[#0a1833]">
                {CERTS[active].flag} {CERTS[active].country}
              </p>
              <p className="mt-0.5 text-xs text-slate-500">{CERTS[active].authority}</p>
            </div>
          </div>
        </div>
      </section>

      {open && <PdfModal cert={open} onClose={() => setOpen(null)} />}
    </>
  );
}
