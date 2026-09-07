"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ThemeProvider } from "@/components/theme/ThemeContext";
import { themeStyle, themeToCssVars } from "@/config/themes/css-vars";
import type { Theme } from "@/config/themes/types";

// The showcase control on the preview route. A theme is nothing but a set of
// CSS custom properties on this wrapper, so moving to the next one is a state
// change here and nothing else: the page underneath stays server rendered and
// is never re-fetched or re-rendered, it simply resolves its colours against
// new values.

const NEXT_KEY = "t";

export function ThemeCycler({
  themes,
  initialId,
  children,
}: {
  themes: Theme[];
  initialId: string;
  children: ReactNode;
}) {
  const start = Math.max(
    themes.findIndex((theme) => theme.id === initialId),
    0,
  );
  const [index, setIndex] = useState(start);
  const theme = themes[index];

  const go = useCallback(
    (delta: number) => setIndex((current) => (current + delta + themes.length) % themes.length),
    [themes.length],
  );

  // Keep the address bar on the theme being shown, so the link stays shareable
  // after cycling. replaceState rather than a route change: navigating would
  // throw away the page and re-render it for no reason.
  useEffect(() => {
    window.history.replaceState(null, "", `/preview/${theme.id}`);
  }, [theme.id]);

  // The scrollbar, the text selection colour and the page background behind
  // this wrapper are all painted from the root element, which the layout styles
  // with the active theme. Without this a cycled preview would keep the live
  // site's scrollbar, which is the accent colour and so very visible.
  const rootStyleBeforePreview = useRef<string | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (rootStyleBeforePreview.current === null) {
      rootStyleBeforePreview.current = root.getAttribute("style") ?? "";
    }
    for (const [name, value] of Object.entries(themeToCssVars(theme))) {
      root.style.setProperty(name, value);
    }
  }, [theme]);

  // Hand the root back as it was found, in case the visitor navigates to the
  // live site from here without a full load.
  useEffect(
    () => () => {
      const original = rootStyleBeforePreview.current;
      if (original !== null) {
        document.documentElement.setAttribute("style", original);
      }
    },
    [],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== NEXT_KEY || event.ctrlKey || event.metaKey || event.altKey) {
        return;
      }
      // the contact form is on this page, so a letter being typed is not a shortcut
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable]")) {
        return;
      }
      event.preventDefault();
      go(event.shiftKey ? -1 : 1);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [go]);

  return (
    <div style={themeStyle(theme)} className="min-h-svh bg-surface text-ink">
      <ThemeProvider theme={theme}>{children}</ThemeProvider>

      {/* No visible badge: this is shown to the client full screen, and a panel */}
      {/* in the corner is the one thing on the page that is not the site. The */}
      {/* keyboard shortcut still cycles, and the theme is announced for anyone */}
      {/* who cannot see the change. */}
      <p aria-live="polite" className="sr-only">
        {theme.name} theme, {index + 1} of {themes.length}
      </p>

    </div>
  );
}
