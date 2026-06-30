"use client";

import {useEffect, useRef, useState, type CSSProperties, type ReactNode} from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({children, className = "", delay = 0}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const shouldSkip = window.matchMedia(
      "(max-width: 767px), (prefers-reduced-motion: reduce)",
    ).matches;

    if (shouldSkip) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {rootMargin: "0px 0px -80px", threshold: 0.12},
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-visible={isVisible}
      className={`reveal ${className}`}
      style={{"--reveal-delay": `${delay}ms`} as CSSProperties}
    >
      {children}
    </div>
  );
}
