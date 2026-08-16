import Link from "next/link";

export interface CtaAction {
  label: string;
  href: string;
  variant?: "primary" | "ghost";
  external?: boolean;
}

/** Bordered CTA panel — copy left, buttons right, red glow off the edge. */
export default function CtaBanner({
  kicker,
  heading,
  body,
  actions,
}: {
  kicker?: string;
  /** Use \n for the design's two-line headings. */
  heading: string;
  body?: string;
  actions: CtaAction[];
}) {
  return (
    <section className="section">
      <div className="container">
        <div className="cta-banner">
          <div>
            {kicker && <span className="kicker">{kicker}</span>}
            <h3>
              {heading.split("\n").map((line, i, all) => (
                <span key={i}>
                  {line}
                  {i < all.length - 1 && <br />}
                </span>
              ))}
            </h3>
            {body && <p>{body}</p>}
          </div>
          <div className="ctas">
            {actions.map((action) =>
              action.external ? (
                <a
                  key={action.label}
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={action.variant === "ghost" ? "btn btn-ghost" : "btn"}
                >
                  {action.label} <span className="arrow" />
                </a>
              ) : (
                <Link
                  key={action.label}
                  href={action.href}
                  className={action.variant === "ghost" ? "btn btn-ghost" : "btn"}
                >
                  {action.label} <span className="arrow" />
                </Link>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
