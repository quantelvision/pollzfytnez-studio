import type { Theme } from "./types";
import { openScale } from "./type-scales";

// The direction the client chose on 2026-09-01, and what the site ships.
// The brightest orange the palette can carry: Orange takes every interactive role
// and magenta marks results. The brightness lives in the surface, the tint and the bands:
// the orange itself has to stay deep enough to be read as text and to carry white on a fill.
export const sunrise: Theme = {
  id: "sunrise",
  name: "Sunrise",
  status: "locked",
  argument:
    "The chosen direction. Orange leads every action, magenta marks results, and the page warms to peach rather than cream.",
  colors: {
    surface: "#FFF8F2",
    surfaceRaised: "#FFFFFF",
    ink: "#2A1A10",
    inkMuted: "#6B5344",
    accent: "#C63C0A",
    accentHover: "#AC3308",
    accentPress: "#922B06",
    accentTint: "#FFEDE0",
    onAccent: "#FFFFFF",
    secondary: "#B3125A",
    border: "#F8E5D8",
    borderStrong: "#E0C3AC",
    mediaBg: "#FDF0E7",
    shade: "rgba(42, 26, 16, 0.68)",
    focus: "#C63C0A",
    selectionBg: "#FFDCC4",
    selectionInk: "#922B06",
    scrollbarTrack: "transparent",
    scrollbarThumb: "#C63C0A",
    scrollbarThumbHover: "#922B06",
  },
  fonts: { display: "baloo2", body: "mukta" },
  typeScale: openScale,
  radius: {
    input: "0.875rem",
    card: "1.5rem",
    media: "1.25rem",
    button: "999px",
  },
  spacing: {
    unit: "0.25rem",
    gutter: "clamp(1.25rem, 4vw, 2.5rem)",
    sectionY: "clamp(4.5rem, 10vw, 8rem)",
    container: "72rem",
  },
  motion: {
    ease: [0.32, 0.72, 0, 1],
    durationFast: 140,
    durationBase: 240,
    durationSlow: 480,
    pressScale: "0.97",
    ringWidth: "3px",
  },
  hero: {
    videoTreatment: "natural",
    scrim:
      "linear-gradient(180deg, rgba(42, 26, 16, 0.12) 0%, rgba(42, 26, 16, 0.34) 55%, rgba(42, 26, 16, 0.68) 100%)",
    navScrim:
      "linear-gradient(180deg, rgba(42, 26, 16, 0.62) 0%, rgba(42, 26, 16, 0.28) 55%, rgba(42, 26, 16, 0) 100%)",
    navStyle: "transparent",
    contentAlign: "bottom",
  },
  motif: {
    "underline-stroke": "under one key word in the hero heading",
    "chalk-tally": "beside the members-trained stat",
    "ring-scribble": "circling the 4.9 rating",
    "barbell-line": "programs section heading",
    "clock-five": "the opening hours section",
    "plate-outline": "withdrawn on the client's review",
    "knurl-ticks": "withdrawn on the client's review",
    "rope-loop": "withdrawn on the client's review",
    "curved-arrow": "withdrawn on the client's review",
    "chalk-smudge": "withdrawn on the client's review",
  },
};
