import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

// Media is cached for an hour so the page stays statically rendered, which
// means an upload to Cloudinary is not visible until that hour is up. Opening
// this drops the cached lookups, so a swapped photo or video appears on the
// next page load without waiting and without a deploy.
//
// GET, so it can be opened in a phone browser or kept as a bookmark. It is
// disallowed in robots.txt and is not in the sitemap.
export async function GET(): Promise<NextResponse> {
  // Next 16 wants an expiry alongside the tag. Zero means the cached lookups
  // are stale immediately, so the very next request refetches from Cloudinary.
  revalidateTag("cloudinary", { expire: 0 });

  return NextResponse.json({
    cleared: true,
    at: new Date().toISOString(),
    message: "Cloudinary lookups cleared. Reload the site to see new media.",
  });
}
