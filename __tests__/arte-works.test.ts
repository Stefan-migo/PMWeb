import { describe, expect, it } from "vitest";
import {
  arteCategories,
  arteCountLabel,
  arteHeroDuration,
  arteHeroWorks,
  arteMiradaWork,
  arteWorks,
  filterArteWorks,
} from "../app/_lib/arte/works";

describe("arte catalogue", () => {
  it("ships the fifteen works of the approved selection in curated order", () => {
    expect(arteWorks).toHaveLength(15);
    expect(arteWorks.map((work) => work.id)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    ]);
    expect(arteWorks.map((work) => work.code)).toEqual([
      "01", "02", "03", "04", "05", "06", "07", "08",
      "09", "10", "11", "12", "13", "14", "15",
    ]);
  });

  it("points every work at its bundled image", () => {
    for (const work of arteWorks) {
      expect(work.src).toBe(`/design/arte/obra-${work.code}.webp`);
      expect(work.width).toBeGreaterThan(0);
      expect(work.height).toBeGreaterThan(0);
      expect(work.alt.length).toBeGreaterThan(0);
    }
  });

  it("presents untitled works as «Sin título»", () => {
    expect(arteWorks.every((work) => work.title === "Sin título")).toBe(true);
  });

  it("keeps every curated category populated", () => {
    const used = new Set(arteWorks.map((work) => work.category));

    expect(arteCategories.filter((category) => category !== "Todas")).toEqual([
      "Cuerpo y naturaleza",
      "Fauna",
      "Símbolos",
    ]);
    for (const category of arteCategories) {
      if (category === "Todas") continue;
      expect(used.has(category)).toBe(true);
    }
  });

  it("selects the mirada work the design places there", () => {
    expect(arteMiradaWork.id).toBe(8);
  });
});

describe("filterArteWorks", () => {
  it("keeps the curated order for Todas", () => {
    expect(filterArteWorks(arteWorks, "Todas")).toEqual(arteWorks);
  });

  it("keeps only the works of the selected category", () => {
    const fauna = filterArteWorks(arteWorks, "Fauna");

    expect(fauna).toHaveLength(4);
    expect(fauna.map((work) => work.id)).toEqual([2, 3, 6, 9]);
  });

  it("returns the curated subset for Símbolos", () => {
    const symbols = filterArteWorks(arteWorks, "Símbolos");

    expect(symbols.map((work) => work.code)).toEqual(["11"]);
  });

  it("returns no works for a category the catalogue does not use", () => {
    const empty = filterArteWorks(arteWorks, "Todas").filter(
      (work) => work.category === "Fauna" && work.id > 100,
    );

    expect(filterArteWorks(empty, "Todas")).toHaveLength(0);
  });
});

describe("arteCountLabel", () => {
  it("uses the plural for zero and many works", () => {
    expect(arteCountLabel(0)).toBe("0 obras");
    expect(arteCountLabel(15)).toBe("15 obras");
  });

  it("uses the singular for one work", () => {
    expect(arteCountLabel(1)).toBe("1 obra");
  });
});

describe("arte hero carousel", () => {
  it("keeps the eight slides of the requested selection in order", () => {
    expect(arteHeroWorks).toHaveLength(8);
    expect(arteHeroWorks.map((work) => work.code)).toEqual([
      "01", "02", "03", "04", "05", "06", "07", "08",
    ]);
    expect(arteHeroDuration).toBe(7200);
  });

  it("serves every hero work from its own bundled asset", () => {
    for (const work of arteHeroWorks) {
      expect(work.src).toBe(`/design/arte/hero/obra-${work.code}.webp`);
      expect(work.alt.length).toBeGreaterThan(0);
      expect(work.bg).toMatch(/^#[0-9a-f]{6}$/);
      expect(work.ink).toMatch(/^#[0-9a-f]{6}$/);
      expect(work.width).toBeGreaterThan(0);
      expect(work.height).toBeGreaterThan(0);
    }
  });

  it("drops the hen of the reference package", () => {
    expect(arteHeroWorks.some((work) => /Gallina/i.test(work.alt))).toBe(false);
    expect(arteHeroWorks.every((work) => !/Estamos bien/i.test(work.alt))).toBe(true);
  });
});
