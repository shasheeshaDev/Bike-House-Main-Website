import { site } from "@/lib/site";

/**
 * First-load pre-loader: a matte-black curtain carrying the wordmark and a red
 * progress line, which lifts to reveal the page.
 *
 * Entirely CSS-driven — the reveal runs on the compositor via a keyframe
 * animation, so it never depends on JS hydration and never delays LCP or
 * interactivity (a JS curtain would gate content reveal on the main thread).
 * The page sits fully in the DOM beneath it, so crawlers and no-JS visitors
 * see the real content regardless.
 *
 * Typographic rather than logo-led: public/img/logo.png is RGB with no alpha,
 * so it renders as a white tile on the dark ground. Anton at this size carries
 * the brand on its own; swap in a transparent mark here if one is supplied.
 *
 * Mounted in the (site) layout, which persists across client-side navigation —
 * so it plays once per full page load, not on every link click.
 */
export default function Preloader() {
  return (
    <div className="preloader" aria-hidden="true">
      <div className="preloader-inner">
        <span className="preloader-wordmark">{site.name.toUpperCase()}</span>

        <div className="preloader-track">
          <span className="preloader-fill" />
        </div>

        <span className="preloader-eyebrow">{site.brandLine.toUpperCase()}</span>
      </div>
    </div>
  );
}
