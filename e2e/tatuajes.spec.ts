import { test, expect } from "@playwright/test";

test.describe("Tattoo Section", () => {
  test("should display tattoo landing page", async ({ page }) => {
    await page.goto("/tatuajes");
    await expect(page.getByText("Arte en la piel")).toBeVisible();
  });

  test("should navigate to portafolio", async ({ page }) => {
    await page.goto("/tatuajes");
    await page.getByRole("link", { name: "Ver trabajos" }).click();
    await expect(page).toHaveURL("/tatuajes/portafolio");
    await expect(page.getByRole("heading", { name: "Portafolio" })).toBeVisible();
  });

  test("should navigate to cotizar", async ({ page }) => {
    await page.goto("/tatuajes/portafolio");
    await page.getByRole("link", { name: "Cotizar" }).click();
    await expect(page).toHaveURL("/tatuajes/cotizar");
    await expect(page.getByRole("heading", { name: /Solicitar Cotizaci/ })).toBeVisible();
  });

  test("should navigate to cuidados", async ({ page }) => {
    await page.goto("/tatuajes");
    await page.getByRole("link", { name: "Cuidados" }).click();
    await expect(page).toHaveURL("/tatuajes/cuidados");
    await expect(page.getByText("Primeras 24 horas")).toBeVisible();
  });

  test("portafolio should have filter buttons", async ({ page }) => {
    await page.goto("/tatuajes/portafolio");
    const filterButtons = page.getByRole("tab");
    await expect(filterButtons).toHaveCount(6);
  });

  test("mobile menu should work", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/tatuajes");
    await page.getByLabel("Abrir menú").click();
    await expect(page.getByRole("link", { name: "Cotizar" })).toBeVisible();
    await page.getByLabel("Cerrar menú").click();
  });
});
