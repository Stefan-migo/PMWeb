import type { Metadata } from "next";
import { Inter, Space_Grotesk, Cormorant_Garamond } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: {
    default: "PajaroMaca — Artista Visual & Tatuadora",
    template: "%s | PajaroMaca",
  },
  description:
    "Portafolio de arte visual y tatuajes en Santiago, Chile. Explora mi trabajo como artista y tatuadora.",
  keywords: ["arte", "tatuajes", "portafolio", "artista", "Chile", "Santiago", "tatuadora"],
  authors: [{ name: "PajaroMaca" }],
  creator: "PajaroMaca",
  metadataBase: new URL(baseUrl),
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "/",
    siteName: "PajaroMaca",
    title: "PajaroMaca — Artista Visual & Tatuadora",
    description: "Portafolio de arte visual y tatuajes en Santiago, Chile.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PajaroMaca",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PajaroMaca — Artista Visual & Tatuadora",
    description: "Portafolio de arte visual y tatuajes en Santiago, Chile.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${spaceGrotesk.variable} ${cormorant.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://*.r2.dev" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://*.r2.dev" />
      </head>
      <body className="min-h-screen antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
