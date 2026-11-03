import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * `app/layout.tsx` advertises `/og-image.jpg` as the Open Graph and Twitter card
 * for every route, at 1200x630, but the file was never shipped: every shared
 * link previewed as an empty card on WhatsApp, Instagram and X.
 *
 * These tests pin the asset the social tags promise.
 */
const ogImage = path.join(process.cwd(), "public", "og-image.jpg");
const layoutSource = readFileSync(path.join(process.cwd(), "app", "layout.tsx"), "utf8");

/** Reads the frame size out of the JPEG start-of-frame segment. */
function jpegSize(buffer: Buffer): { width: number; height: number } {
  if (buffer[0] !== 0xff || buffer[1] !== 0xd8) {
    throw new Error("not a JPEG: missing the SOI marker");
  }

  let offset = 2;
  while (offset + 9 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    const marker = buffer[offset + 1];
    // Standalone markers carry no length field.
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      offset += 2;
      continue;
    }

    const length = buffer.readUInt16BE(offset + 2);
    const isStartOfFrame =
      marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker);

    if (isStartOfFrame) {
      return {
        height: buffer.readUInt16BE(offset + 5),
        width: buffer.readUInt16BE(offset + 7),
      };
    }

    offset += 2 + length;
  }

  throw new Error("not a JPEG: no start-of-frame segment");
}

describe("social preview image", () => {
  it("is the file the layout advertises", () => {
    expect(layoutSource).toContain('url: "/og-image.jpg"');
    expect(existsSync(ogImage), "missing public/og-image.jpg").toBe(true);
  });

  it("matches the 1200x630 dimensions declared in the metadata", () => {
    expect(layoutSource).toContain("width: 1200");
    expect(layoutSource).toContain("height: 630");

    const size = jpegSize(readFileSync(ogImage));
    expect(size).toEqual({ width: 1200, height: 630 });
  });

  it("stays small enough for a link preview", () => {
    // WhatsApp drops large cards; every platform keeps an image of this weight.
    expect(statSync(ogImage).size).toBeLessThan(400 * 1024);
  });
});
