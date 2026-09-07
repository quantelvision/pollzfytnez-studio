"use client";

import { useEffect, useRef, useState } from "react";

export interface HeroClip {
  src: string;
  poster: string;
  label: string | null;
}

// Plays the folder's clips one after another and wraps back to the first.
// Autoplay is never set as an attribute: playback starts here only when the
// visitor has not asked for reduced motion, who instead keeps the poster.
//
// A blurred frame of the first clip sits underneath as the ground. A video
// element paints nothing until it has a poster or a frame, and on mobile data
// that leaves an empty box for as long as the download takes, so the ground
// arrives in a couple of kilobytes and holds the space with the right colours.
export function HeroVideoClient({
  clips,
  ground,
  className,
}: {
  clips: HeroClip[];
  ground: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [index, setIndex] = useState(0);
  const [allowed, setAllowed] = useState(false);
  const clip = clips[index];

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAllowed(!query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video) {
      return;
    }
    if (!allowed) {
      video.pause();
      return;
    }
    video.muted = true;
    video.play().catch(() => {});
  }, [allowed, index]);

  // Warm the next clip so the cut between them does not stall
  const next = clips[(index + 1) % clips.length];

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={ground}
        alt=""
        aria-hidden="true"
        loading="eager"
        decoding="async"
        fetchPriority="high"
        className={className}
      />
      <video
        ref={ref}
        key={clip.src}
        className={className}
        src={clip.src}
        poster={clip.poster}
        muted
        playsInline
        preload="metadata"
        onEnded={() => setIndex((current) => (current + 1) % clips.length)}
        {...(clip.label ? { "aria-label": clip.label } : { "aria-hidden": true })}
      />
      {clips.length > 1 && next ? <link rel="prefetch" as="video" href={next.src} /> : null}
    </>
  );
}
