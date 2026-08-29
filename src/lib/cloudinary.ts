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
  caption: string | null;
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

interface SearchResource {
  public_id: string;
  resource_type: string;
  width?: number;
  height?: number;
  duration?: number;
  context?: { custom?: { alt?: string; caption?: string } };
}

function toAsset(resource: SearchResource): CloudinaryAsset {
  const custom = resource.context?.custom ?? {};
  return {
    publicId: resource.public_id,
    resourceType: resource.resource_type === "video" ? "video" : "image",
    width: resource.width ?? 0,
    height: resource.height ?? 0,
    duration: typeof resource.duration === "number" ? resource.duration : null,
    alt: custom.alt ?? null,
    caption: custom.caption ?? null,
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

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName()}/resources/search`, {
      method: "POST",
      headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        expression,
        max_results: max,
        with_field: ["context"],
        sort_by: sortBy,
      }),
      cache: "no-store",
    });

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

// Everything in a folder, images and video together, newest upload first.
// Used by the gallery, where recency is the running order.
export async function getFolderMedia(folder: string, max = 100): Promise<CloudinaryAsset[]> {
  return search(
    `(resource_type:image OR resource_type:video) AND (folder="${folder}" OR asset_folder="${folder}")`,
    max,
    [{ created_at: "desc" }],
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
