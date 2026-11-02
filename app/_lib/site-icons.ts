import type { Viewport } from "next";

/**
 * Brand icon set, taken verbatim from the supplied logo pack
 * (refs/PAJARO_MACA_LOGO_PACK, folder `05-favicons`) and copied into `public/`
 * as that pack instructs. This module is the single source of truth for the
 * document head, so `__tests__/site-icons.test.ts` can prove that every icon and
 * the manifest it references really exist under `public/`.
 *
 * The pack's `favicon.svg` is deliberately not published: it is a 2.1 MB
 * autotrace of the full 512 px badge, far too heavy for a tab icon and no more
 * legible than the PNGs at 16 px. The PNG ladder plus the multi-resolution ICO
 * cover every browser.
 */
export const SITE_THEME_COLOR = "#170b20";

export const SITE_MANIFEST_PATH = "/site.webmanifest";

/** One `<link rel="icon">` as it lands in the document head. */
export interface SiteIconLink {
  url: string;
  sizes?: string;
  type?: string;
}

export interface SiteIcons {
  icon: SiteIconLink[];
  shortcut: SiteIconLink | string;
  apple: SiteIconLink[];
}

export const SITE_ICONS: SiteIcons = {
  icon: [
    // Multi-resolution ICO: 16, 24, 32, 48, 64, 128 and 256 px.
    { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
    { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
  ],
  shortcut: "/favicon.ico",
  apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
};

/**
 * `themeColor` tints the browser chrome on mobile. The art section overrides it
 * per slide from `arte-hero.tsx`, so this is only the default for every other
 * route. It matches the theme colour declared in `public/site.webmanifest`.
 */
export const SITE_VIEWPORT: Viewport = {
  themeColor: SITE_THEME_COLOR,
};
