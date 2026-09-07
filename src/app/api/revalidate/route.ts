import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

// Media is cached for an hour so the page stays statically rendered, which
// means an upload to Cloudinary is not visible until that hour is up. This
// drops the cached lookups on request, so the client can swap a video or a
// photo and see it immediately without a deploy.
//
// POST /api/revalidate with the secret, either as a bearer token or as a
// ?secret= query so it can be triggered from a phone browser.
export async function POST(request: Request): Promise<NextResponse> {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "REVALIDATE_SECRET is not set, so this endpoint is disabled." },
      { status: 501 },
    );
  }

  const bearer = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const provided = bearer ?? new URL(request.url).searchParams.get("secret");
  if (provided !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Next 16 wants an expiry alongside the tag. Zero means the cached lookups
  // are stale immediately, so the very next request refetches from Cloudinary.
  revalidateTag("cloudinary", { expire: 0 });
  return NextResponse.json({ revalidated: true, at: new Date().toISOString() });
}
