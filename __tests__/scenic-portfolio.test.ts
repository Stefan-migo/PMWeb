import { describe, expect, it } from "vitest";
import {
  featuredWorks,
  fullTimeline,
  internationalStages,
  mainTimeline,
  otherWorks,
  sceneGallery,
  workSheetCredits,
} from "@/app/_lib/scenic/portfolio";
import { stageWork, works } from "@/app/_lib/scenic/content";

describe("scenic portfolio: work sheets", () => {
  it("maps the three featured works to the verified content", () => {
    expect(featuredWorks.map((item) => item.work.slug)).toEqual([
      "tension-superficial",
      "tres-practicas-para-habitar",
      "el-final-de-mi-carrera",
    ]);

    for (const item of featuredWorks) {
      const source = works.find((work) => work.slug === item.work.slug);
      expect(source).toBeDefined();
      expect(item.cover.src).toMatch(/^\/escenico\/assets\/.+\.webp$/);
    }
  });

  it("reconstructs Tres prácticas' art-direction note from its paragraphs", () => {
    const item = featuredWorks.find(
      (entry) => entry.work.slug === "tres-practicas-para-habitar",
    );
    const source = works.find((work) => work.slug === "tres-practicas-para-habitar");

    expect(item).toBeDefined();
    expect(source?.artDirectionNote).toBeDefined();
    expect(item?.intro).toHaveLength(3);
    expect(item?.intro.join(" ")).toBe(source?.artDirectionNote);
  });

  it("opens each work sheet with the foreign direction first and Macarena's art direction next to it", () => {
    const tension = works.find((work) => work.slug === "tension-superficial");
    expect(tension).toBeDefined();
    if (!tension) return;

    const credits = workSheetCredits(tension);
    expect(credits[0]).toEqual({
      role: "Dirección artística y coreografía",
      person: "Kattya Soto",
    });
    expect(credits[1]).toEqual({ role: "Dirección de arte", person: "Macarena Almeida" });
    expect(credits.at(-1)).toEqual({ role: "Duración", person: "42 minutos" });
    expect(credits.filter((credit) => credit.person === "Macarena Almeida")).toHaveLength(2);
  });
});

describe("scenic portfolio: routes and assets", () => {
  it("keeps the other crosses pointing at existing detail pages", () => {
    const slugs = works.map((work) => work.slug);
    expect(otherWorks).toHaveLength(3);
    for (const item of otherWorks) {
      expect(slugs).toContain(item.slug);
    }
  });

  it("serves every photograph from the local scenic asset folder", () => {
    const photos = [
      ...featuredWorks.flatMap((item) => [item.cover, ...item.photos]),
      ...sceneGallery,
      ...internationalStages.map((stage) => stage.photo),
    ];

    expect(photos).toHaveLength(3 + 2 + 2 + 8 + 2);
    for (const photo of photos) {
      expect(photo.src).toMatch(/^\/escenico\/assets\/.+\.webp$/);
      expect(photo.alt.length).toBeGreaterThan(0);
    }
  });

  it("takes the international stages from the verified content", () => {
    expect(internationalStages[0].role).toBe(stageWork[0].roles);
    expect(internationalStages[1].place).toBe(stageWork[1].place);
  });

  it("shows a trajectory with visible and expandable entries", () => {
    expect(mainTimeline.length).toBeGreaterThanOrEqual(4);
    expect(fullTimeline.length).toBeGreaterThanOrEqual(5);

    const periods = [...mainTimeline, ...fullTimeline].map((entry) => entry.period);
    expect(periods).toContain("2014");
    expect(periods).toContain("2010");
  });
});
