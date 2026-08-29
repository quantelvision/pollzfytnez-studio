"use client";

import { useEffect } from "react";
import type Lenis from "lenis";

// Lenis smooth scrolling for the whole page. Loaded dynamically after
// hydration so it never sits in the initial bundle or delays first paint.
// It drives the native scroll position, so anchors, keyboard navigation,
// focus scrolling and find-in-page keep working. Under prefers-reduced-motion
// it is never started, and it stops if the preference changes mid-visit.
export function SmoothScroll() {
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    let cancelled = false;

    const start = () => {
      if (lenis || query.matches) {
        return;
      }
      import("lenis").then(({ default: LenisImpl }) => {
        if (cancelled || query.matches || lenis) {
          return;
        }
        lenis = new LenisImpl({ anchors: true, autoRaf: true });
      });
    };
    const stop = () => {
      lenis?.destroy();
      lenis = null;
    };
    const onChange = () => (query.matches ? stop() : start());

    start();
    query.addEventListener("change", onChange);
    return () => {
      cancelled = true;
      query.removeEventListener("change", onChange);
      stop();
    };
  }, []);

  return null;
}
