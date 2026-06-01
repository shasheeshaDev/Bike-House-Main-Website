"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

import { useVisualEditingEnvironment } from "next-sanity/hooks";

export function DisableDraftMode() {
  const environment = useVisualEditingEnvironment();
  const searchParams = useSearchParams();
  const isIframe = searchParams.get("iframe") === "true";

  // Don't show the button when inside the Presentation Tool
  if (environment === "presentation-iframe" || environment === "presentation-window") {
    return null;
  }

  // Don't show the button when in iframe mode
  if (isIframe) {
    return null;
  }

  return (
    <a
      className={cn(
        buttonVariants({
          size: "lg",
        }),
        "fixed bottom-4 right-4"
      )}
      href="/api/draft-mode/disable"
    >
      Disable Draft Mode
    </a>
  );
}
