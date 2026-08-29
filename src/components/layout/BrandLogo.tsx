import { site } from "@/config/site";

// The logo draws "POLLZ" as a white outline with no fill, so on a light surface
// it needs a dark plate behind it. On dark backgrounds it works as-is.
// This constraint is settled and verified; see docs/business.md.
//
// The plate adds its own padding, so a plated logo carries more visual weight
// at the same image height. Unplated placements are set larger to match.
const sizes = {
  sm: "h-9",
  md: "h-12",
  lg: "h-14",
} as const;

export function BrandLogo({
  logoSrc,
  onDark,
  size = "sm",
  className,
}: {
  logoSrc: string | null;
  onDark: boolean;
  size?: keyof typeof sizes;
  className?: string;
}) {
  if (!logoSrc) {
    const tone = onDark ? "text-surface" : "text-ink";
    return (
      <span className={["type-h3 whitespace-nowrap", tone, className].filter(Boolean).join(" ")}>
        {site.name}
      </span>
    );
  }

  const plate = onDark ? "" : "rounded-button bg-ink px-4 py-2";
  return (
    <span className={["inline-flex items-center", plate, className].filter(Boolean).join(" ")}>
      {/* plain img: the logo's intrinsic size is unknown until the client supplies the file */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logoSrc}
        alt={site.name}
        className={`${sizes[size]} w-auto transition-[height] ease-brand`}
      />
    </span>
  );
}
