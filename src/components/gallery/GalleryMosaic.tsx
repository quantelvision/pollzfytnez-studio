"use client";

import { Play } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { GalleryItem } from "./gallery-types";
import { Lightbox } from "./Lightbox";

// A deliberate mosaic rather than a uniform grid. The six tile pattern covers
// exactly twelve cells of the four column grid, so it tiles without leaving
// holes. Auto placement is left in document order rather than using dense
// packing, because the running order is newest upload first and that has to
// hold on screen.
const SPANS = [
  "sm:col-span-2 sm:row-span-2",
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-1 sm:row-span-1",
  "sm:col-span-2 sm:row-span-1",
  "sm:col-span-2 sm:row-span-1",
  "sm:col-span-2 sm:row-span-1",
];

export function GalleryMosaic({
  items,
  previewCount,
}: {
  items: GalleryItem[];
  previewCount: number;
}) {
  const [openAt, setOpenAt] = useState<number | null>(null);
  const preview = items.slice(0, previewCount);
  const hasMore = items.length > preview.length;

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:auto-rows-[11rem] sm:grid-cols-4 lg:auto-rows-[13rem]">
        {preview.map((item, index) => (
          <li key={item.id} className={SPANS[index % SPANS.length]}>
            <button
              type="button"
              onClick={() => setOpenAt(index)}
              className="group relative block size-full overflow-hidden rounded-media bg-media-bg"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.thumb}
                srcSet={item.thumbSrcSet || undefined}
                sizes="(min-width: 640px) 45vw, 50vw"
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className="size-full object-cover transition-transform ease-brand group-hover:scale-105"
              />

              {item.kind === "video" ? (
                <>
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <span className="flex size-12 items-center justify-center rounded-button bg-ink/60 text-surface">
                      <Play className="size-5" />
                    </span>
                  </span>
                  {item.duration ? (
                    <span className="absolute right-2 bottom-2 rounded-button bg-ink/70 px-2.5 py-1 type-small text-surface">
                      {item.duration}
                    </span>
                  ) : null}
                </>
              ) : null}

              <span className="sr-only">
                {item.kind === "video" ? "Play video" : "View image"}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {hasMore ? (
        <div className="mt-10">
          <Button variant="quiet" onClick={() => setOpenAt(preview.length)}>
            See all {items.length} photos and videos
          </Button>
        </div>
      ) : null}

      {openAt !== null ? (
        <Lightbox
          items={items}
          index={openAt}
          onClose={() => setOpenAt(null)}
          onIndexChange={setOpenAt}
        />
      ) : null}
    </>
  );
}
