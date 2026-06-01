import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LinkWithLabel, ButtonVariant } from "@/sanity.types";

// Extended link type that includes button properties
type LinkType = LinkWithLabel & {
  buttonVariant?: ButtonVariant;
  title?: string;
};

export function LinkButton({
  className,
  link,
  title,
  size = "lg",
  asDiv = false,
}: {
  className?: string;
  link: LinkType;
  title?: string;
  size?: "default" | "sm" | "lg" | "icon";
  asDiv?: boolean;
}) {
  const linkTitle = link.title || link.label;

  return (
    <Button
      asChild
      variant={link?.buttonVariant as any}
      className={className}
      size={size}
    >
      {asDiv ? (
        <div>{linkTitle}</div>
      ) : (
        <Link
          href={link.href || "#"}
          title={title}
          target={link.target ? "_blank" : undefined}
          rel={link.target ? "noopener" : undefined}
        >
          {linkTitle}
        </Link>
      )}
    </Button>
  );
}
