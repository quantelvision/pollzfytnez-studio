import type { Theme } from "./types";
import { openScale } from "./type-scales";

// Draft variation. Named for the flower on every second wall in Kolathur. Magenta leads
// every interaction and orange marks results, which is the Sunrise pairing reversed, so the
// two shown together ask the client which of the pair should lead.
export const bougainvillea: Theme = {
  id: "bougainvillea",
  name: "Bougainvillea",
  status: "draft",
  argument:
    "The pink the client asked for, taken from the flower that grows over half the walls in Chennai: vivid magenta leads, orange marks results, and the surface is a blush rather than a cream.",
  colors: {
    surface: "#FFF5F8",
    surfaceRaised: "#FFFFFF",
    ink: "#2B1520",
    inkMuted: "#6E4F5C",
    accent: "#AC0F56",
    accentHover: "#920948",
    accentPress: "#78063A",
    accentTint: "#FFDCE9",
    onAccent: "#FFFFFF",
    secondary: "#BC3D0A",
    border: "#F7DFE7",
    borderStrong: "#DFB6C6",
    mediaBg: "#FBE6EE",
    shade: "rgba(43, 21, 32, 0.68)",
    focus: "#AC0F56",
    selectionBg: "#FFCADD",
    selectionInk: "#78063A",
    scrollbarTrack: "transparent",
    scrollbarThumb: "#AC0F56",
    scrollbarThumbHover: "#78063A",
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
      "linear-gradient(180deg, rgba(43, 21, 32, 0.12) 0%, rgba(43, 21, 32, 0.34) 55%, rgba(43, 21, 32, 0.68) 100%)",
    navScrim:
      "linear-gradient(180deg, rgba(43, 21, 32, 0.62) 0%, rgba(43, 21, 32, 0.28) 55%, rgba(43, 21, 32, 0) 100%)",
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
