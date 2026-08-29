"use client";

import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryItem } from "./gallery-types";

// Built rather than pulled in, so it takes the theme's colours, radii and
// motion tokens directly. Behaves like a dialog: focus moves in on open and
// returns to the tile that opened it, Tab is trapped, Escape closes, and the
// arrow keys move through the set. Video does not autoplay: browsers block
// unmuted autoplay anyway, and the reduced-motion rule says nothing plays on
// its own. The viewer presses play.

// How many neighbours either side to fetch ahead of the viewer
const PRELOAD_RADIUS = 2;
// Horizontal travel before a touch counts as a swipe
const SWIPE_THRESHOLD = 50;

export function Lightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onIndexChange: (next: number) => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<Record<number, HTMLButtonElement | null>>({});
  const touchStartX = useRef<number | null>(null);
  // Which items have finished decoding. Derived rather than set from an effect,
  // so revisiting an item never flashes the spinner a second time.
  const [loadedIds, setLoadedIds] = useState<ReadonlySet<string>>(new Set());
  const item = items[index];
  const loading = !loadedIds.has(item.id);

  const markLoaded = useCallback((id: string) => {
    setLoadedIds((previous) => {
      if (previous.has(id)) {
        return previous;
      }
      const next = new Set(previous);
      next.add(id);
      return next;
    });
  }, []);

  const go = useCallback(
    (delta: number) => onIndexChange((index + delta + items.length) % items.length),
    [index, items.length, onIndexChange],
  );

  // Fetch the neighbours so stepping through does not wait on the network
  useEffect(() => {
    for (let offset = -PRELOAD_RADIUS; offset <= PRELOAD_RADIUS; offset += 1) {
      const neighbour = items[(index + offset + items.length) % items.length];
      if (!neighbour || neighbour.kind === "video") {
        continue;
      }
      const image = new Image();
      image.src = neighbour.full;
    }
  }, [index, items]);

  // Keep the current thumbnail in view as the selection moves
  useEffect(() => {
    thumbRefs.current[index]?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [index]);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    panelRef.current?.querySelector<HTMLElement>("button")?.focus();

    // stop the page behind from scrolling while the dialog is up
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key === "ArrowRight") {
        go(1);
        return;
      }
      if (event.key === "ArrowLeft") {
        go(-1);
        return;
      }
      if (event.key !== "Tab") {
        return;
      }
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        "button, video[controls], a[href]",
      );
      if (!focusable || focusable.length === 0) {
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      opener?.focus?.();
    };
  }, [go, onClose]);

  const scrollStrip = (direction: number) => {
    const strip = stripRef.current;
    if (strip) {
      strip.scrollBy({ left: direction * strip.clientWidth * 0.8, behavior: "smooth" });
    }
  };

  const control =
    "btn-ring inline-flex size-11 shrink-0 items-center justify-center rounded-button bg-surface/15 text-surface transition-[background-color,box-shadow,transform] ease-brand hover:bg-surface hover:text-ink active:scale-(--t-press-scale)";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Gallery, item ${index + 1} of ${items.length}`}
      data-on-dark=""
      className="fixed inset-0 z-50 flex flex-col bg-ink"
    >
      <div ref={panelRef} className="flex h-full flex-col">
        <div className="flex shrink-0 items-center justify-between gap-4 px-gutter py-3">
          <p className="type-small text-surface/70">
            {index + 1} of {items.length}
          </p>
          <button type="button" onClick={onClose} className={control}>
            <X aria-hidden="true" className="size-6" />
            <span className="sr-only">Close gallery</span>
          </button>
        </div>

        <div
          className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-gutter"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
          onTouchStart={(event) => {
            touchStartX.current = event.touches[0].clientX;
          }}
          onTouchEnd={(event) => {
            const start = touchStartX.current;
            touchStartX.current = null;
            if (start === null) {
              return;
            }
            const travel = event.changedTouches[0].clientX - start;
            if (Math.abs(travel) > SWIPE_THRESHOLD) {
              go(travel < 0 ? 1 : -1);
            }
          }}
        >
          {loading ? (
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span aria-hidden="true" className="media-spinner" />
              <span className="sr-only">Loading</span>
            </span>
          ) : null}

          {/* The figure shrink wraps the media so the caption sits on the media */}
          {/* itself. The media is bounded in viewport units rather than by a */}
          {/* percentage, which would need a definite height on every ancestor. */}
          <figure className="relative flex max-w-full items-center justify-center">
            {item.kind === "video" && item.videoSrc ? (
              <video
                key={item.id}
                src={item.videoSrc}
                poster={item.poster ?? undefined}
                controls
                playsInline
                preload="metadata"
                onLoadedData={() => markLoaded(item.id)}
                className="max-h-[calc(100svh-13rem)] max-w-full rounded-media"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={item.id}
                // a cached image can finish before React attaches onLoad, so the
                // ref checks the decoded flag as well
                ref={(node) => {
                  if (node?.complete) {
                    markLoaded(item.id);
                  }
                }}
                src={item.full}
                alt={item.alt}
                onLoad={() => markLoaded(item.id)}
                onError={() => markLoaded(item.id)}
                className="max-h-[calc(100svh-13rem)] max-w-full rounded-media object-contain"
              />
            )}

            {item.title || item.caption ? (
              <figcaption className="absolute inset-x-0 bottom-0 rounded-b-media bg-ink/75 px-4 py-3 sm:px-6 sm:py-4">
                {item.title ? <p className="type-h3 text-surface">{item.title}</p> : null}
                {item.caption ? (
                  <p className="mt-1 type-small text-surface/80">{item.caption}</p>
                ) : null}
              </figcaption>
            ) : null}
          </figure>

          <button
            type="button"
            onClick={() => go(-1)}
            className={`${control} absolute top-1/2 left-2 -translate-y-1/2 sm:left-4`}
          >
            <ChevronLeft aria-hidden="true" className="size-6" />
            <span className="sr-only">Previous item</span>
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            className={`${control} absolute top-1/2 right-2 -translate-y-1/2 sm:right-4`}
          >
            <ChevronRight aria-hidden="true" className="size-6" />
            <span className="sr-only">Next item</span>
          </button>
        </div>

        <div className="flex shrink-0 items-center gap-2 px-2 py-3 sm:gap-3 sm:px-gutter sm:py-4">
          <button
            type="button"
            onClick={() => scrollStrip(-1)}
            className={`${control} hidden sm:inline-flex`}
          >
            <ChevronLeft aria-hidden="true" className="size-5" />
            <span className="sr-only">Scroll thumbnails back</span>
          </button>

          <div
            ref={stripRef}
            className="flex min-w-0 flex-1 gap-2 overflow-x-auto scroll-smooth sm:gap-3"
          >
            {items.map((thumb, thumbIndex) => {
              const isCurrent = thumbIndex === index;
              return (
                <button
                  key={thumb.id}
                  type="button"
                  ref={(node) => {
                    thumbRefs.current[thumbIndex] = node;
                  }}
                  onClick={() => onIndexChange(thumbIndex)}
                  aria-current={isCurrent ? "true" : undefined}
                  className={`relative size-14 shrink-0 overflow-hidden rounded-input bg-media-bg transition-opacity ease-brand sm:size-16 ${
                    isCurrent ? "outline-2 outline-surface" : "opacity-55 hover:opacity-100"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={thumb.strip}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover"
                  />
                  {thumb.kind === "video" ? (
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 flex items-center justify-center bg-ink/40 text-surface"
                    >
                      <Play className="size-4" />
                    </span>
                  ) : null}
                  <span className="sr-only">
                    {thumb.kind === "video" ? "Play video" : "View image"} {thumbIndex + 1}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => scrollStrip(1)}
            className={`${control} hidden sm:inline-flex`}
          >
            <ChevronRight aria-hidden="true" className="size-5" />
            <span className="sr-only">Scroll thumbnails forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}
