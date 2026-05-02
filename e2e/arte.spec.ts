import { test, expect } from "@playwright/test";

test.describe("Art Section", () => {
  test("should display art landing page", async ({ page }) => {
    await page.goto("/arte");
    await expect(page.getByText("Donde el arte cobra vida")).toBeVisible();
  });

  test("should navigate to galeria", async ({ page }) => {
    await page.goto("/arte");
    await page.getByRole("link", { name: "Ver Galería" }).click();
    await expect(page).toHaveURL("/arte/galeria");
    await expect(page.getByRole("heading", { name: "Galería" })).toBeVisible();
  });

  test("should navigate to exposiciones", async ({ page }) => {
    await page.goto("/arte");
    await page.getByRole("link", { name: "Exposiciones" }).click();
    await expect(page).toHaveURL("/arte/exposiciones");
    await expect(page.getByText("Exhibiciones Actuales")).toBeVisible();
  });

  test("should navigate to tienda", async ({ page }) => {
    await page.goto("/arte");
    await page.getByRole("link", { name: "Tienda" }).click();
    await expect(page).toHaveURL("/arte/tienda");
    await expect(page.getByText("Información de Envíos")).toBeVisible();
  });

  test("galeria should have filter buttons", async ({ page }) => {
    await page.goto("/arte/galeria");
    const filterButtons = page.getByRole("tab");
    await expect(filterButtons).toHaveCount(6);
  });

  test("mobile menu should work", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/arte");
    await page.getByLabel("Abrir menú").click();
    await expect(page.getByRole("link", { name: "Exposiciones" })).toBeVisible();
  });
});
