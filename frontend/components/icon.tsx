/**
 * Line icons used by the services grid, feature grid and info blocks.
 *
 * Hand-drawn rather than pulled from a library: the design uses eight bespoke
 * glyphs and shipping an icon package for them would cost more than the paths.
 */
const paths: Record<string, React.ReactNode> = {
  cog: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M4 12H1M23 12h-3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    </>
  ),
  gauge: (
    <>
      <path d="M12 22a10 10 0 1 0-10-10" />
      <path d="M12 12l5-5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </>
  ),
  cpu: (
    <>
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M8 22h8M12 18v4M7 9h5M7 13h3" />
    </>
  ),
  suspension: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
    </>
  ),
  wrench: (
    <>
      <path d="M14.7 6.3a3 3 0 0 0-4.2 0L3 13.8V21h7.2l7.5-7.5a3 3 0 0 0 0-4.2l-3-3Z" />
      <path d="M13 7l4 4" />
    </>
  ),
  droplet: <path d="M12 3c-3 5-5 8-5 11a5 5 0 0 0 10 0c0-3-2-6-5-11Z" />,
  alert: (
    <>
      <path d="M12 2L2 22h20L12 2Z" />
      <path d="M12 10v5M12 18v.5" />
    </>
  ),
  disc: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
    </>
  ),
  check: (
    <>
      <path d="M9 12l2 2 4-4" />
      <circle cx="12" cy="12" r="10" />
    </>
  ),
  star: <path d="M12 2l3.5 7 7.5 1-5.5 5.2L18 23l-6-3.5L6 23l1.5-7.8L2 10l7.5-1L12 2Z" />,
  tools: (
    <>
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <path d="M7 8h6M7 12h4M7 16h2M15 12h2M15 16h2" />
    </>
  ),
  receipt: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M9 9h6M9 12h6M9 15h4" />
    </>
  ),
  heart: (
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" />
  ),
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
  ),
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 7 10-7" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 7-8 12-8 12s-8-5-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </>
  ),
  chat: (
    <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.3-.7.3-1.2.2-1.4-.1-.1-.3-.2-.6-.3ZM12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.6 1.4 5.1L2 22l5-1.3c1.4.8 3.1 1.3 5 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2Z" />
  ),
};

export type IconName = keyof typeof paths;

export default function Icon({
  name,
  className = "size-6",
  strokeWidth = 1.4,
  filled = false,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
  filled?: boolean;
}) {
  const glyph = paths[name] ?? paths.wrench;
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {glyph}
    </svg>
  );
}
