// Font keys and their CSS variables, with no next/font dependency so theme
// code stays importable from metadata routes like the Open Graph image.
export const fontCssVariables = {
  baloo2: "--font-baloo2",
  mukta: "--font-mukta",
} as const;

export type FontKey = keyof typeof fontCssVariables;
