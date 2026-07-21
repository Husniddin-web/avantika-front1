"use client";

import {useEffect, useRef, useState, type CSSProperties, type ReactNode} from "react";

export type RevealVariant = "up" | "left" | "right" | "clip" | "spring" | "scale";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Animation variant. "up" by default. Directional variants only apply on desktop ≥768px. */
  variant?: RevealVariant;
  /** If true, triggers immediately without waiting for scroll (for above-fold content) */
  immediate?: boolean;
};

export function Reveal({children, className = "", delay = 0, variant = "up", immediate = false}: RevealProps) {
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

    // Above-fold content: show immediately after mount
    if (immediate) {
      const t = setTimeout(() => setIsVisible(true), 60);
      return () => clearTimeout(t);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        // rootMargin: positive bottom margin so elements trigger AS SOON as they enter viewport
        rootMargin: "0px 0px 0px 0px",
        threshold: 0.01,
      },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [immediate]);

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
