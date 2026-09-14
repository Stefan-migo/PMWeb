import { test, expect } from "@playwright/test";

test.describe("Landing Page", () => {
  test("should display all three sections", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Tatuajes", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Escénico", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Arte", exact: true })).toBeVisible();
  });

  test("should navigate to tattoo section", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel("Ir a sección Tatuajes").click();
    await expect(page).toHaveURL("/tatuajes");
  });

  test("should navigate to art section", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel("Ir a sección Arte").click();
    await expect(page).toHaveURL("/arte");
  });
});
