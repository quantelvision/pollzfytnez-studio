// Cloudinary delivery and lookup helpers. Server-side only: the Admin API
// credentials must never reach the browser.
//
// Delivery URLs need only the cloud name. Listing a folder and reading an
// asset's caption metadata need the Admin API key and secret, so the site
// degrades to placeholders when those are missing or rejected.

export type ResourceType = "image" | "video";

export interface CloudinaryAsset {
  publicId: string;
  resourceType: ResourceType;
  width: number;
  height: number;
  // seconds, videos only
  duration: number | null;
  // null when the asset carries no alt metadata in Cloudinary. Callers decide
  // whether to fall back to a readable name or treat the asset as decorative.
  alt: string | null;
  // Contextual metadata the client sets in the Cloudinary console. Field names
  // are documented in docs/media.md; description is accepted as a caption alias.
  title: string | null;
  caption: string | null;
  // When the photo was taken, from EXIF, and when it was uploaded. The gallery
  // orders by the first and falls back to the second. See docs/media.md: an
  // asset that has been through WhatsApp carries no EXIF at all.
  capturedAt: number | null;
  uploadedAt: number;
}

const cloudName = () => process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "";

export function isCloudinaryConfigured(): boolean {
  return Boolean(cloudName());
}

function hasAdminCredentials(): boolean {
  return Boolean(
    cloudName() && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET,
  );
}

// Cloudinary has no ".auto" extension. With f_auto the extension is left off
// entirely and the best format is negotiated from the request headers.
function buildUrl(
  resourceType: ResourceType,
  transformations: string[],
  publicId: string,
  extension?: string,
): string {
  const encoded = publicId.split("/").map(encodeURIComponent).join("/");
  const suffix = extension ? `.${extension}` : "";
  return `https://res.cloudinary.com/${cloudName()}/${resourceType}/upload/${transformations.join(",")}/${encoded}${suffix}`;
}

export function imageUrl(publicId: string, width: number, height?: number): string {
  const transformations = ["f_auto", "q_auto", `w_${width}`];
  if (height) {
    transformations.push(`h_${height}`, "c_fill", "g_auto");
  }
  return buildUrl("image", transformations, publicId);
}

// srcset across the widths a mid-range phone through a desktop actually needs
export function imageSrcSet(publicId: string, widths: number[], aspect?: number): string {
  return widths
    .map((width) => {
      const height = aspect ? Math.round(width / aspect) : undefined;
      return `${imageUrl(publicId, width, height)} ${width}w`;
    })
    .join(", ");
}

export function videoUrl(publicId: string, width: number): string {
  return buildUrl("video", ["f_auto", "q_auto", `w_${width}`], publicId, "mp4");
}

// Poster frame taken from the video itself, so no poster image is ever shipped
export function videoPosterUrl(publicId: string, width: number): string {
  return buildUrl("video", ["so_0", "f_auto", "q_auto", `w_${width}`], publicId, "jpg");
}

// A short, small, silent cut of the video, for a tile that plays in the grid.
// Six seconds at 480 wide with no audio track is around a tenth of the full
// clip, which matters when several tiles play at once on mobile data.
export function videoPreviewUrl(publicId: string): string {
  return buildUrl(
    "video",
    ["so_0", "eo_6", "f_auto", "q_auto:eco", "w_480", "ac_none"],
    publicId,
    "mp4",
  );
}

// The same frame at a size where it arrives almost immediately, blurred so it
// reads as a ground rather than as a broken image. A couple of kilobytes, so it
// paints while the video is still downloading and the hero is never an empty box.
export function videoPosterBlurUrl(publicId: string): string {
  return buildUrl(
    "video",
    ["so_0", "f_auto", "q_auto:low", "w_64", "e_blur:1000"],
    publicId,
    "jpg",
  );
}

interface AssetContext {
  alt?: string;
  title?: string;
  caption?: string;
  description?: string;
}

interface SearchResource {
  public_id: string;
  resource_type: string;
  width?: number;
  height?: number;
  duration?: number;
  created_at?: string;
  // EXIF and similar, requested through with_field. DateTimeOriginal is the
  // capture time; it is absent on anything stripped of its metadata.
  image_metadata?: { DateTimeOriginal?: string; CreateDate?: string };
  // The search API returns the contextual fields flat, the resource API nests
  // them under custom. Both shapes are read so a caption set in the console
  // arrives whichever endpoint answered.
  context?: AssetContext & { custom?: AssetContext };
}

// EXIF writes a date as "YYYY:MM:DD HH:MM:SS", with colons in the date part
// and no timezone, so it is neither ISO nor parseable as it stands. The camera
// clock is read as Chennai time, which is where these are taken.
function exifToTimestamp(value: string | undefined): number | null {
  if (!value) {
    return null;
  }
  const match = value.match(/^(\d{4}):(\d{2}):(\d{2})[ T](\d{2}):(\d{2}):(\d{2})/);
  if (!match) {
    return null;
  }
  const [, year, month, day, hour, minute, second] = match;
  const parsed = Date.parse(`${year}-${month}-${day}T${hour}:${minute}:${second}+05:30`);
  return Number.isNaN(parsed) ? null : parsed;
}

function toAsset(resource: SearchResource): CloudinaryAsset {
  const custom = resource.context?.custom ?? resource.context ?? {};
  return {
    publicId: resource.public_id,
    resourceType: resource.resource_type === "video" ? "video" : "image",
    width: resource.width ?? 0,
    height: resource.height ?? 0,
    duration: typeof resource.duration === "number" ? resource.duration : null,
    alt: custom.alt ?? null,
    title: custom.title ?? null,
    caption: custom.caption ?? custom.description ?? null,
    capturedAt: exifToTimestamp(
      resource.image_metadata?.DateTimeOriginal ?? resource.image_metadata?.CreateDate,
    ),
    uploadedAt: resource.created_at ? Date.parse(resource.created_at) : 0,
  };
}

// Runs a search expression and maps the results. Never throws: an unreachable
// or rejected Admin API returns an empty list and the caller shows a placeholder.
async function search(expression: string, max: number, sortBy: object[]): Promise<CloudinaryAsset[]> {
  if (!hasAdminCredentials()) {
    return [];
  }

  const auth = Buffer.from(
    `${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}`,
  ).toString("base64");

  const url = `https://api.cloudinary.com/v1_1/${cloudName()}/resources/search`;
  const init = {
    method: "POST",
    headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      expression,
      max_results: max,
      with_field: ["context", "image_metadata"],
      sort_by: sortBy,
    }),
  };

  try {
    // Cached for an hour so the page stays statically rendered and a caption
    // edited in Cloudinary appears without a deploy.
    let res = await fetch(url, { ...init, next: { revalidate: 3600, tags: ["cloudinary"] } });

    // A rejected response would otherwise sit in the cache for the full hour and
    // keep serving placeholders after the credentials are fixed, so refresh the
    // entry once instead of trusting the failure.
    if (!res.ok) {
      res = await fetch(url, { ...init, cache: "reload" });
    }

    if (!res.ok) {
      console.warn(
        `Cloudinary search failed with ${res.status}. Check CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET.`,
      );
      return [];
    }

    const data = (await res.json()) as { resources?: SearchResource[] };
    return (data.resources ?? []).map(toAsset);
  } catch {
    return [];
  }
}

// Everything in a folder, images and video together, most recently taken first.
// The search API cannot sort on an EXIF field, so the order is applied here
// after fetching. Anything without a capture time, which is every video and any
// image stripped of its metadata, falls back to when it was uploaded.
export async function getFolderMedia(folder: string, max = 100): Promise<CloudinaryAsset[]> {
  const assets = await search(
    `(resource_type:image OR resource_type:video) AND (folder="${folder}" OR asset_folder="${folder}")`,
    max,
    [{ created_at: "desc" }],
  );
  return [...assets].sort(
    (a, b) => (b.capturedAt ?? b.uploadedAt) - (a.capturedAt ?? a.uploadedAt),
  );
}

// Lists one resource type in a folder, ordered by public id so the choice is
// stable. Used where a single known asset is expected, like the hero reel.
export async function getFolderAssets(
  folder: string,
  resourceType: ResourceType,
  max = 24,
): Promise<CloudinaryAsset[]> {
  return search(
    `resource_type:${resourceType} AND (folder="${folder}" OR asset_folder="${folder}")`,
    max,
    [{ public_id: "asc" }],
  );
}

export async function getFirstFolderAsset(
  folder: string,
  resourceType: ResourceType,
): Promise<CloudinaryAsset | null> {
  const assets = await getFolderAssets(folder, resourceType, 1);
  return assets[0] ?? null;
}
