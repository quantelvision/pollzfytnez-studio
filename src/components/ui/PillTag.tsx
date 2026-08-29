import type { ReactNode } from "react";

type PillVariant = "accent" | "result";

const variants: Record<PillVariant, string> = {
  // accent tint: informational label chips
  accent: "bg-accent-tint text-accent",
  // clay fill: results the site is showing off, like the free trial
  result: "bg-secondary text-on-accent",
};

export function PillTag({
  children,
  variant = "accent",
  className,
}: {
  children: ReactNode;
  variant?: PillVariant;
  className?: string;
}) {
  const classes = [
    "inline-flex items-center gap-2 rounded-button type-eyebrow px-4 py-2",
    variants[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return <span className={classes}>{children}</span>;
}
