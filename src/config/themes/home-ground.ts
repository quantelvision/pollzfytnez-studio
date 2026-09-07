import type { Theme } from "./types";
import { openScale } from "./type-scales";

// The locked direction chosen by the client. Green owns everything interactive,
// clay is reserved for results: the price, the free-trial badge, a stat worth landing on.
export const homeGround: Theme = {
  id: "home-ground",
  name: "Home Ground",
  status: "locked",
  argument:
    "Warm cream, leaf green for action, clay for results. Soft rounded shapes and open type so a mixed neighbourhood room feels welcome.",
  colors: {
    surface: "#FAF9F3",
    surfaceRaised: "#FFFFFF",
    ink: "#232820",
    inkMuted: "#59614E",
    accent: "#2E6B46",
    accentHover: "#245B39",
    accentPress: "#1C4A2E",
    accentTint: "#E7EFE6",
    onAccent: "#FFFFFF",
    secondary: "#A84D2E",
    border: "#E4E1D3",
    borderStrong: "#C7C3AF",
    mediaBg: "#EDEAE0",
    shade: "rgba(35, 40, 32, 0.68)",
    focus: "#2E6B46",
    selectionBg: "#CDE0CE",
    selectionInk: "#1C4A2E",
    scrollbarTrack: "transparent",
    scrollbarThumb: "#2E6B46",
    scrollbarThumbHover: "#1C4A2E",
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
      "linear-gradient(180deg, rgba(35, 40, 32, 0.12) 0%, rgba(35, 40, 32, 0.34) 55%, rgba(35, 40, 32, 0.68) 100%)",
    navScrim:
      "linear-gradient(180deg, rgba(35, 40, 32, 0.62) 0%, rgba(35, 40, 32, 0.28) 55%, rgba(35, 40, 32, 0) 100%)",
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
