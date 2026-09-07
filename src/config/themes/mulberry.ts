import type { Theme } from "./types";
import { openScale } from "./type-scales";

// Draft variation. Violet leads and orange marks results, which is a jewel pairing rather
// than a hot one. It is the furthest from Home Ground of anything registered, and is here to
// mark the far end of the range the client is choosing within.
export const mulberry: Theme = {
  id: "mulberry",
  name: "Mulberry",
  status: "draft",
  argument:
    "The richest of the four: a deep violet leads and bright orange marks results, a jewel pairing rather than a hot one, on a surface tinted lilac.",
  colors: {
    surface: "#FBF5FB",
    surfaceRaised: "#FFFFFF",
    ink: "#221429",
    inkMuted: "#5C4866",
    accent: "#79189C",
    accentHover: "#661184",
    accentPress: "#530C6C",
    accentTint: "#F0DCF7",
    onAccent: "#FFFFFF",
    secondary: "#BC3D0A",
    border: "#ECDCF1",
    borderStrong: "#C8ACD3",
    mediaBg: "#F4E8F7",
    shade: "rgba(34, 20, 41, 0.68)",
    focus: "#79189C",
    selectionBg: "#E6C6F0",
    selectionInk: "#530C6C",
    scrollbarTrack: "transparent",
    scrollbarThumb: "#79189C",
    scrollbarThumbHover: "#530C6C",
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
      "linear-gradient(180deg, rgba(34, 20, 41, 0.12) 0%, rgba(34, 20, 41, 0.34) 55%, rgba(34, 20, 41, 0.68) 100%)",
    navScrim:
      "linear-gradient(180deg, rgba(34, 20, 41, 0.62) 0%, rgba(34, 20, 41, 0.28) 55%, rgba(34, 20, 41, 0) 100%)",
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
