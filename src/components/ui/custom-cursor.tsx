"use client";

import {useEffect, useRef, useState} from "react";

/**
 * Faqat desktopda (pointer: fine) ko'rinadigan custom cursor.
 * - Kichik dot: tezkor, to'g'ridan-to'g'ri harakat qiladi
 * - Katta ring: biroz kechikib ergashadi (laggy follower)
 * - Hover qilganda: ring kengayadi va to'ldiriladi
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({x: -100, y: -100});
  const ring = useRef({x: -100, y: -100});
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const raf = useRef<number>(0);

  useEffect(() => {
    // Only show custom cursor on pointer-fine devices (desktop)
    if (!window.matchMedia("(pointer: fine)").matches) return;

    document.documentElement.classList.add("custom-cursor-active");

    function onMove(e: MouseEvent) {
      pos.current = {x: e.clientX, y: e.clientY};
    }

    function onEnter(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [role='button'], input, textarea, select, label, summary")
      ) {
        setHovering(true);
      }
    }

    function onLeave() {
      setHovering(false);
    }

    function onDown() { setClicking(true); }
    function onUp() { setClicking(false); }

    window.addEventListener("mousemove", onMove, {passive: true});
    document.addEventListener("mouseover", onEnter, {passive: true});
    document.addEventListener("mouseout", onLeave, {passive: true});
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);

    function animate() {
      // Dot follows instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      // Ring lags behind with lerp
      ring.current.x += (pos.current.x - ring.current.x) * 0.14;
      ring.current.y += (pos.current.y - ring.current.y) * 0.14;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px)`;
      }
      raf.current = requestAnimationFrame(animate);
    }
    raf.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf.current);
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <>
      {/* Kichik dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`custom-cursor-dot pointer-events-none fixed left-0 top-0 z-[9999] size-2 rounded-full bg-blue-600 transition-transform duration-75 ${
          clicking ? "scale-75" : ""
        }`}
      />
      {/* Katta ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`custom-cursor-ring pointer-events-none fixed left-0 top-0 z-[9999] size-10 rounded-full border-2 transition-all duration-200 ${
          hovering
            ? "scale-125 border-blue-500 bg-blue-500/10"
            : "border-blue-400/60 bg-transparent"
        } ${clicking ? "scale-90" : ""}`}
      />
    </>
  );
}
