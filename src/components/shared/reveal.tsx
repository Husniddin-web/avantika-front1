"use client";

import {useEffect, useRef, useState, type CSSProperties, type ReactNode} from "react";

export type RevealVariant = "up" | "left" | "right" | "clip" | "spring" | "scale";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Animation variant. "up" by default. Directional variants only apply on desktop ≥768px. */
  variant?: RevealVariant;
};

export function Reveal({children, className = "", delay = 0, variant = "up"}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Skip animations for users who prefer reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    // On mobile, use a tighter threshold for faster triggers
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: isMobile ? "0px 0px -40px 0px" : "0px 0px -70px 0px",
        threshold: isMobile ? 0.06 : 0.1,
      },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-visible={isVisible}
      data-variant={variant}
      className={`reveal ${className}`}
      style={{"--reveal-delay": `${delay}ms`} as CSSProperties}
    >
      {children}
    </div>
  );
}
