import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { artworkInputSchema, selectPublishedArtworks } from "@/app/admin/artwork-form";

const root = resolve(__dirname, "..");

describe("art admin input contract", () => {
  it("rejects invalid artwork payloads", () => {
    const result = artworkInputSchema.safeParse({
      title: "",
      slug: "Not a slug",
      image_path: "javascript:alert(1)",
      sort_order: "nope",
    });

    expect(result.success).toBe(false);
  });

  it("accepts stable media references and curation fields", () => {
    const result = artworkInputSchema.safeParse({
      title: "Blue Bird",
      slug: "blue-bird",
      image_path: "https://images.example/blue-bird.jpg",
      thumbnail_path: "https://images.example/blue-bird-thumb.jpg",
      description: "Oil on canvas",
      medium: "Oil",
      year: "2025",
      sort_order: "2",
      is_published: "on",
      is_featured: "on",
      is_for_sale: "",
      price_cents: "120000",
    });

    expect(result.success).toBe(true);
    if (result.success) expect(result.data.is_published).toBe(true);
  });
});

describe("public artwork selection", () => {
  it("filters drafts and orders published records", () => {
    const records = [
      { id: "draft", sort_order: 0, is_published: false },
      { id: "second", sort_order: 2, is_published: true },
      { id: "first", sort_order: 1, is_published: true },
    ];

    expect(selectPublishedArtworks(records).map(({ id }) => id)).toEqual(["first", "second"]);
  });

  it("keeps media references when selecting published records", () => {
    const record = {
      id: "art-1",
      sort_order: 1,
      is_published: true,
      image_path: "art/art-1.jpg",
      thumbnail_path: "art/art-1-thumb.jpg",
    };

    expect(selectPublishedArtworks([record])[0]).toMatchObject({
      image_path: "art/art-1.jpg",
      thumbnail_path: "art/art-1-thumb.jpg",
    });
  });
});

describe("server query boundary", () => {
  it("does not import the browser Supabase client", () => {
    const source = readFileSync(resolve(root, "app/_lib/queries/artworks.ts"), "utf8");
    expect(source).not.toContain('from "@/app/_lib/supabase/client"');
    expect(source).toContain('from "@/app/_lib/supabase/server"');
  });
});
