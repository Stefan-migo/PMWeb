import { describe, expect, it, vi } from "vitest";
vi.mock("server-only", () => ({}));
vi.mock("@/app/_lib/supabase/server", () => ({ getSupabaseServer: vi.fn() }));
import {
  resolveTattooRecords,
  selectPublishedTattoos,
  toAvailableDesigns,
  toPortfolioImages,
} from "@/app/_lib/queries/tattoos";

const records = [
  { id: 1, title: "Draft", slug: "draft", image_path: "/draft.jpg", sort_order: 0, is_published: false },
  { id: 2, title: "Segundo", slug: "segundo", image_path: "/second.jpg", sort_order: 2, is_published: true },
  { id: 3, title: "Primero", slug: "primero", image_path: "/first.jpg", sort_order: 1, is_published: true },
];

describe("tattoo editorial selection", () => {
  it("filters drafts and preserves database order", () => {
    expect(selectPublishedTattoos(records).map((record) => record.slug)).toEqual(["primero", "segundo"]);
  });

  it("maps database metadata without consulting Instagram", () => {
    expect(toPortfolioImages([records[2]])).toEqual([
      { src: "/first.jpg", alt: "Primero" },
    ]);
    expect(toAvailableDesigns([{ ...records[2], description: "Pieza única", style: "Linework", is_available: true }])).toMatchObject([
      { id: "3", name: "Primero", detail: "Pieza única", style: "Linework", status: "Disponible" },
    ]);
  });
});

describe("tattoo database fallback", () => {
  it("uses local content when the database is empty", async () => {
    const fallback = [{ id: 7, title: "Local", slug: "local", image_path: "/local.jpg", sort_order: 0, is_published: true }];
    await expect(resolveTattooRecords(async () => ({ data: [], error: null }), fallback)).resolves.toEqual(fallback);
  });

  it("uses local content when the database is unavailable", async () => {
    const fallback = [{ id: 8, title: "Respaldo", slug: "respaldo", image_path: "/backup.jpg", sort_order: 0, is_published: true }];
    await expect(resolveTattooRecords(async () => ({ data: null, error: new Error("outage") }), fallback)).resolves.toEqual(fallback);
  });
});

describe("tattoo server boundary", () => {
  it("keeps Instagram out of the editorial query", async () => {
    const source = await import("node:fs").then(({ readFileSync }) => readFileSync("app/_lib/queries/tattoos.ts", "utf8"));
    expect(source).not.toContain("instagram");
  });
});
