import { describe, expect, it } from "vitest";
import {
  bio,
  contact,
  directionApproach,
  stageWork,
  timeline,
  works,
} from "@/app/_lib/scenic/content";

/**
 * The source document (docs/Escenico.md) states editorial rules for whoever
 * builds the page. These tests turn them into invariants, so a future edit
 * cannot silently break them.
 */

const DIRECTION_ROLE = /direcci[oó]n art[ií]stica|coreograf[ií]a/i;

/** Every string the page can publish, so editorial notes cannot leak into it. */
const publishedText = [
  ...bio,
  ...directionApproach,
  ...timeline.map((entry) => entry.entry),
  ...stageWork.flatMap((stage) => [stage.name, stage.detail ?? "", stage.roles ?? ""]),
  ...works.flatMap((work) => [
    work.title,
    work.entity ?? "",
    work.summary ?? "",
    work.artDirectionNote ?? "",
    ...work.macarenaRoles,
  ]),
].join("\n");

describe("scenic content: document structure", () => {
  it("keeps the six works the portfolio documents", () => {
    expect(works.map((work) => work.slug)).toEqual([
      "tension-superficial",
      "tres-practicas-para-habitar",
      "el-final-de-mi-carrera",
      "atlas",
      "kema",
      "la-taller",
    ]);
  });

  it("uses unique, URL-safe slugs", () => {
    const slugs = works.map((work) => work.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    }
  });

  it("cites a source page for every work and gives Macarena a role in it", () => {
    for (const work of works) {
      expect(work.sourcePages.length).toBeGreaterThan(0);
      expect(work.macarenaRoles.length).toBeGreaterThan(0);
    }
  });
});

describe("scenic content: roles stay separated (source §1.4)", () => {
  it("never claims artistic or choreographic direction for Macarena when another person holds it", () => {
    for (const work of works) {
      const hasForeignDirection = work.credits.some((credit) =>
        DIRECTION_ROLE.test(credit.role),
      );
      if (!hasForeignDirection) continue;

      for (const role of work.macarenaRoles) {
        expect(role).not.toMatch(DIRECTION_ROLE);
      }
    }
  });

  it("attributes Tensión Superficial's direction to Kattya Soto and art direction to Macarena", () => {
    const work = works.find((entry) => entry.slug === "tension-superficial");
    expect(work).toBeDefined();

    const direction = work?.credits.find((credit) => DIRECTION_ROLE.test(credit.role));
    expect(direction?.person).toBe("Kattya Soto");
    expect(work?.macarenaRoles).toContain("Dirección de arte");
    expect(work?.macarenaRoles).toContain("Creadora intérprete");
  });

  it("attributes El final de mi carrera's direction to Isidora Aguirre", () => {
    const work = works.find((entry) => entry.slug === "el-final-de-mi-carrera");
    const direction = work?.credits.find((credit) => DIRECTION_ROLE.test(credit.role));
    expect(direction?.person).toBe("Isidora Aguirre");
    expect(work?.macarenaRoles).toEqual(["Dirección de arte"]);
  });

  it("keeps both declared roles in Tres prácticas para habitar", () => {
    const work = works.find((entry) => entry.slug === "tres-practicas-para-habitar");
    expect(work?.credits).toEqual([{ role: "Dirección", person: "Carmen Paz" }]);
    expect(work?.macarenaRoles).toEqual([
      "Diseño de vestuario y máscaras",
      "Intérprete",
    ]);
  });
});

describe("scenic content: premiere status (source §9, artist decision)", () => {
  it("publishes El final de mi carrera as premiered", () => {
    const work = works.find((entry) => entry.slug === "el-final-de-mi-carrera");
    expect(work?.status).toBe("premiered");
  });

  it("never announces a premiere as upcoming", () => {
    expect(publishedText).not.toMatch(/pr[oó]ximo estreno/i);
  });

  it("does not publish unconfirmed editorial notes", () => {
    expect(publishedText).not.toMatch(/confirmar|nota editorial|pendiente de confirmaci[oó]n/i);
  });
});

describe("scenic content: contact details", () => {
  it("keeps the contact block consistent", () => {
    expect(contact.instagramUrl).toBe(
      `https://instagram.com/${contact.instagramHandle.replace("@", "")}`,
    );
    expect(contact.email).toContain("@");
    expect(contact.phoneE164).toMatch(/^\+\d{8,15}$/);
    expect(contact.phone.replace(/[\s-]/g, "")).toBe(contact.phoneE164);
  });
});
