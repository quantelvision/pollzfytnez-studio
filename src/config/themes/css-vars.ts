import { fontCssVariables } from "@/fonts/registry";
import type { Theme } from "./types";

function kebab(value: string): string {
  return value.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);
}

function bezier(points: [number, number, number, number]): string {
  return `cubic-bezier(${points.join(", ")})`;
}

// Flattens a theme into the --t-* custom properties every style resolves through.
// Set on the root element for the active theme, or on a wrapper for a preview.
export function themeToCssVars(theme: Theme): Record<string, string> {
  const vars: Record<string, string> = {};

  for (const [key, value] of Object.entries(theme.colors)) {
    vars[`--t-color-${kebab(key)}`] = value;
  }

  vars["--t-font-display"] = `var(${fontCssVariables[theme.fonts.display]})`;
  vars["--t-font-body"] = `var(${fontCssVariables[theme.fonts.body]})`;

  for (const [role, style] of Object.entries(theme.typeScale)) {
    vars[`--t-type-${role}-family`] =
      style.family === "display" ? "var(--t-font-display)" : "var(--t-font-body)";
    vars[`--t-type-${role}-size`] = style.size;
    vars[`--t-type-${role}-weight`] = String(style.weight);
    vars[`--t-type-${role}-leading`] = style.lineHeight;
    vars[`--t-type-${role}-tracking`] = style.letterSpacing;
    vars[`--t-type-${role}-transform`] = style.transform ?? "none";
  }

  for (const [key, value] of Object.entries(theme.radius)) {
    vars[`--t-radius-${kebab(key)}`] = value;
  }

  vars["--t-spacing-unit"] = theme.spacing.unit;
  vars["--t-spacing-gutter"] = theme.spacing.gutter;
  vars["--t-spacing-section-y"] = theme.spacing.sectionY;
  vars["--t-container"] = theme.spacing.container;

  vars["--t-ease"] = bezier(theme.motion.ease);
  vars["--t-duration-fast"] = `${theme.motion.durationFast}ms`;
  vars["--t-duration-base"] = `${theme.motion.durationBase}ms`;
  vars["--t-duration-slow"] = `${theme.motion.durationSlow}ms`;
  vars["--t-press-scale"] = theme.motion.pressScale;
  vars["--t-ring-width"] = theme.motion.ringWidth;

  vars["--t-hero-scrim"] = theme.hero.scrim;
  vars["--t-hero-nav-scrim"] = theme.hero.navScrim;

  return vars;
}

// React style object carrying the custom properties
export function themeStyle(theme: Theme): React.CSSProperties {
  return themeToCssVars(theme) as React.CSSProperties;
}
