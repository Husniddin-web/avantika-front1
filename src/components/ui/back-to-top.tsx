"use client";

import {useEffect, useState} from "react";
import {ArrowUp} from "lucide-react";

/**
 * Sahifaning 30% dan pastga tushganda paydo bo'ladigan "Yuqoriga" tugmasi.
 * Atrofida aylanuvchi progress circle bor.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(pct);
      setVisible(scrollTop > 400);
    }
    window.addEventListener("scroll", onScroll, {passive: true});
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => window.scrollTo({top: 0, behavior: "smooth"});

  // SVG circle params
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <button
      onClick={handleClick}
      aria-label="Yuqoriga qaytish"
      className={`fixed bottom-6 right-5 z-50 sm:bottom-8 sm:right-8 flex size-14 items-center justify-center rounded-full bg-white shadow-2xl shadow-blue-950/20 ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-blue-900/25 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      {/* Progress circle */}
      <svg
        className="absolute inset-0 -rotate-90"
        width="56"
        height="56"
        viewBox="0 0 56 56"
        aria-hidden="true"
      >
        {/* Track */}
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="2.5"
        />
        {/* Progress */}
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke="url(#back-top-gradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-[stroke-dashoffset] duration-75"
        />
        <defs>
          <linearGradient id="back-top-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
      </svg>
      <ArrowUp className="size-5 text-blue-700" />
    </button>
  );
}
