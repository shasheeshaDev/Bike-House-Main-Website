/**
 * Category glyphs for Shop cards.
 *
 * The Shop was designed without product photography — cards fall back to these
 * when a product has no image.
 */
const paths: Record<string, React.ReactNode> = {
  helmet: (
    <>
      <path d="M12 38c0-12 9-22 20-22s20 10 20 22v8H12v-8Z" />
      <path d="M20 38h32M28 24v8M44 24v8" />
    </>
  ),
  tire: (
    <>
      <circle cx="32" cy="32" r="24" />
      <circle cx="32" cy="32" r="14" />
      <path d="M32 8v8M32 48v8M8 32h8M48 32h8" />
    </>
  ),
  shock: (
    <>
      <rect x="26" y="8" width="12" height="48" rx="2" />
      <path d="M22 16h20M22 24h20M22 32h20M22 40h20M22 48h20" />
    </>
  ),
  exhaust: (
    <>
      <path d="M8 32h36l12-8v16l-12-8" />
      <circle cx="50" cy="32" r="4" />
    </>
  ),
  oil: <path d="M32 8c-8 14-14 22-14 30a14 14 0 0 0 28 0c0-8-6-16-14-30Z" />,
  disc: (
    <>
      <circle cx="32" cy="32" r="24" />
      <circle cx="32" cy="32" r="8" />
      <path d="M32 8v12M32 44v12M8 32h12M44 32h12" />
    </>
  ),
  suit: <path d="M22 12h20l4 12-6 4v28H24V28l-6-4 4-12Z" />,
  chain: (
    <>
      <rect x="10" y="26" width="14" height="12" rx="2" />
      <rect x="26" y="26" width="14" height="12" rx="2" />
      <rect x="42" y="26" width="14" height="12" rx="2" />
    </>
  ),
};

export default function ProductIcon({
  name,
  className,
}: {
  name?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {(name && paths[name]) || paths.tire}
    </svg>
  );
}
