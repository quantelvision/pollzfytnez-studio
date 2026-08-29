import type { TypeRole, TypeStyle } from "./types";

// The "bigger and easier to read" scale: 18px body, roughly 1.25 ratio, fluid display sizes.
// Tracking tightens as size grows and opens up on small uppercase.
export const openScale: Record<TypeRole, TypeStyle> = {
  display: {
    family: "display",
    size: "clamp(2.75rem, 5.5vw + 1.5rem, 4.75rem)",
    weight: 700,
    lineHeight: "1.04",
    letterSpacing: "-0.02em",
  },
  h2: {
    family: "display",
    size: "clamp(2rem, 3vw + 1.1rem, 3rem)",
    weight: 600,
    lineHeight: "1.12",
    letterSpacing: "-0.01em",
  },
  h3: {
    family: "display",
    size: "clamp(1.4rem, 1.2vw + 1.05rem, 1.75rem)",
    weight: 600,
    lineHeight: "1.25",
    letterSpacing: "0",
  },
  lead: {
    family: "body",
    size: "clamp(1.1875rem, 0.6vw + 1rem, 1.375rem)",
    weight: 400,
    lineHeight: "1.55",
    letterSpacing: "0",
  },
  body: {
    family: "body",
    size: "1.125rem",
    weight: 400,
    lineHeight: "1.6",
    letterSpacing: "0",
  },
  small: {
    family: "body",
    size: "0.9375rem",
    weight: 400,
    lineHeight: "1.5",
    letterSpacing: "0.005em",
  },
  eyebrow: {
    family: "display",
    size: "0.875rem",
    weight: 500,
    lineHeight: "1.4",
    letterSpacing: "0.09em",
    transform: "uppercase",
  },
  button: {
    family: "display",
    size: "1.0625rem",
    weight: 600,
    lineHeight: "1.2",
    letterSpacing: "0.01em",
  },
};
