import { bougainvillea } from "./bougainvillea";
import { homeGround } from "./home-ground";
import { marina } from "./marina";
import { mulberry } from "./mulberry";
import { sunrise } from "./sunrise";
import type { Theme } from "./types";

// Registry of every theme. Adding a variation: add its file, add one entry here.
export const themes: Record<string, Theme> = {
  [homeGround.id]: homeGround,
  [sunrise.id]: sunrise,
  [bougainvillea.id]: bougainvillea,
  [marina.id]: marina,
  [mulberry.id]: mulberry,
};

// Every registered theme, in the order the preview cycles through them.
export const themeList: Theme[] = Object.values(themes);

// The one value that decides which theme styles the whole site.
export const activeThemeId = "sunrise";

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
