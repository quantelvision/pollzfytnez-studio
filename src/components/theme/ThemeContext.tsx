"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Theme } from "@/config/themes/types";

const ThemeCtx = createContext<Theme | null>(null);

// Makes the theme object available to client components, e.g. for Motion tokens.
// The preview route nests a second provider so previews animate with their own tokens.
export function ThemeProvider({ theme, children }: { theme: Theme; children: ReactNode }) {
  return <ThemeCtx.Provider value={theme}>{children}</ThemeCtx.Provider>;
}

export function useTheme(): Theme {
  const theme = useContext(ThemeCtx);
  if (!theme) {
    throw new Error("useTheme must be used inside a ThemeProvider");
  }
  return theme;
}
