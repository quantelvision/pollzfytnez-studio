import type { Theme } from "./types";
import { openScale } from "./type-scales";

// Draft variation, and the only cool one registered. Sea blue leads every interaction and
// coral marks results. It exists so the client can see that bright does not have to mean
// warm, and to give the warm options something to be judged against.
export const marina: Theme = {
  id: "marina",
  name: "Marina",
  status: "draft",
  argument:
    "A cool counterpoint to the warm pair: sea blue leads and coral marks results, on a bright clean surface, to test whether bright has to mean hot.",
  colors: {
    surface: "#F5F9FC",
    surfaceRaised: "#FFFFFF",
    ink: "#12212B",
    inkMuted: "#485D6C",
    accent: "#04628F",
    accentHover: "#035478",
    accentPress: "#023F5C",
    accentTint: "#D6EBF8",
    onAccent: "#FFFFFF",
    secondary: "#C13A22",
    border: "#DDE8EF",
    borderStrong: "#B2C5D2",
    mediaBg: "#E8F1F7",
    shade: "rgba(18, 33, 43, 0.68)",
    focus: "#04628F",
    selectionBg: "#C4E2F5",
    selectionInk: "#023F5C",
    scrollbarTrack: "transparent",
    scrollbarThumb: "#04628F",
    scrollbarThumbHover: "#023F5C",
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
      "linear-gradient(180deg, rgba(18, 33, 43, 0.12) 0%, rgba(18, 33, 43, 0.34) 55%, rgba(18, 33, 43, 0.68) 100%)",
    navScrim:
      "linear-gradient(180deg, rgba(18, 33, 43, 0.62) 0%, rgba(18, 33, 43, 0.28) 55%, rgba(18, 33, 43, 0) 100%)",
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
