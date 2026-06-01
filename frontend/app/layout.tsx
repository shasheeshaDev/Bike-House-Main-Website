import { Anton, Barlow_Condensed, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { fetchSanitySettings } from "@/sanity/lib/fetch";

const fontAnton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
});

const fontBarlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow-condensed",
});

const fontManrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
});

const fontJetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
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
          "min-h-screen antialiased overscroll-none",
          fontAnton.variable,
          fontBarlowCondensed.variable,
          fontManrope.variable,
          fontJetBrainsMono.variable,
        )}
      >
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
