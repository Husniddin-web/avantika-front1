"use client";

import {useEffect, useState} from "react";

/**
 * Ingichka progress bar — sahifani aylantirganda qancha o'qilganini ko'rsatadi.
 * Yuqorida qizil/ko'k gradient chiziq sifatida chiqadi.
 */
export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    }
    window.addEventListener("scroll", onScroll, {passive: true});
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60] h-[3px] bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-700 transition-[width] duration-75 ease-out"
      style={{width: `${progress}%`}}
    />
  );
}
