import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import {
  buildMediaKey,
  mediaConfig,
  validateMediaInput,
  verifyUploadedObject,
} from "@/app/_lib/media/r2";

describe("R2 media contracts", () => {
  it("accepts configured image types and rejects oversized or unknown files", () => {
    expect(validateMediaInput("image/webp", 5_000_000)).toEqual({ ok: true });
    expect(validateMediaInput("image/svg+xml", 100)).toMatchObject({ ok: false });
    expect(validateMediaInput("image/jpeg", 5_000_001)).toMatchObject({ ok: false });
    expect(validateMediaInput("video/mp4", 50_000_001)).toMatchObject({ ok: false });
  });

  it("builds a scoped, extension-safe, non-colliding key", () => {
    const key = buildMediaKey("art", "record-1", "Mi Obra", "image/jpeg", () => "abc123");
    expect(key).toBe("art/record-1/mi-obra-abc123.jpg");
    expect(buildMediaKey("tattoo", "uuid", "A/B", "image/webp", () => "z")).toBe(
      "tattoo/uuid/a-b-z.webp",
    );
    expect(() => buildMediaKey("../private", "id", "x", "image/jpeg")).toThrow();
  });

  it("uses exact HEAD metadata and rejects missing, wrong size, or wrong content type", async () => {
    const head = vi.fn();
    head.mockResolvedValue({ contentLength: 12, contentType: "image/jpeg" });
    await expect(verifyUploadedObject(head, "art/id/work.jpg", 12, "image/jpeg")).resolves.toEqual({
      ok: true,
    });
    expect(head).toHaveBeenCalledWith("art/id/work.jpg");
    head.mockResolvedValueOnce(null);
    await expect(verifyUploadedObject(head, "missing", 12, "image/jpeg")).resolves.toMatchObject({ ok: false });
    head.mockResolvedValueOnce({ contentLength: 11, contentType: "image/jpeg" });
    await expect(verifyUploadedObject(head, "short", 12, "image/jpeg")).resolves.toMatchObject({ ok: false });
    head.mockResolvedValueOnce({ contentLength: 12, contentType: "image/png" });
    await expect(verifyUploadedObject(head, "wrong-type", 12, "image/jpeg")).resolves.toMatchObject({ ok: false });
  });

  it("keeps credentials server-side and exposes only public configuration", () => {
    expect(mediaConfig().publicUrl).toContain("r2.dev");
    expect(JSON.stringify(mediaConfig())).not.toContain(process.env.R2_SECRET_ACCESS_KEY ?? "__missing__");
  });
});
