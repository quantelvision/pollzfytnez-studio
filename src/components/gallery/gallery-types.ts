export interface GalleryItem {
  id: string;
  kind: "image" | "video";
  // grid thumbnail, already cropped by Cloudinary
  thumb: string;
  thumbSrcSet: string;
  // small square for the lightbox thumbnail strip
  strip: string;
  // full size for the lightbox
  full: string;
  // videos only: the file to play, and a poster frame
  videoSrc: string | null;
  poster: string | null;
  alt: string;
  // shown over the media in the lightbox when set in Cloudinary
  title: string | null;
  caption: string | null;
  // mm:ss, videos only
  duration: string | null;
}
