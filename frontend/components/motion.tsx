"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Smooth scrolling (Lenis) + entrance animations (GSAP ScrollTrigger).
 *
 * Progressive enhancement, deliberately:
 *
 *  - Nothing is hidden in CSS. The page is fully visible before this runs, so
 *    no-JS visitors and crawlers that don't execute JS get the real content,
 *    and a failed chunk load degrades to a static page rather than a blank one.
 *  - The libraries are imported *inside* the effect, so ~37KB gzipped of
 *    animation runtime is code-split out of the initial bundle and never
 *    blocks hydration or LCP.
 *  - Only elements below the fold are hidden and revealed. Anything already on
 *    screen is left untouched, so hiding it can never cause a flash.
 *  - Under `prefers-reduced-motion` the entire module is skipped — no scroll
 *    hijack, no transforms, and nothing is even downloaded.
 *
 * Lenis rather than GSAP's own ScrollSmoother: ScrollSmoother transforms a
 * wrapper element, and a transformed ancestor becomes the containing block for
 * `position: fixed` descendants. This site has five fixed layers — header,
 * mobile menu, quick-view modal, film-grain overlay and preloader — every one
 * of which would break. Lenis leaves the document untransformed and only
 * drives scrollTop, so fixed positioning and <dialog> keep working natively.
 */

// Derived from the dynamic imports below rather than imported at the top, so
// nothing pulls the runtime into the initial bundle. `gsap` itself is a global
// ambient namespace, so `gsap.Context` needs no import at all.
type GsapApi = (typeof import("gsap"))["default"];
type ScrollTriggerApi = (typeof import("gsap/ScrollTrigger"))["ScrollTrigger"];
type LenisClass = (typeof import("lenis"))["default"];

interface Libs {
  gsap: GsapApi;
  ScrollTrigger: ScrollTriggerApi;
  Lenis: LenisClass;
}

/**
 * Module-scoped so the libraries are fetched and the plugin registered exactly
 * once, however many times the effects below re-run.
 */
let libsPromise: Promise<Libs> | null = null;

function loadLibs(): Promise<Libs> {
  libsPromise ??= Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
    import("lenis"),
  ]).then(([gsapMod, stMod, lenisMod]) => {
    const gsap = gsapMod.default;
    const { ScrollTrigger } = stMod;
    gsap.registerPlugin(ScrollTrigger);
    return { gsap, ScrollTrigger, Lenis: lenisMod.default };
  });
  return libsPromise;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Elements this far down the viewport are safe to hide — they're off screen. */
const BELOW_FOLD = 0.9;

/**
 * True only for the very first page painted this session. Used to run the hero
 * entrance under the pre-loader curtain, and never again on client navigation.
 */
let isFirstPaint = true;

export default function Motion() {
  const pathname = usePathname();

  // ── Smooth scroll ────────────────────────────────────────────────────────
  // Mount-only: the Lenis instance and its ticker outlive route changes.
  useEffect(() => {
    if (prefersReducedMotion()) return;

    let lenis: InstanceType<LenisClass> | undefined;
    let onTick: ((time: number) => void) | undefined;
    let dialogWatcher: MutationObserver | undefined;
    let cancelled = false;

    loadLibs().then(({ gsap, ScrollTrigger, Lenis }) => {
      if (cancelled) return;

      lenis = new Lenis({
        duration: 1.05,
        // Exponential ease-out: quick to respond, long tail to settle.
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        // Touch is left native — mobile momentum scrolling is already good and
        // hijacking it costs responsiveness for no visual gain.
        syncTouch: false,
      });

      // Drive Lenis from GSAP's ticker so scroll and animation share one RAF
      // loop and ScrollTrigger never reads a stale scroll position.
      lenis.on("scroll", ScrollTrigger.update);
      onTick = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);

      // A modal <dialog> makes the background inert, but Lenis listens for
      // wheel events on the document and would happily scroll the page behind
      // it. Pause the virtual scroll for as long as any dialog is open.
      const syncDialogState = () => {
        if (document.querySelector("dialog[open]")) lenis?.stop();
        else lenis?.start();
      };
      dialogWatcher = new MutationObserver(syncDialogState);
      dialogWatcher.observe(document.body, {
        attributes: true,
        attributeFilter: ["open"],
        subtree: true,
        childList: true,
      });
    });

    return () => {
      cancelled = true;
      dialogWatcher?.disconnect();
      if (onTick) libsPromise?.then(({ gsap }) => gsap.ticker.remove(onTick!));
      lenis?.destroy();
    };
  }, []);

  // ── Entrance animations ──────────────────────────────────────────────────
  // Rebuilt per route, since each page has its own elements to reveal.
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const firstPaint = isFirstPaint;
    isFirstPaint = false;

    let ctx: gsap.Context | undefined;
    let cancelled = false;

    loadLibs().then(({ gsap, ScrollTrigger }) => {
      if (cancelled) return;

      // gsap.context() records every tween it creates so revert() can restore
      // the original inline styles wholesale when the route changes.
      ctx = gsap.context(() => {
        const vh = window.innerHeight;
        const isBelowFold = (el: Element) =>
          el.getBoundingClientRect().top > vh * BELOW_FOLD;

        // A reveal inside another reveal would fade twice — the child animates
        // against a parent that is itself still transparent, which reads as a
        // stutter. Guarding here rather than in the markup keeps the tagging
        // safe by construction: a `data-reveal` can be added anywhere without
        // having to know what encloses it.
        const isNested = (el: Element) =>
          el.parentElement?.closest("[data-reveal], [data-reveal-group]") != null;

        const shouldReveal = (el: Element) => isBelowFold(el) && !isNested(el);

        // Hero: plays under the pre-loader curtain on first paint only.
        //
        // The curtain lifts at ~0.87s and is gone by 1.4s. If hydration lands
        // after that window the hero is already on screen, so animating it
        // would be a visible flash — skip it and leave the markup alone.
        const hero = document.querySelector(".hero");
        const elapsed = performance.now() / 1000;
        if (firstPaint && hero && elapsed < 1.25) {
          const parts = [
            ".hero-badges",
            ".hero-display",
            ".hero-tagline",
            ".hero-ctas",
            ".hero-footer",
          ]
            .map((sel) => hero.querySelector(sel))
            .filter((el): el is Element => el !== null);

          gsap
            .timeline({ delay: Math.max(0, 0.8 - elapsed) })
            .from(parts, {
              y: 34,
              opacity: 0,
              duration: 1,
              ease: "power3.out",
              stagger: 0.09,
            });
        }

        // Grids and lists: children rise in sequence as the group scrolls in.
        gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
          const items = gsap.utils.toArray<HTMLElement>(group.children);
          if (!items.length || !shouldReveal(group)) return;

          gsap.from(items, {
            y: 30,
            opacity: 0,
            duration: 0.85,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: { trigger: group, start: "top 88%", once: true },
          });
        });

        // Single blocks: a plain rise-and-fade.
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          if (!shouldReveal(el)) return;

          gsap.from(el, {
            y: 28,
            opacity: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });
      });

      // Images and fonts settling can shift trigger positions.
      ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [pathname]);

  return null;
}
