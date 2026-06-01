// Meta Pixel tracking utilities
// Learn more: https://developers.facebook.com/docs/meta-pixel/

declare global {
  interface Window {
    fbq?: (
      type: string,
      event: string,
      data?: Record<string, string | number | undefined>
    ) => void;
  }
}

interface MetaEventData {
  content_name?: string;
  content_category?: string;
  value?: number;
  currency?: string;
  [key: string]: string | number | undefined;
}

export function trackMetaEvent(eventName: string, data?: MetaEventData): void {
  if (typeof window !== "undefined" && window.fbq) {
    try {
      window.fbq("track", eventName, data);
    } catch (error) {
      console.error("Meta Pixel tracking error:", error);
    }
  }
}

export function trackMetaPageView(): void {
  if (typeof window !== "undefined" && window.fbq) {
    try {
      window.fbq("track", "PageView");
    } catch (error) {
      console.error("Meta Pixel page view tracking error:", error);
    }
  }
}
