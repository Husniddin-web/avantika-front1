"use client";

import Image from "next/image";
import {X, ZoomIn} from "lucide-react";
import {useEffect, useState} from "react";

interface ProductLightboxProps {
  src: string;
  alt: string;
}

/**
 * Mahsulot rasmiga bosilganda fullscreen lightbox ochadi.
 * Mobileda pinch-to-zoom uchun touch-action: pinch-zoom qo'llanilgan.
 */
export function ProductLightbox({src, alt}: ProductLightboxProps) {
  const [open, setOpen] = useState(false);

  // Escape tugmasida yopish
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative h-full w-full"
        aria-label="Rasmni kattalashtirish"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain p-4 sm:p-8 transition duration-300 group-hover:scale-105"
          unoptimized
        />
        {/* Zoom hint overlay */}
        <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-white/80 shadow-md opacity-0 transition duration-200 group-hover:opacity-100 backdrop-blur-sm">
          <ZoomIn className="size-4 text-slate-600" />
        </span>
      </button>

      {/* Lightbox overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={alt}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 z-10"
            aria-label="Yopish"
          >
            <X className="size-5" />
          </button>

          {/* Image container */}
          <div
            className="relative max-h-[90vh] max-w-[90vw] w-full h-full"
            onClick={(e) => e.stopPropagation()}
            style={{touchAction: "pinch-zoom"}}
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="90vw"
              className="object-contain"
              unoptimized
              priority
            />
          </div>

          {/* Caption */}
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white/80 backdrop-blur-sm">
            {alt}
          </p>
        </div>
      )}
    </>
  );
}
