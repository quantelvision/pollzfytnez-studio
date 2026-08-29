import type { MotifId } from "@/config/themes/types";

// Hand-drawn marks from the studio's own world: chalk, plates, knurling, tallies.
// Paths are deliberately irregular; do not straighten or center them.
// Each mark has one sanctioned home, recorded in the theme's motif map.

interface MarkDef {
  viewBox: string;
  strokeWidth: number;
  paths: string[];
}

const marks: Record<MotifId, MarkDef> = {
  "chalk-tally": {
    viewBox: "0 0 48 32",
    strokeWidth: 3,
    paths: [
      "M6 5 C6.4 12 5.8 20 6.5 27",
      "M16 4.5 C15.6 12 16.3 21 15.8 27.5",
      "M26 5.4 C26.5 13 25.9 20 26.6 26.8",
      "M36 4.8 C35.7 11 36.2 19 35.6 27.2",
      "M2 24 C12 18.4 28 12 44 6.5",
    ],
  },
  "ring-scribble": {
    viewBox: "0 0 64 40",
    strokeWidth: 2.5,
    paths: [
      "M50 8 C36 2.2 12 5 7 18 C3.2 30 20 37.2 36 36 C50 35 60 27 57 17 C55 10.2 46 6 38 7.2",
    ],
  },
  "barbell-line": {
    viewBox: "0 0 96 24",
    strokeWidth: 2.5,
    paths: [
      "M14 12.5 C36 11.4 62 12.9 82 12",
      "M10 4.2 C9.4 9 9.8 16 10.3 20",
      "M15.4 6 C14.9 10 15.3 15 15 18.4",
      "M80.6 6.2 C81 10 80.6 15 81.1 18.2",
      "M86 4.4 C86.5 9 86 16 86.4 20.2",
      "M4.2 9 C3.9 11 4.1 14 4.4 15.4",
      "M91.8 9.2 C92.1 11 91.9 13.6 92.2 15.2",
    ],
  },
  "plate-outline": {
    viewBox: "0 0 48 48",
    strokeWidth: 2.5,
    paths: [
      "M24 4 C12 4.6 4.4 13 5 25 C5.6 36 14 44.3 25 43.6 C36 43 44.2 34.6 43.5 23.5 C42.9 13 34.5 4.8 25.5 4.3",
      "M24 19.5 C21.4 19.8 19.6 21.7 19.9 24.3 C20.2 26.8 22.3 28.4 24.7 28.1 C27 27.8 28.6 25.8 28.2 23.4 C27.9 21.3 26.1 19.7 24.3 19.7",
    ],
  },
  "underline-stroke": {
    viewBox: "0 0 120 16",
    strokeWidth: 3,
    paths: [
      "M4 9 C30 6.2 62 5.6 116 7.8",
      "M28 12.6 C52 10.8 78 10.5 98 11.6",
    ],
  },
  "curved-arrow": {
    viewBox: "0 0 56 48",
    strokeWidth: 2.5,
    paths: [
      "M8 42 C10 26.4 22 12 44 9",
      "M36 4.6 C39 6.2 42 7.8 45.4 9.2 C42.6 11.8 40.4 14.7 38.6 17.6",
    ],
  },
  "clock-five": {
    viewBox: "0 0 44 44",
    strokeWidth: 2.5,
    paths: [
      "M22 4.5 C12 5 4.8 12.4 5.3 22.6 C5.8 32 13.4 39.6 23 39 C32.4 38.4 39.8 30.8 39.2 21.4 C38.7 12.5 31.4 4.6 23 4.6",
      "M22 22 C22.1 17.8 21.9 14.2 22.2 11",
      "M22 22 C24 24.6 25.8 27.2 27.3 29.8",
    ],
  },
  "chalk-smudge": {
    viewBox: "0 0 56 24",
    strokeWidth: 2.5,
    paths: [
      "M6 16 C10 13.6 14 11.8 18 10.4",
      "M14 19 C19 16.6 24 14.6 28.6 13",
      "M24 20.6 C29 18.8 33.6 17 38 15",
      "M44 12.6 C44.4 12.9 44.7 13.2 45 13.6",
      "M49 9.4 C49.3 9.7 49.6 10 49.8 10.4",
    ],
  },
  "knurl-ticks": {
    viewBox: "0 0 96 20",
    strokeWidth: 2.5,
    paths: [
      "M8 16 C9.6 12.2 11.4 8.2 13 4.4",
      "M17.4 15.4 C19.2 11.8 21.4 8.4 23.2 4.8",
      "M28 16.2 C29.8 12.2 31.6 8.2 33.4 4.2",
      "M40.2 15.6 C41.8 12 43.4 8.6 45 5",
      "M50.8 16 C52.6 12.2 54.4 8.4 56 4.6",
      "M63 15.2 C64.6 11.8 66.4 8.4 68 4.9",
      "M72.6 16.3 C74.4 12.3 76.2 8.3 78 4.3",
      "M84.4 15.5 C86 12 87.6 8.4 89.2 4.7",
    ],
  },
  "rope-loop": {
    viewBox: "0 0 64 40",
    strokeWidth: 2.5,
    paths: [
      "M6 34 C14 30 20 22 24 14 C27 8 34 4.6 42 7 C50 9.4 52 18 46 24 C40 30 30 30 26 23 C23.2 17.6 27 11 34 10",
      "M46 24 C50 28 54 31 59 33",
    ],
  },
};

export function Motif({ id, className }: { id: MotifId; className?: string }) {
  const mark = marks[id];
  return (
    <svg
      viewBox={mark.viewBox}
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
    >
      {mark.paths.map((d) => (
        <path
          key={d}
          d={d}
          stroke="currentColor"
          strokeWidth={mark.strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}
