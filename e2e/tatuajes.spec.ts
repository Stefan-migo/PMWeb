import { test, expect } from "@playwright/test";

test.describe("Tattoo Section", () => {
  test("should display tattoo landing page", async ({ page }) => {
    await page.goto("/tatuajes");
    await expect(page.getByRole("heading", { name: "Portafolio" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Diseños disponibles" })).toBeVisible();
    await expect(page.getByRole("navigation")).toHaveCount(1);
    await expect(page.locator("footer")).toHaveCount(1);
    await expect(page.getByRole("link", { name: "Ver todos los diseños" })).toHaveAttribute(
      "href",
      "#disenos-disponibles",
    );
  });

  test("should navigate to portafolio", async ({ page }) => {
    await page.goto("/tatuajes");
    await page.getByRole("link", { name: "Ver portafolio completo" }).click();
    await expect(page).toHaveURL("/tatuajes/portafolio");
    await expect(page.getByRole("heading", { name: "Portafolio" })).toBeVisible();
  });

  test("should navigate to cotizar", async ({ page }) => {
    await page.goto("/tatuajes/portafolio");
    await page.locator('nav a[href="/tatuajes/cotizar"]').click();
    await expect(page).toHaveURL("/tatuajes/cotizar");
    await expect(page.getByRole("heading", { name: /Solicitar Cotizaci/ })).toBeVisible();
  });

  test("should navigate to cuidados", async ({ page }) => {
    await page.goto("/tatuajes");
    await page.getByRole("link", { name: "Leer guía de cuidados" }).click();
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
    await expect(page.getByRole("link", { name: "Cotizar", exact: true })).toBeVisible();
    await page.getByLabel("Cerrar menú").click();
  });
});
