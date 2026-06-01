import { Poppins, Plus_Jakarta_Sans, Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { fetchSanitySettings } from "@/sanity/lib/fetch";

const fontPoppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

const fontPlusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta-sans",
});

const fontCormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const fontDMSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
});

export async function generateMetadata() {
  const settings = await fetchSanitySettings();
  const faviconUrl = settings?.favicon?.asset?.url;
  return {
    icons: {
      icon: faviconUrl ?? "/favicon.ico",
      shortcut: faviconUrl ?? "/favicon.ico",
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-dmSans antialiased overscroll-none",
          fontPoppins.variable,
          fontPlusJakartaSans.variable,
          fontCormorant.variable,
          fontDMSans.variable,
        )}
      >
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
