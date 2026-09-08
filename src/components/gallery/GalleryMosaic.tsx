"use client";

import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { GalleryItem } from "./gallery-types";
import { GalleryTile } from "./GalleryTile";
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
      <ul className="stagger grid grid-cols-2 gap-3 sm:auto-rows-[11rem] sm:grid-cols-4 lg:auto-rows-[13rem]">
        {preview.map((item, index) => (
          <li key={item.id} className={`reveal-settle ${SPANS[index % SPANS.length]}`}>
            <GalleryTile item={item} onOpen={() => setOpenAt(index)} />
          </li>
        ))}
      </ul>

      {hasMore ? (
        <div className="reveal mt-10 flex sm:justify-end">
          <Button variant="quiet" className="cursor-pointer" onClick={() => setOpenAt(preview.length)}>
            See all {items.length} photos and videos
          </Button>
        </div>
      ) : null}

      <AnimatePresence>
        {openAt !== null ? (
          <Lightbox
            items={items}
            index={openAt}
            onClose={() => setOpenAt(null)}
            onIndexChange={setOpenAt}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}
