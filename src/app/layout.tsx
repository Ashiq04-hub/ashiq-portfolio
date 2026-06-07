import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import { SITE_URL } from "@/lib/constants";
import { siteInfo } from "@/lib/data";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteInfo.name} | ${siteInfo.title}`,
  description: siteInfo.tagline,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: `${siteInfo.name} | ${siteInfo.title}`,
    description: siteInfo.tagline,
    url: SITE_URL,
    siteName: siteInfo.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: `${siteInfo.name} — ${siteInfo.title}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteInfo.name} | ${siteInfo.title}`,
    description: siteInfo.tagline,
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${hankenGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-[100] focus:rounded focus:border focus:border-primary-container focus:bg-background focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-primary"
        >
          Skip to main content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
