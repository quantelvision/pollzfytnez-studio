import { homeGround } from "./home-ground";
import { redEarth } from "./red-earth";
import type { Theme } from "./types";

// Registry of every theme. Adding a variation: add its file, add one entry here.
export const themes: Record<string, Theme> = {
  [homeGround.id]: homeGround,
  [redEarth.id]: redEarth,
};

// The one value that decides which theme styles the whole site.
export const activeThemeId = "home-ground";

export function getActiveTheme(): Theme {
  const theme = themes[activeThemeId];
  if (!theme) {
    throw new Error(`Active theme "${activeThemeId}" is not registered`);
  }
  return theme;
}

export function getTheme(id: string): Theme | undefined {
  return themes[id];
}

export type { Theme, ThemeColors, TypeRole, TypeStyle, MotifId } from "./types";
export { themeToCssVars, themeStyle } from "./css-vars";
