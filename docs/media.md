# Media

Every photo and video on the site comes from Cloudinary. Nothing is served from the repo except brand assets in /public/brand. There is no local hero/ or gallery/ folder and there must not be one.

## Configuration

Environment variables (see .env.example):

- NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: needed for any delivery URL.
- CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET: server-only Admin API credentials used to read asset metadata. Never NEXT_PUBLIC_.

Unconfigured behaviour: the site builds, lints and runs with zero env vars. Every media slot renders a labelled MediaPlaceholder block on mediaBg. Nothing crashes and nothing blocks `pnpm dev`.

## Folders, not public ids

Assets are looked up by folder, so the client swaps media by uploading a file in Cloudinary with no code change and no deploy. Folder names live in src/config/site.ts under `media`:

| Folder | Used by | Type |
| --- | --- | --- |
| hero | the hero section, first video in the folder | video |
| trainer | the trainer portrait, first image in the folder | image |
| gallery | the gallery section, next pass | image and video |

The lookup is src/lib/cloudinary.ts: `getFolderAssets(folder, resourceType)` and `getFirstFolderAsset(...)`, sorted by public id so the choice is deterministic. Results are cached for an hour, tagged "cloudinary".

Folder listing uses the Admin search API, so it needs CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET. Without working credentials every slot falls back to a labelled placeholder naming the folder it expects.

## Captions and alt text live in Cloudinary, not in code

Alt text and captions are contextual metadata on the asset, editable in the Cloudinary console (Media Library > asset > Metadata > Contextual). Exact field names:

- `alt`: the accessibility description. Required on every image and on labelled video.
- `caption`: the visible caption, optional.

src/lib/cloudinary.ts fetches these through the Admin API with a one hour cache (`revalidate: 3600`, tag "cloudinary"). The client can fix a caption in Cloudinary and it appears within the hour, no deploy. If metadata is missing, a readable fallback is derived from the public id; treat that as a bug to fix in Cloudinary, not a feature.

## Video rules

- Hero and any autoplaying video: muted, loop, playsInline, preload="metadata", always with a poster.
- Posters are Cloudinary transformations of the video itself (getCldImageUrl with assetType "video"), never shipped image files. First paint is never an empty box.
- Autoplay is not set as an HTML attribute. HeroVideoClient starts playback only when prefers-reduced-motion is not set; reduced-motion visitors get the poster.
- Delivery goes through Cloudinary transformations: f_auto, q_auto, width capped at 1280 for the hero (the audience is mostly mid-range Android). Do not raise the cap without measuring.
- URLs are built by hand in src/lib/cloudinary.ts rather than through next-cloudinary. Its CldImage is a client component that uses hooks, which breaks server rendering, and Cloudinary already optimises the file so next/image would re-optimise it. Images render as a plain img with an explicit width, height and a Cloudinary srcset.

## Every media slot

- Sits on a solid mediaBg background so nothing flashes white while loading.
- Uses the theme's media radius (rounded-media) unless full bleed.

## Gallery rule (recorded now, built next pass)

The gallery mixes stills and video clips. Video tiles must be distinguishable without hovering: a persistent play glyph plus a duration tag on the tile, not a hover reveal.

## Adding an asset

1. Upload to the matching folder in Cloudinary (hero, trainer or gallery).
2. Set the `alt` (and optionally `caption`) contextual metadata in the console.
3. Reference the public id from src/config/site.ts.
