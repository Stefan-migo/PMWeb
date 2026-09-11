import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { isAdminEmail, parseAdminAllowedEmails } from "@/app/_lib/supabase/auth";

const root = resolve(__dirname, "..");
const migration = readFileSync(
  resolve(root, "supabase/migrations/20260911000000_cms_admin.sql"),
  "utf8",
);
const seed = readFileSync(resolve(root, "supabase/seed.sql"), "utf8");

describe("cms schema and seed contract", () => {
  it("defines curation and stable media fields with published anon policies", () => {
    expect(migration).toMatch(/ADD COLUMN IF NOT EXISTS sort_order/);
    expect(migration).toMatch(/ADD COLUMN IF NOT EXISTS is_published/);
    expect(migration).toMatch(/ADD COLUMN IF NOT EXISTS icon_name/);
    expect(migration).toMatch(/ADD COLUMN IF NOT EXISTS location/);
    expect(migration).toMatch(/ADD COLUMN IF NOT EXISTS thumbnail_path/);
    expect(migration).toMatch(/CREATE TABLE IF NOT EXISTS scenic_works/);
    expect(migration).toMatch(/USING \(is_published = true\)/);
    expect(migration).not.toMatch(/USING \(true\)/);
  });

  it("seeds tattoo categories before styles and uses the reconciled about shape", () => {
    expect(seed.indexOf("INSERT INTO tattoo_style_categories")).toBeLessThan(
      seed.indexOf("INSERT INTO tattoo_styles"),
    );
    expect(seed).toContain("section_type");
    expect(seed).toContain("content");
    expect(seed).toContain("is_published");
  });
});

describe("admin authorization contract", () => {
  it("normalizes a comma-separated allowlist without hardcoding an identity", () => {
    expect(parseAdminAllowedEmails(" Artist@Example.com, other@example.com ")).toEqual([
      "artist@example.com",
      "other@example.com",
    ]);
  });

  it("allows only configured users and rejects missing or unauthorized emails", () => {
    const allowlist = parseAdminAllowedEmails("artist@example.com");
    expect(isAdminEmail("artist@example.com", allowlist)).toBe(true);
    expect(isAdminEmail("intruder@example.com", allowlist)).toBe(false);
    expect(isAdminEmail(null, allowlist)).toBe(false);
  });
});
