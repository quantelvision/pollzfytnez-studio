import type { ReactNode } from "react";

// Raised surface for content that sits above the page. No shadow: elevation
// is expressed by the raised colour and border, and most things are not elevated.
export function Card({ children, className }: { children: ReactNode; className?: string }) {
  const classes = ["bg-surface-raised rounded-card border border-border", className]
    .filter(Boolean)
    .join(" ");
  return <div className={classes}>{children}</div>;
}
