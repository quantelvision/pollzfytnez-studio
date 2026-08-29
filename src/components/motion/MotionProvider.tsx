"use client";

import { LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

// Animation features load lazily so they stay out of the initial bundle
const loadFeatures = () => import("./motion-features").then((mod) => mod.default);

// reducedMotion="user" honours prefers-reduced-motion for every Motion animation globally
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadFeatures} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
