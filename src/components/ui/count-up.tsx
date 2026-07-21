"use client";

import {useEffect, useRef, useState} from "react";

interface CountUpProps {
  /** Target number to count to */
  target: number;
  /** Optional suffix appended after the number, e.g. "+" or " yil" */
  suffix?: string;
  /** Optional prefix shown before the number */
  prefix?: string;
  /** Animation duration in ms. Default 2200 */
  duration?: number;
  className?: string;
}

/**
 * Animates a number from 0 to `target` when the element scrolls into view.
 * Uses easeOutExpo so the count accelerates early and slows to a stop.
 */
export function CountUp({
  target,
  suffix = "",
  prefix = "",
  duration = 2200,
  className = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  // Trigger when visible
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(target);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      {threshold: 0.4},
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  // Run animation when started
  useEffect(() => {
    if (!started) return;

    const startTime = performance.now();

    function easeOutExpo(t: number): number {
      return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.round(easeOutExpo(progress) * target));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [started, target, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  );
}
