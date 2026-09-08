"use client";

import { Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { GalleryItem } from "./gallery-types";

// One tile in the mosaic. The poster is what arrives first, because it is the
// cheapest thing that can appear, and a skeleton holds the space until it has
// decoded. A video tile then loads a short silent cut and plays it on a loop.
//
// The cut is fetched only once the tile is near the screen, and only when
// playing it is reasonable. Scrolling away unmounts the element, which is what
// stops playback and releases the buffer. The audience is mostly on a mid-range Android on
// mobile data, where the full clip is around 3.4MB against 350KB for the cut,
// so a grid of ten autoplaying tiles is a real cost rather than a detail.

// Distance ahead of the viewport at which a preview starts loading
const PRELOAD_MARGIN = "300px";

// The connection API is not in the DOM lib, so the shape it is read through is
// declared here rather than reaching for any.
interface SaveDataConnection {
  saveData?: boolean;
  effectiveType?: string;
}

// Three things stop a tile playing: a visitor who asked for reduced motion, a
// browser reporting data saving, and a connection too slow to be worth it.
function playbackIsWelcome(): boolean {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return false;
  }
  const connection = (navigator as Navigator & { connection?: SaveDataConnection }).connection;
  if (connection?.saveData) {
    return false;
  }
  return !(connection?.effectiveType && /(^|-)2g$/.test(connection.effectiveType));
}

export function GalleryTile({ item, onOpen }: { item: GalleryItem; onOpen: () => void }) {
  const [posterLoaded, setPosterLoaded] = useState(false);
  const [nearScreen, setNearScreen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const tileRef = useRef<HTMLButtonElement>(null);

  const preview = item.kind === "video" ? item.previewSrc : null;

  // Load the cut only while the tile is near the screen, and drop playback
  // again once it is not, so scrolling past does not leave clips running.
  useEffect(() => {
    const node = tileRef.current;
    if (!preview || !node || !playbackIsWelcome()) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setNearScreen(entry.isIntersecting),
      { rootMargin: PRELOAD_MARGIN },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [preview]);

  return (
    <button
      ref={tileRef}
      type="button"
      onClick={onOpen}
      className="group relative block size-full cursor-pointer overflow-hidden rounded-media bg-media-bg"
    >
      {posterLoaded ? null : (
        <span aria-hidden="true" className="media-skeleton absolute inset-0" />
      )}

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.thumb}
        srcSet={item.thumbSrcSet || undefined}
        sizes="(min-width: 640px) 45vw, 50vw"
        alt={item.alt}
        loading="lazy"
        decoding="async"
        // a cached image can finish before React attaches onLoad
        ref={(node) => {
          if (node?.complete) {
            setPosterLoaded(true);
          }
        }}
        onLoad={() => setPosterLoaded(true)}
        onError={() => setPosterLoaded(true)}
        className="size-full object-cover transition-transform ease-brand group-hover:scale-105"
      />

      {preview && nearScreen ? (
        <video
          src={preview}
          poster={item.thumb}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          onPlaying={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          className={`absolute inset-0 size-full object-cover transition-opacity ease-brand ${
            playing ? "opacity-100" : "opacity-0"
          }`}
        />
      ) : null}

      {item.kind === "video" ? (
        <>
          {/* The glyph goes once the tile is visibly playing, since a moving */}
          {/* tile says video by itself. It returns whenever playback does not, */}
          {/* so a video is never mistaken for a photograph. */}
          <span
            aria-hidden="true"
            className={`absolute inset-0 flex items-center justify-center transition-opacity ease-brand ${
              nearScreen && playing ? "opacity-0" : "opacity-100"
            }`}
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

      <span className="sr-only">{item.kind === "video" ? "Play video" : "View image"}</span>
    </button>
  );
}
