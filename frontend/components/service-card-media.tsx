"use client";

import { useEffect, useRef } from "react";
import type { ServiceBackground } from "@/lib/types";

/**
 * The media layer behind a service card — design `.service-bg`.
 *
 * Division of labour with CSS, deliberately: the overlay opacity is driven
 * entirely by `:hover` and by a `data-active` attribute on the card, so the
 * image case needs no JavaScript at all and renders correctly before (and
 * without) hydration. This component exists only for what CSS cannot do —
 * starting and stopping a video, and deriving the mobile active state.
 *
 * Activation differs by input, because a hover that never ends is worse than
 * no hover at all:
 *
 *  - Pointer devices (`hover: hover`) use the card's own hover, nothing more.
 *  - Touch devices use an IntersectionObserver whose root is collapsed to a
 *    zero-height line 60% of the way down the viewport (`rootMargin`). A card
 *    crossing that line is the active one; in the single-column mobile layout
 *    only one card can cross a line at a time, which is what keeps a single
 *    video playing without any scroll maths.
 *
 * A module-scoped registry pauses every other card's video whenever one starts,
 * so the "one video at a time" guarantee holds even in the two-column tablet
 * layout, where two cards can share the activation line.
 */

/** Every mounted card's video, so activating one can pause the rest. */
const players = new Set<HTMLVideoElement>();

function playExclusively(video: HTMLVideoElement) {
  for (const other of players) {
    if (other !== video && !other.paused) {
      other.pause();
    }
  }
  // Rejects when the browser declines to autoplay. Muted inline playback is
  // normally allowed, but a data-saver or battery-saver mode can refuse it —
  // in which case the poster frame stays, which is the correct fallback.
  void video.play().catch(() => {});
}

function reset(video: HTMLVideoElement) {
  video.pause();
  // Back to the poster frame rather than a frozen mid-clip still.
  try {
    video.currentTime = 0;
  } catch {
    /* Seeking before metadata loads throws in some browsers; harmless. */
  }
}

export default function ServiceCardMedia({
  background,
}: {
  background: ServiceBackground;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const card = root?.closest<HTMLElement>(".service-card");
    if (!root || !card) return;

    const video = videoRef.current;
    if (video) players.add(video);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");

    function activate(on: boolean) {
      card!.dataset.active = on ? "true" : "false";
      if (!video) return;
      // Under reduced motion the overlay still lifts, but nothing moves.
      if (on && !reduceMotion.matches) playExclusively(video);
      else reset(video);
    }

    const onEnter = () => activate(true);
    const onLeave = () => activate(false);

    let observer: IntersectionObserver | null = null;

    function bind() {
      card!.removeEventListener("pointerenter", onEnter);
      card!.removeEventListener("pointerleave", onLeave);
      card!.removeEventListener("focusin", onEnter);
      card!.removeEventListener("focusout", onLeave);
      observer?.disconnect();
      observer = null;
      activate(false);

      if (canHover.matches) {
        card!.addEventListener("pointerenter", onEnter);
        card!.addEventListener("pointerleave", onLeave);
        // Keyboard users get the same reveal as the pointer does.
        card!.addEventListener("focusin", onEnter);
        card!.addEventListener("focusout", onLeave);
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) activate(entry.isIntersecting);
        },
        // Collapse the root to a line at 60% of the viewport height: 60% is
        // trimmed from the top and the remaining 40% from the bottom.
        { rootMargin: "-60% 0% -40% 0%", threshold: 0 },
      );
      observer.observe(card!);
    }

    bind();
    // A device can gain or lose hover (a tablet with a keyboard folio), and
    // the motion preference can change mid-session.
    canHover.addEventListener("change", bind);
    reduceMotion.addEventListener("change", bind);

    return () => {
      canHover.removeEventListener("change", bind);
      reduceMotion.removeEventListener("change", bind);
      card.removeEventListener("pointerenter", onEnter);
      card.removeEventListener("pointerleave", onLeave);
      card.removeEventListener("focusin", onEnter);
      card.removeEventListener("focusout", onLeave);
      observer?.disconnect();
      if (video) {
        players.delete(video);
        video.pause();
      }
      delete card.dataset.active;
    };
  }, []);

  const isVideo = background.kind === "video" && Boolean(background.video);

  return (
    <div className="service-bg" ref={rootRef} aria-hidden="true">
      {isVideo ? (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          // Not `autoPlay`: the card is idle until hovered or scrolled to.
          // `metadata` keeps eight cards from pulling eight clips on load.
          preload="metadata"
          poster={background.image}
          tabIndex={-1}
        >
          <source src={background.video} />
        </video>
      ) : background.image ? (
        // A plain <img> rather than next/image: this is decorative, sits behind
        // an overlay, and is sized by object-fit — so the optimiser's srcset
        // would buy nothing a `loading="lazy"` attribute does not.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={background.image} alt="" loading="lazy" decoding="async" />
      ) : null}
    </div>
  );
}
