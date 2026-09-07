import {
  getFolderAssets,
  isCloudinaryConfigured,
  videoPosterBlurUrl,
  videoPosterUrl,
  videoUrl,
} from "@/lib/cloudinary";
import { HeroVideoClient, type HeroClip } from "./HeroVideoClient";
import { MediaPlaceholder } from "./MediaPlaceholder";

// Width capped for the mid-range phones most of this audience uses
const HERO_WIDTH = 1280;

// Every video in the folder plays in turn and then loops back to the first,
// so the client controls the hero reel by what they upload. Footage with no
// alt metadata in Cloudinary is decorative and hidden from screen readers
// rather than announcing a filename. The poster is a frame of the video
// itself, so first paint is never an empty box.
export async function HeroVideo({ folder, className }: { folder: string; className?: string }) {
  const assets = isCloudinaryConfigured() ? await getFolderAssets(folder, "video") : [];

  if (assets.length === 0) {
    return (
      <MediaPlaceholder
        kind="video"
        align="top"
        label={`Hero video appears here once a video is uploaded to the "${folder}" folder in Cloudinary`}
        className={className}
      />
    );
  }

  const clips: HeroClip[] = assets.map((asset) => ({
    src: videoUrl(asset.publicId, HERO_WIDTH),
    poster: videoPosterUrl(asset.publicId, HERO_WIDTH),
    label: asset.alt,
  }));

  return (
    <HeroVideoClient
      clips={clips}
      ground={videoPosterBlurUrl(assets[0].publicId)}
      className={className}
    />
  );
}
