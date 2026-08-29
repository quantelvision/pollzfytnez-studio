import { ImageIcon, VideoIcon } from "lucide-react";

// Rendered wherever media would appear while Cloudinary is unconfigured,
// so the site always builds and runs. Sits on mediaBg like real media does.
export function MediaPlaceholder({
  label,
  kind = "image",
  align = "center",
  className,
}: {
  label: string;
  kind?: "image" | "video";
  // "top" keeps the label clear of content overlaid on the slot, like the hero
  align?: "center" | "top";
  className?: string;
}) {
  const Icon = kind === "video" ? VideoIcon : ImageIcon;
  const classes = [
    "flex flex-col items-center gap-3 bg-media-bg text-ink-muted",
    align === "top" ? "justify-start pt-28" : "justify-center",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} role="img" aria-label={label}>
      <Icon aria-hidden="true" className="size-6" />
      <span className="type-small">{label}</span>
    </div>
  );
}
