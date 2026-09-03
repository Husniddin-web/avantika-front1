"use client";

import Image from "next/image";
import {ChevronLeft, ChevronRight, X, ZoomIn} from "lucide-react";
import {useEffect, useRef, useState} from "react";
import {imageSrc} from "@/lib/image-src";

export type GalleryImage = {
  url: string;
  filename?: string;
};

interface ProductGalleryProps {
  images: GalleryImage[];
  title: string;
}

export function ProductGallery({images, title}: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const thumbsRef = useRef<HTMLDivElement>(null);

  const safeImages = images && images.length > 0 ? images : [{url: "/d1.jpeg"}];
  const count = safeImages.length;
  const currentImage = safeImages[selectedIndex] || safeImages[0];
  const currentSrc = imageSrc(currentImage?.url, "/d1.jpeg");

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : count - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev < count - 1 ? prev + 1 : 0));
  };

  // Keyboard navigation for lightbox & main image
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (lightboxOpen) {
        if (e.key === "Escape") setLightboxOpen(false);
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === "ArrowRight") handleNext();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, count]);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Main Image Stage */}
      <div className="group relative w-full h-[300px] sm:h-[400px] lg:h-[460px] rounded-2xl bg-slate-50/70 border border-slate-100 flex items-center justify-center overflow-hidden">
        {/* Click to open Lightbox */}
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="relative size-full overflow-hidden focus:outline-none"
          aria-label="Kattalashtirib ko'rish"
        >
          <Image
            key={currentSrc}
            src={currentSrc}
            alt={`${title} - ${selectedIndex + 1}`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain p-6 transition duration-300 group-hover:scale-105 animate-fadeIn"
            unoptimized
            priority
          />

          {/* Zoom hint overlay */}
          <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-white/85 shadow-md opacity-0 transition duration-200 group-hover:opacity-100 backdrop-blur-sm text-slate-700">
            <ZoomIn className="size-4" />
          </span>
        </button>

        {/* Multi-image indicators and arrows */}
        {count > 1 && (
          <>
            {/* Prev Button */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 grid size-9 place-items-center rounded-full bg-white/90 shadow-md text-slate-700 transition duration-200 opacity-0 group-hover:opacity-100 hover:bg-white hover:scale-110 active:scale-95 focus:opacity-100"
              aria-label="Oldingi rasm"
            >
              <ChevronLeft className="size-5" />
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 grid size-9 place-items-center rounded-full bg-white/90 shadow-md text-slate-700 transition duration-200 opacity-0 group-hover:opacity-100 hover:bg-white hover:scale-110 active:scale-95 focus:opacity-100"
              aria-label="Keyingi rasm"
            >
              <ChevronRight className="size-5" />
            </button>

            {/* Counter Badge */}
            <div className="absolute bottom-3 right-3 rounded-full bg-slate-900/65 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-md pointer-events-none">
              {selectedIndex + 1} / {count}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails Row (if multiple images) */}
      {count > 1 && (
        <div
          ref={thumbsRef}
          className="mt-3.5 flex w-full items-center justify-center gap-2 overflow-x-auto p-1.5 scrollbar-thin scrollbar-thumb-slate-200 hover:scrollbar-thumb-slate-300 max-w-full"
        >
          {safeImages.map((img, idx) => {
            const isSelected = idx === selectedIndex;
            const thumbSrc = imageSrc(img.url, "/d1.jpeg");
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={`relative size-14 sm:size-16 shrink-0 overflow-hidden rounded-xl border-2 transition duration-200 focus:outline-none ${
                  isSelected
                    ? "border-blue-600 ring-2 ring-blue-500/20 shadow-md scale-105 bg-white"
                    : "border-slate-200/80 bg-slate-50/60 opacity-60 hover:opacity-100 hover:border-slate-300"
                }`}
                aria-label={`Rasm ${idx + 1}`}
              >
                <Image
                  src={thumbSrc}
                  alt={`${title} thumbnail ${idx + 1}`}
                  fill
                  sizes="64px"
                  className="object-contain p-1"
                  unoptimized
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Fullscreen Lightbox Overlay */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-5 top-5 grid size-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 z-20"
            aria-label="Yopish"
          >
            <X className="size-5" />
          </button>

          {/* Lightbox Navigation Buttons */}
          {count > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 grid size-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/25 active:scale-95 z-20"
                aria-label="Oldingi rasm"
              >
                <ChevronLeft className="size-6" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 grid size-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/25 active:scale-95 z-20"
                aria-label="Keyingi rasm"
              >
                <ChevronRight className="size-6" />
              </button>
            </>
          )}

          {/* Centered Image Container */}
          <div
            className="relative max-h-[85vh] max-w-[85vw] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            style={{touchAction: "pinch-zoom"}}
          >
            <Image
              key={currentSrc}
              src={currentSrc}
              alt={`${title} - ${selectedIndex + 1}`}
              fill
              sizes="90vw"
              className="object-contain animate-fadeIn"
              unoptimized
              priority
            />
          </div>

          {/* Bottom Caption & Counter */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white/90 backdrop-blur-sm z-20">
            <span>{title}</span>
            {count > 1 && (
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-bold">
                {selectedIndex + 1} / {count}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
