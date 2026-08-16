import Image from "next/image";
import Link from "next/link";
import { footerColumns, site } from "@/lib/site";

const socials = [
  { label: "Instagram", href: site.social.instagram, path: "M14.5 3.9H7.4A3.5 3.5 0 0 0 3.9 7.4v7.1a3.5 3.5 0 0 0 3.5 3.6h7.1a3.5 3.5 0 0 0 3.6-3.6V7.4a3.5 3.5 0 0 0-3.6-3.5ZM11 14.6A3.6 3.6 0 1 1 14.6 11 3.6 3.6 0 0 1 11 14.6Zm3.8-6.7a.7.7 0 1 1 .7-.7.7.7 0 0 1-.7.7Z" },
  { label: "Facebook", href: site.social.facebook, path: "M12.1 18V11.6h2.1l.3-2.5h-2.4V7.5c0-.7.2-1.2 1.2-1.2h1.3V4.1a17.6 17.6 0 0 0-1.9-.1 3 3 0 0 0-3.2 3.3v1.8H7.4v2.5h2.1V18Z" },
  { label: "YouTube", href: site.social.youtube, path: "M20.6 7.2a2.5 2.5 0 0 0-1.7-1.8C17.3 5 11 5 11 5s-6.3 0-7.9.4a2.5 2.5 0 0 0-1.7 1.8A26 26 0 0 0 1 11a26 26 0 0 0 .4 3.8 2.5 2.5 0 0 0 1.7 1.8c1.6.4 7.9.4 7.9.4s6.3 0 7.9-.4a2.5 2.5 0 0 0 1.7-1.8A26 26 0 0 0 21 11a26 26 0 0 0-.4-3.8ZM9 14V8l5.2 3Z" },
  { label: "WhatsApp", href: site.whatsapp, path: "M15.9 12.9c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.2-.7.8-.8 1-.3.2-.6.1a7.3 7.3 0 0 1-2.1-1.3 8 8 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.5l.4-.5.3-.4v-.5c0-.1-.6-1.5-.9-2s-.4-.5-.6-.5h-.5a1 1 0 0 0-.8.4A3 3 0 0 0 5.5 8a5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.6 4.1 6 6 0 0 0 1.5.5 2.6 2.6 0 0 0 1.7.1 2.8 2.8 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3ZM11 2a9 9 0 0 0-7.7 13.6L2 20l4.5-1.2A9 9 0 1 0 11 2Z" },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="nav-brand">
              <Image src="/img/logo.png" alt="" width={38} height={38} />
              <span className="nav-brand-text">
                {site.name.toUpperCase()}
                <small>{site.brandLine.toUpperCase()}</small>
              </span>
            </Link>
            <p>{site.description}</p>
            <div className="socials">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                >
                  <svg viewBox="0 0 22 22" fill="currentColor" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {footerColumns.map((col) => (
            <div className="footer-col" key={col.title}>
              <h5>{col.title}</h5>
              <ul>
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="footer-col">
            <h5>Contact</h5>
            <ul>
              <li dangerouslySetInnerHTML={{ __html: site.address.line1 }} />
              <li>
                <a href={site.phoneHref}>{site.phone}</a>
              </li>
              <li>
                <a href={site.emailHref}>{site.email}</a>
              </li>
              <li>{site.hoursLine}</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>© {year} {site.legalName}</div>
          <div>
            Built by{" "}
            <a href="https://shashathink.com" target="_blank" rel="noopener noreferrer">
              Shasha Think
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
