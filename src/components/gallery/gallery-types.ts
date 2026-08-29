export interface GalleryItem {
  id: string;
  kind: "image" | "video";
  // grid thumbnail, already cropped by Cloudinary
  thumb: string;
  thumbSrcSet: string;
  // full size for the lightbox
  full: string;
  // videos only: the file to play, and a poster frame
  videoSrc: string | null;
  poster: string | null;
  alt: string;
  caption: string | null;
  // mm:ss, videos only
  duration: string | null;
}
