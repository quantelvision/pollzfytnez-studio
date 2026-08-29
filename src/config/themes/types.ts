import type { FontKey } from "@/fonts/registry";

export interface ThemeColors {
  surface: string;
  surfaceRaised: string;
  ink: string;
  inkMuted: string;
  accent: string;
  accentHover: string;
  accentPress: string;
  accentTint: string;
  onAccent: string;
  secondary: string;
  border: string;
  borderStrong: string;
  mediaBg: string;
  shade: string;
  focus: string;
  // text selection highlight
  selectionBg: string;
  selectionInk: string;
  // custom scrollbar
  scrollbarTrack: string;
  scrollbarThumb: string;
  scrollbarThumbHover: string;
}

export type TypeRole =
  | "display"
  | "h2"
  | "h3"
  | "lead"
  | "body"
  | "small"
  | "eyebrow"
  | "button";

export interface TypeStyle {
  family: "display" | "body";
  size: string;
  weight: number;
  lineHeight: string;
  letterSpacing: string;
  transform?: "uppercase" | "none";
}

// The full set of hand-drawn marks; a theme opts marks in via its motif map
export type MotifId =
  | "chalk-tally"
  | "ring-scribble"
  | "barbell-line"
  | "plate-outline"
  | "underline-stroke"
  | "curved-arrow"
  | "clock-five"
  | "chalk-smudge"
  | "knurl-ticks"
  | "rope-loop";

export interface Theme {
  id: string;
  name: string;
  status: "locked" | "draft";
  // one sentence on the case this variation makes when shown to the client
  argument: string;
  colors: ThemeColors;
  fonts: { display: FontKey; body: FontKey };
  typeScale: Record<TypeRole, TypeStyle>;
  radius: { input: string; card: string; media: string; button: string };
  spacing: { unit: string; gutter: string; sectionY: string; container: string };
  motion: {
    // cubic bezier points, converted to CSS by css-vars and to Motion arrays directly
    ease: [number, number, number, number];
    // durations in milliseconds
    durationFast: number;
    durationBase: number;
    durationSlow: number;
    // buttons compress slightly on press rather than lifting on hover
    pressScale: string;
    // width of the flat ring drawn around an interactive element on hover
    ringWidth: string;
  };
  hero: {
    videoTreatment: "natural";
    // full CSS background value painted over the footage for text legibility
    scrim: string;
    // narrow gradient behind the transparent nav, so links stay legible over
    // bright footage without dimming the rest of the frame
    navScrim: string;
    navStyle: "transparent" | "solid";
    contentAlign: "bottom" | "center";
  };
  // mark id -> the one place it is allowed to appear
  motif: Partial<Record<MotifId, string>>;
}
