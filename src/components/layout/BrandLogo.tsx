import { site } from "@/config/site";

// The logo is a solid fill, so it needs no plate behind it and reads on the
// hero footage and on the page surface alike. onDark only tones the text
// wordmark, which stands in until a file exists in /public/brand.
const sizes = {
  sm: "h-9",
  md: "h-11",
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

  // flex, not inline-flex: an inline box sits on the text baseline, so the line
  // box adds descender space underneath it and the mark rides high in any bar
  // that centres its contents. w-fit keeps the box on the logo, so the link's
  // hit area and focus ring do not stretch to the width of whatever holds it.
  return (
    <span className={["flex w-fit items-center", className].filter(Boolean).join(" ")}>
      {/* plain img: Cloudinary does not serve this one, and next/image would */}
      {/* re-optimise a file already sized for the largest place it appears */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={logoSrc} alt={site.name} width={600} height={304} className={`${sizes[size]} w-auto`} />
    </span>
  );
}
