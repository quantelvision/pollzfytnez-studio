import type { ReactNode } from "react";

type ButtonVariant = "primary" | "quiet" | "onMedia" | "onAccent";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  className?: string;
  // set for external links so they open in a new tab safely
  external?: boolean;
  type?: "button" | "submit";
  ariaLabel?: string;
  disabled?: boolean;
}

// No lift and no shadow on hover. The colour deepens and a flat ring draws
// just outside the pill, then the button compresses slightly on press. The
// ring is a hard box-shadow, so it reads as an outline rather than elevation.
const base =
  "btn-ring inline-flex items-center justify-center gap-2 rounded-button type-button px-6 py-3 select-none transition-[background-color,color,box-shadow,transform] ease-brand active:scale-(--t-press-scale)";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accent text-on-accent hover:bg-accent-hover active:bg-accent-press",
  quiet: "bg-accent-tint text-accent hover:text-accent-hover active:text-accent-press",
  onMedia:
    "border-2 border-surface/60 text-surface hover:border-surface hover:bg-surface hover:text-ink",
  // sits on an accent fill, so it inverts rather than using another colour
  onAccent: "bg-surface text-accent hover:bg-surface-raised",
};

export function Button({
  children,
  href,
  variant = "primary",
  className,
  external = false,
  type = "button",
  ariaLabel,
  disabled = false,
}: ButtonProps) {
  const classes = [base, variants[variant], className].filter(Boolean).join(" ");

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} aria-label={ariaLabel} disabled={disabled}>
      {children}
    </button>
  );
}
