"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import type { GalleryItem } from "./gallery-types";

// Built rather than pulled in, so it takes the theme's colours, radii and
// motion tokens directly. Video does not autoplay: browsers block unmuted
// autoplay anyway, and the reduced-motion rule in docs/coding-standards.md
// says nothing plays on its own. The viewer presses play. Behaves like a dialog: focus moves in on open and
// returns to the tile that opened it, Tab is trapped, Escape closes, and the
// arrow keys move through the set.
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
  const item = items[index];

  const go = useCallback(
    (delta: number) => onIndexChange((index + delta + items.length) % items.length),
    [index, items.length, onIndexChange],
  );

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

  const control =
    "btn-ring inline-flex size-12 items-center justify-center rounded-button bg-surface/15 text-surface transition-[background-color,box-shadow,transform] ease-brand hover:bg-surface hover:text-ink active:scale-(--t-press-scale)";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Gallery, item ${index + 1} of ${items.length}`}
      data-on-dark=""
      className="fixed inset-0 z-50 flex flex-col bg-ink"
    >
      <div ref={panelRef} className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-4 px-gutter py-4">
          <p className="type-small text-surface/70">
            {index + 1} of {items.length}
          </p>
          <button type="button" onClick={onClose} className={control}>
            <X aria-hidden="true" className="size-6" />
            <span className="sr-only">Close gallery</span>
          </button>
        </div>

        <div
          className="flex min-h-0 flex-1 items-center justify-center px-gutter"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          {item.kind === "video" && item.videoSrc ? (
            <video
              key={item.id}
              src={item.videoSrc}
              poster={item.poster ?? undefined}
              controls
              playsInline
              className="max-h-full max-w-full rounded-media"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={item.id}
              src={item.full}
              alt={item.alt}
              className="max-h-full max-w-full rounded-media object-contain"
            />
          )}
        </div>

        <div className="flex items-center justify-between gap-4 px-gutter py-5">
          <button type="button" onClick={() => go(-1)} className={control}>
            <ChevronLeft aria-hidden="true" className="size-6" />
            <span className="sr-only">Previous item</span>
          </button>

          <p aria-live="polite" className="min-w-0 flex-1 text-center type-small text-surface/80">
            {item.caption ?? item.alt}
          </p>

          <button type="button" onClick={() => go(1)} className={control}>
            <ChevronRight aria-hidden="true" className="size-6" />
            <span className="sr-only">Next item</span>
          </button>
        </div>
      </div>
    </div>
  );
}
