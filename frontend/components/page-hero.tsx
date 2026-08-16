import Link from "next/link";
import JsonLd from "./json-ld";
import { breadcrumbSchema, type Crumb } from "@/lib/seo";

/**
 * Inner-page hero — design `.page-hero`.
 *
 * The trail is passed in explicitly rather than derived from the pathname, so
 * it never links a URL that doesn't exist, and it doubles as BreadcrumbList
 * structured data.
 */
export default function PageHero({
  crumbs,
  heading,
  accent,
  lead,
  children,
}: {
  crumbs: Crumb[];
  heading: string;
  accent?: string;
  lead?: string;
  children?: React.ReactNode;
}) {
  const trail: Crumb[] = [{ name: "Home", path: "/" }, ...crumbs];

  return (
    <section className="page-hero">
      <div className="container">
        <nav aria-label="Breadcrumb" className="crumbs">
          <ol>
            {trail.map((crumb, i) => {
              const last = i === trail.length - 1;
              return (
                <li key={crumb.path}>
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {last ? (
                    <span aria-current="page">{crumb.name}</span>
                  ) : (
                    <Link href={crumb.path}>{crumb.name}</Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <h1>
          {heading}
          {accent && (
            <>
              <br />
              <span className="red">{accent}</span>
            </>
          )}
        </h1>

        {lead && <p className="lead">{lead}</p>}
        {children}
      </div>
      <JsonLd data={breadcrumbSchema(trail)} />
    </section>
  );
}
