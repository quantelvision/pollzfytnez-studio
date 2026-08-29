import { imageSrcSet, imageUrl, isCloudinaryConfigured } from "@/lib/cloudinary";
import { MediaPlaceholder } from "./MediaPlaceholder";

const WIDTHS = [480, 720, 960, 1280];

// A Cloudinary still. The URL is built on the server, so no Cloudinary client
// component is pulled into the bundle. Alt text comes from the asset's
// contextual metadata in Cloudinary, so the client can correct it without a
// deploy. Width and height are always set to reserve the space and avoid shift.
export function CldPicture({
  publicId,
  alt,
  width,
  height,
  sizes,
  placeholderLabel,
  className,
  priority = false,
}: {
  publicId: string | null;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  placeholderLabel: string;
  className?: string;
  priority?: boolean;
}) {
  if (!isCloudinaryConfigured() || !publicId) {
    return <MediaPlaceholder label={placeholderLabel} className={className} />;
  }

  // Cloudinary already serves f_auto and q_auto at the requested width, so
  // next/image would re-optimise an optimised file and pull in a client
  // component. The explicit width and height still reserve the space.
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imageUrl(publicId, width, height)}
      srcSet={imageSrcSet(publicId, WIDTHS, width / height)}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}
