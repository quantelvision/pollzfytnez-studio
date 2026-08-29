import type { Theme } from "./types";
import { openScale } from "./type-scales";

// Draft variation. It flips the two colour roles and nothing else: clay leads every
// interaction, deep green marks results, the surface warms toward sand. Shown beside
// home-ground it isolates one question for the client: which colour should lead.
export const redEarth: Theme = {
  id: "red-earth",
  name: "Red Earth",
  status: "draft",
  argument:
    "Same softness and type, but terracotta leads the way the red earth of a Chennai playground does. Tests whether the doubt about the palette is really about green leading.",
  colors: {
    surface: "#FAF5EC",
    surfaceRaised: "#FFFFFF",
    ink: "#2B2721",
    inkMuted: "#6A5D4B",
    accent: "#A84D2E",
    accentHover: "#93401F",
    accentPress: "#7C3418",
    accentTint: "#F6E7DD",
    onAccent: "#FFFFFF",
    secondary: "#2E6B46",
    border: "#E9DFCC",
    borderStrong: "#CDBFA3",
    mediaBg: "#F1E8D9",
    shade: "rgba(43, 39, 33, 0.68)",
    focus: "#A84D2E",
    selectionBg: "#F0D3C3",
    selectionInk: "#7C3418",
    scrollbarTrack: "#F1E9DB",
    scrollbarThumb: "#D2BCA6",
    scrollbarThumbHover: "#A84D2E",
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
      "linear-gradient(180deg, rgba(43, 39, 33, 0.12) 0%, rgba(43, 39, 33, 0.34) 55%, rgba(43, 39, 33, 0.68) 100%)",
    navScrim:
      "linear-gradient(180deg, rgba(43, 39, 33, 0.62) 0%, rgba(43, 39, 33, 0.28) 55%, rgba(43, 39, 33, 0) 100%)",
    navStyle: "transparent",
    contentAlign: "bottom",
  },
  motif: {
    "underline-stroke": "under one key word in the hero heading",
    "chalk-tally": "beside the members-trained stat",
    "ring-scribble": "circling the 4.9 rating",
    "barbell-line": "programs section heading, next pass",
    "plate-outline": "annual plan price, next pass",
    "curved-arrow": "between onboarding steps, next pass",
    "clock-five": "beside the opening hours, next pass",
    "chalk-smudge": "trainer section accent, next pass",
    "knurl-ticks": "section divider accent, next pass",
    "rope-loop": "online classes program, next pass",
  },
};
