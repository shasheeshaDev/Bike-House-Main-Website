import { site } from "@/lib/site";

export default function EmptyState({
  headline,
  message,
}: {
  headline: string;
  message: string;
}) {
  return (
    <div className="empty-state">
      <div className="headline">{headline}</div>
      <p>{message}</p>
      <a className="btn btn-ghost" href={site.phoneHref}>
        Call Workshop <span className="arrow" />
      </a>
    </div>
  );
}
