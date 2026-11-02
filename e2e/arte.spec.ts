import { test, expect } from "@playwright/test";

const headerNav = (page: import("@playwright/test").Page) =>
  page.getByRole("navigation", { name: "Navegación de arte" });

const footerNav = (page: import("@playwright/test").Page) =>
  page.getByRole("navigation", { name: "Navegación del pie de arte" });

test.describe("Art section", () => {
  test("shows the approved landing", async ({ page }) => {
    await page.goto("/arte");

    await expect(page.getByRole("heading", { level: 1, name: /La vida/ })).toBeVisible();
    await expect(page.getByText("Macarena Almeida · Artes visuales")).toBeVisible();
    await expect(page.getByText("Un universo en expansión")).toBeVisible();
    await expect(page.getByRole("link", { name: /Explorar las obras/ })).toBeVisible();
    await expect(page.getByText("15 obras")).toBeVisible();
  });

  test("navigates to the gallery from the section navigation", async ({ page }) => {
    await page.goto("/arte");
    await headerNav(page).getByRole("link", { name: "Obras" }).click();

    await expect(page).toHaveURL("/arte/galeria");
    await expect(page.getByRole("heading", { level: 1, name: "Galería" })).toBeVisible();
    await expect(page.getByRole("button", { name: /^Ver obra 15:/ })).toBeVisible();
  });

  test("navigates to my gaze and keeps the scenic link internal", async ({ page }) => {
    await page.goto("/arte");
    await headerNav(page).getByRole("link", { name: "Mi mirada" }).click();

    await expect(page).toHaveURL("/arte/sobre-mi");
    await expect(page.getByRole("heading", { level: 1, name: /Sobre/ })).toBeVisible();

    const scenicLink = headerNav(page).getByRole("link", { name: /Escénico/ });
    await expect(scenicLink).toHaveAttribute("href", "/escenico");
  });

  test("reaches exhibitions and shop from the footer navigation", async ({ page }) => {
    await page.goto("/arte");

    await footerNav(page).getByRole("link", { name: "Exposiciones" }).click();
    await expect(page).toHaveURL("/arte/exposiciones");
    await expect(page.getByText("Exhibiciones Actuales")).toBeVisible();

    await footerNav(page).getByRole("link", { name: "Tienda" }).click();
    await expect(page).toHaveURL("/arte/tienda");
    await expect(page.getByText("Información de Envíos")).toBeVisible();
  });

  test("filters the curated works and reports the count", async ({ page }) => {
    await page.goto("/arte/galeria");

    const works = page.getByRole("button", { name: /^Ver obra \d\d:/ });
    await expect(works).toHaveCount(15);

    await page.getByRole("button", { name: "Fauna", exact: true }).click();
    await expect(works).toHaveCount(4);
    await expect(page.getByText("4 obras")).toBeVisible();
    await expect(page.getByRole("button", { name: "Fauna", exact: true })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    await page.getByRole("button", { name: "Todas", exact: true }).click();
    await expect(works).toHaveCount(15);
    await expect(page.getByText("15 obras")).toBeVisible();
  });

  test("opens the viewer with the keyboard and restores the focus on escape", async ({ page }) => {
    await page.goto("/arte/galeria");

    const firstWork = page.getByRole("button", { name: /^Ver obra 01:/ });
    await firstWork.click();

    const viewer = page.getByRole("dialog", { name: "Visor de obras" });
    await expect(viewer).toBeVisible();
    await expect(viewer.getByText("01 / 15")).toBeVisible();

    await page.keyboard.press("ArrowRight");
    await expect(viewer.getByText("02 / 15")).toBeVisible();
    await expect(viewer.getByText("Sin título · 02")).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(viewer).toBeHidden();
    await expect(firstWork).toBeFocused();
    await expect(page.locator("body")).toHaveCSS("overflow", "visible");
  });

  test("opens the mobile menu with an exclusive pressed state", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/arte");

    // The toggle label swaps between «Menú +» and «Cerrar −», so the locator
    // anchors on the relationship it owns instead of its visible text.
    const toggle = page.locator("button[aria-controls='arte-mobile-nav']");
    await expect(toggle).toHaveText("Menú +");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");

    await toggle.click();
    await expect(toggle).toHaveText("Cerrar −");
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(
      page.getByRole("navigation", { name: "Navegación móvil de arte" }).getByRole("link", { name: "Obras" }),
    ).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toHaveText("Menú +");
    await expect(toggle).toBeFocused();
    await expect(
      page.getByRole("navigation", { name: "Navegación móvil de arte" }),
    ).toBeHidden();
  });

  test("keeps the Instagram profile in the section footer", async ({ page }) => {
    await page.goto("/arte");

    const instagram = footerNav(page).getByRole("link", { name: /Instagram/ });
    await expect(instagram).toBeVisible();
    await expect(instagram).toHaveAttribute("href", "https://www.instagram.com/pajaro_maca/");
  });
});
