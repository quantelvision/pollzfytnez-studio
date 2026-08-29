import type { ReactNode } from "react";

// Contained section: vertical rhythm and page gutter from the theme.
// Band backgrounds are passed in via className so the colour still spans full width.
export function Section({
  children,
  id,
  className,
  innerClassName,
  onDark = false,
}: {
  children: ReactNode;
  id?: string;
  className?: string;
  innerClassName?: string;
  // flips the focus ring to the light token for bands with a dark background
  onDark?: boolean;
}) {
  const outer = ["py-section", className].filter(Boolean).join(" ");
  const inner = ["mx-auto max-w-page px-gutter", innerClassName].filter(Boolean).join(" ");
  return (
    <section id={id} className={outer} {...(onDark ? { "data-on-dark": "" } : {})}>
      <div className={inner}>{children}</div>
    </section>
  );
}
