import Link from "next/link";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero">
          <div className="container">
            <div className="spec-line">Error 404</div>
            <h1>
              Wrong
              <br />
              <span className="red">turn.</span>
            </h1>
            <p className="lead">
              That page isn&apos;t on our floor. It may have been sold, moved, or
              never existed. Head back to the workshop — or call and we&apos;ll
              point you at it.
            </p>
            <div className="hero-ctas">
              <Link className="btn" href="/">
                Back to Home <span className="arrow" />
              </Link>
              <Link className="btn btn-ghost" href="/bikes">
                Browse Bikes <span className="arrow" />
              </Link>
              <a className="btn btn-ghost" href={site.phoneHref}>
                Call Workshop <span className="arrow" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
