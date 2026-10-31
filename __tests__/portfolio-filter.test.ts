import { describe, expect, it } from "vitest";
import { collectStyles, filterByStyle } from "@/app/_lib/tattoo/portfolio-filter";
import { designsForSource, type Tattoo } from "@/app/_lib/queries/tattoos";
import { availableDesigns } from "@/app/_lib/tattoo/designs";

const piece = (style?: string | null) => ({ src: "/x.png", alt: "x", style });

describe("portfolio styles are derived from the data", () => {
  it("offers no filter when no piece carries a style", () => {
    // Today's local fallback: placeholder images without style metadata. A filter
    // here would be a row of buttons that cannot filter anything.
    expect(collectStyles([piece(null), piece(undefined), piece("   ")])).toEqual([]);
    expect(collectStyles([])).toEqual([]);
  });

  it("deduplicates, trims and sorts the styles that do exist", () => {
    const styles = collectStyles([
      piece("Realismo"),
      piece("Blackwork"),
      piece(" Realismo "),
      piece("blackwork"),
      piece("Dotwork"),
      piece(null),
    ]);

    // Free text from the CMS: casing never produces two options for one style,
    // and the first spelling seen is the one shown.
    expect(styles).toEqual(["Blackwork", "Dotwork", "Realismo"]);
  });

  it("returns every piece when no style is selected", () => {
    const items = [piece("Blackwork"), piece("Realismo"), piece(null)];
    expect(filterByStyle(items, null)).toHaveLength(3);
  });

  it("keeps only the selected style, ignoring casing and padding", () => {
    const items = [piece("Blackwork"), piece("Realismo"), piece(" blackwork ")];
    expect(filterByStyle(items, "Blackwork")).toEqual([
      piece("Blackwork"),
      piece(" blackwork "),
    ]);
  });

  it("excludes pieces without a style from a style view", () => {
    const items = [piece("Blackwork"), piece(null), piece(undefined)];
    expect(filterByStyle(items, "Blackwork")).toHaveLength(1);
  });

  it("returns an empty list for a style nobody has", () => {
    expect(filterByStyle([piece("Blackwork")], "Realismo")).toEqual([]);
  });
});

describe("the local collection is a fallback, not data", () => {
  const databaseRecords: Tattoo[] = [
    {
      id: 12,
      title: "Pieza real",
      slug: "pieza-real",
      description: "Descripción real",
      image_path: "/r2/pieza-real.jpg",
      style: "Blackwork",
      sort_order: 0,
      is_published: true,
    },
  ];

  it("serves the local designs when the database returned nothing", () => {
    // The id prefix must not decide this: a real record could not exist here.
    expect(designsForSource([], "fallback")).toBe(availableDesigns);
  });

  it("derives the designs from the database records when they exist", () => {
    const designs = designsForSource(databaseRecords, "database");

    expect(designs).toHaveLength(1);
    expect(designs[0]).toMatchObject({
      id: "12",
      name: "Pieza real",
      src: "/r2/pieza-real.jpg",
      style: "Blackwork",
      status: "Disponible",
    });
  });

  it("hides reserved database pieces from the available catalogue", () => {
    const reserved: Tattoo[] = [
      { ...databaseRecords[0], availability: "Reservado" },
      { ...databaseRecords[0], id: 13, availability: "Disponible" },
    ];

    expect(designsForSource(reserved, "database").map((design) => design.id)).toEqual([
      "13",
    ]);
  });
});
