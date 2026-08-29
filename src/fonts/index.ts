import localFont from "next/font/local";
import type { FontKey } from "./registry";

// Baloo 2 variable font, latin subset, weight axis 400-800
const baloo2 = localFont({
  src: "./baloo2/Baloo2-latin-wght.woff2",
  weight: "400 800",
  style: "normal",
  display: "swap",
  variable: "--font-baloo2",
  adjustFontFallback: "Arial",
  preload: true,
});

// Mukta static weight, latin subset. Body text is 400 only; heavier text roles
// use the Baloo 2 variable axis, keeping the font payload on the LCP path small.
const mukta = localFont({
  src: [{ path: "./mukta/Mukta-latin-400.woff2", weight: "400", style: "normal" }],
  display: "swap",
  variable: "--font-mukta",
  adjustFontFallback: "Arial",
  preload: true,
});

// Every font any registered theme may reference. A future theme adds a face by
// adding a localFont call here and its variable name in registry.ts.
const fontLoaders: Record<FontKey, { variable: string }> = {
  baloo2,
  mukta,
};

// Class names that expose every registered font variable on the root element
export const fontVariableClassNames = Object.values(fontLoaders)
  .map((font) => font.variable)
  .join(" ");

export type { FontKey } from "./registry";
