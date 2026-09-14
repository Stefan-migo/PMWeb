import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));
vi.mock("@/app/_lib/supabase/server", () => ({ getSupabaseServer: vi.fn() }));

import {
  scenicFormData,
  scenicInputSchema,
  selectPublishedScenicWorks,
} from "@/app/admin/scenic-form";

const records = [
  {
    id: 1,
    title: "Borrador",
    slug: "borrador",
    media_kind: "image" as const,
    media_url: "/draft.jpg",
    sort_order: 0,
    is_published: false,
  },
  {
    id: 2,
    title: "Segundo",
    slug: "segundo",
    media_kind: "video" as const,
    media_url: "https://cdn.example/second.mp4",
    sort_order: 2,
    is_published: true,
  },
  {
    id: 3,
    title: "Primero",
    slug: "primero",
    media_kind: "image" as const,
    media_url: "/first.jpg",
    sort_order: 1,
    is_published: true,
  },
];

describe("scenic editorial selection", () => {
  it("filters drafts and preserves database order", () => {
    expect(selectPublishedScenicWorks(records).map((record) => record.slug)).toEqual([
      "primero",
      "segundo",
    ]);
  });

  it("accepts optional poster, thumbnail, year, and project label", () => {
    expect(
      scenicInputSchema.parse({
        title: "Montaje",
        slug: "montaje",
        description: "Una obra en movimiento",
        media_kind: "video",
        media_key: "scenic/montaje.mp4",
        media_url: "https://cdn.example/montaje.mp4",
        poster_url: "https://cdn.example/montaje.jpg",
        thumbnail_path: "/montaje-thumb.jpg",
        year: "2026",
        project_label: "Festival",
        sort_order: "3",
        is_published: true,
        is_featured: false,
      }),
    ).toMatchObject({ media_kind: "video", year: 2026, project_label: "Festival" });
  });

  it("rejects unsupported media kinds", () => {
    expect(() => scenicInputSchema.parse({ ...records[0], media_kind: "audio" })).toThrow();
  });

  it("normalizes unchecked fields and blank optional values from a form", () => {
    const form = new FormData();
    form.set("title", "Imagen");
    form.set("slug", "imagen");
    form.set("media_kind", "image");
    form.set("media_key", "scenic/imagen.jpg");
    form.set("media_url", "/imagen.jpg");
    form.set("sort_order", "0");
    expect(scenicFormData(form)).toMatchObject({
      media_kind: "image",
      poster_url: null,
      thumbnail_path: null,
      is_published: false,
      is_featured: false,
    });
  });
});
