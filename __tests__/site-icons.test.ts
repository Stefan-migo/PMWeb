import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  SITE_ICONS,
  SITE_MANIFEST_PATH,
  SITE_THEME_COLOR,
} from "@/app/_lib/site-icons";

/**
 * The document head pointed at `/favicon.ico` while only that one file existed,
 * so the rest of the brand icon set was a 404 in production. These tests pin the
 * contract: every icon the head advertises, and everything the web manifest
 * advertises, is a real file in `public/`.
 */
const publicFile = (url: string) => path.join(process.cwd(), "public", url);

/** Flattens any icon declaration shape into the local URLs it points at. */
function urlsOf(value: unknown): string[] {
  if (!value) return [];
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(urlsOf);
  if (typeof value === "object" && "url" in value) {
    const url = (value as { url: unknown }).url;
    return typeof url === "string" ? [url] : [];
  }
  return [];
}

const declaredIcons = [
  ...urlsOf(SITE_ICONS.icon),
  ...urlsOf(SITE_ICONS.shortcut),
  ...urlsOf(SITE_ICONS.apple),
];

describe("site icons", () => {
  it("points every declared icon at a file that exists in public/", () => {
    expect(declaredIcons.length).toBeGreaterThan(0);

    for (const url of declaredIcons) {
      const file = publicFile(url);
      expect(existsSync(file), `missing icon file: public${url}`).toBe(true);
      expect(statSync(file).size, `empty icon file: public${url}`).toBeGreaterThan(0);
    }
  });

  it("declares the 16, 32 and 48 px PNGs plus the ICO fallback", () => {
    expect(declaredIcons).toContain("/favicon.ico");

    for (const size of ["16x16", "32x32", "48x48"]) {
      const declared = SITE_ICONS.icon.some(
        (entry) => entry.url === `/favicon-${size}.png` && entry.sizes === size,
      );
      expect(declared, `no ${size} PNG icon declared`).toBe(true);
    }
  });

  it("keeps every icon small enough to be fetched with the document", () => {
    // The logo pack ships a 2.1 MB autotrace SVG; it must never be published as
    // a tab icon.
    const budget = 200 * 1024;

    for (const url of declaredIcons) {
      const { size } = statSync(publicFile(url));
      expect(size, `${url} is ${size} bytes, above the ${budget} byte budget`).toBeLessThan(
        budget,
      );
    }
  });
});

describe("web manifest", () => {
  it("exists where the document head advertises it", () => {
    expect(existsSync(publicFile(SITE_MANIFEST_PATH))).toBe(true);
  });

  it("lists installable icons that exist in public/", () => {
    const manifest = JSON.parse(readFileSync(publicFile(SITE_MANIFEST_PATH), "utf8"));

    expect(Array.isArray(manifest.icons)).toBe(true);
    expect(manifest.icons.length).toBeGreaterThan(0);

    const sizes = manifest.icons.map((icon: { sizes: string }) => icon.sizes);
    expect(sizes).toContain("192x192");
    expect(sizes).toContain("512x512");

    for (const icon of manifest.icons as { src: string; sizes: string }[]) {
      const file = publicFile(icon.src);
      expect(existsSync(file), `manifest points at a missing file: public${icon.src}`).toBe(
        true,
      );
    }
  });

  it("uses the same theme colour as the document viewport", () => {
    const manifest = JSON.parse(readFileSync(publicFile(SITE_MANIFEST_PATH), "utf8"));

    expect(manifest.theme_color.toLowerCase()).toBe(SITE_THEME_COLOR.toLowerCase());
  });
});
