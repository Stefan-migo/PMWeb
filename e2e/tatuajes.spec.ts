import { test, expect } from "@playwright/test";

test.describe("Tattoo Section", () => {
  test("should display tattoo landing page", async ({ page }) => {
    await page.goto("/tatuajes", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("heading", { name: "Portafolio" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Diseños disponibles" })).toBeVisible();
    await expect(page.getByRole("navigation")).toHaveCount(1);
    await expect(page.locator("footer")).toHaveCount(1);
    await expect(page.getByRole("link", { name: "Ver todos los diseños" })).toHaveAttribute(
      "href",
      "/tatuajes/disenos-disponibles",
    );
  });

  test("should navigate to portafolio", async ({ page }) => {
    await page.goto("/tatuajes", { waitUntil: "domcontentloaded" });
    await page.getByRole("link", { name: "Ver portafolio completo" }).click();
    await expect(page).toHaveURL("/tatuajes/portafolio");
    await expect(page.getByRole("heading", { name: "Portafolio" })).toBeVisible();
  });

  test("should navigate to cotizar", async ({ page }) => {
    await page.goto("/tatuajes/portafolio");
    await page.locator('nav a[href="/tatuajes/cotizar"]').click();
    await expect(page).toHaveURL("/tatuajes/cotizar");
     await expect(page.getByRole("heading", { name: "Cuéntame tu idea" })).toBeVisible();
     await expect(page.getByRole("link", { name: /WhatsApp/ })).toBeVisible();
  });

  test("should navigate to cuidados", async ({ page }) => {
    await page.goto("/tatuajes", { waitUntil: "domcontentloaded" });
    // The link lives in a client component: retry so the click is never lost before hydration.
    await expect(async () => {
      const guideLink = page.getByRole("link", { name: "Leer guía de cuidados" });
      if (await guideLink.count()) await guideLink.click();
      await expect(page).toHaveURL("/tatuajes/cuidados", { timeout: 2000 });
    }).toPass({ timeout: 20000 });
    await expect(page.getByRole("heading", { name: "Primeras 24 h" })).toBeVisible();
  });

  test("portafolio should have filter buttons", async ({ page }) => {
    await page.goto("/tatuajes/portafolio");
    const filterButtons = page.getByRole("tab");
    await expect(filterButtons).toHaveCount(6);
  });

  test("should display available designs", async ({ page }) => {
    await page.goto("/tatuajes/disenos-disponibles");
    await expect(page.getByRole("heading", { name: "Diseños disponibles" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Botánico" })).toBeVisible();
    await expect(page.getByRole("link", { name: /Consultar este diseño/ }).first()).toHaveAttribute("href", "/tatuajes/cotizar");
  });

  test("secondary pages expose the shared active navigation and contact CTAs", async ({ page }) => {
    await page.goto("/tatuajes/cuidados");
    await expect(page.locator('nav a[href="/tatuajes/cuidados"]')).toHaveAttribute("aria-current", "page");
    await expect(page.getByRole("heading", { name: "Cuida tu tatuaje" })).toBeVisible();
    await expect(page.getByRole("link", { name: /Consultar por WhatsApp/ })).toBeVisible();

    await page.goto("/tatuajes/sobre-mi");
    await expect(page.getByRole("link", { name: /Instagram @pajaro_maca/ })).toHaveAttribute(
      "href",
      "https://instagram.com/pajaro_maca",
    );
  });

  test("mobile menu should work", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/tatuajes", { waitUntil: "domcontentloaded" });
    const openButton = page.getByLabel("Abrir menú");
    const cotizar = page.getByRole("link", { name: "Cotizar", exact: true });
    // The toggle lives in a client component: retry so the click is never lost before hydration.
    await expect(async () => {
      if (await openButton.count()) await openButton.click();
      await expect(cotizar).toBeVisible({ timeout: 1000 });
    }).toPass({ timeout: 20000 });
    await page.getByLabel("Cerrar menú").click();
  });
});
