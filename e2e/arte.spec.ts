import { test, expect } from "@playwright/test";

const headerNav = (page: import("@playwright/test").Page) =>
  page.getByRole("navigation", { name: "Navegación de arte" });

const footerNav = (page: import("@playwright/test").Page) =>
  page.getByRole("navigation", { name: "Navegación del pie de arte" });

test.describe("Art section", () => {
  test("shows the approved landing with the animated hero", async ({ page }) => {
    await page.goto("/arte");

    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "La vida en otros colores.",
    );
    await expect(page.locator('[aria-roledescription="carrusel"]')).toBeVisible();
    await expect(page.getByRole("heading", { name: /Un mundo para/ })).toBeVisible();
    await expect(page.getByText("15 obras")).toBeVisible();
  });

  test("runs the hero carousel with eight works and no overview link", async ({ page }) => {
    await page.goto("/arte");

    const hero = page.locator('[aria-roledescription="carrusel"]');
    await expect(hero.locator('[aria-roledescription="diapositiva"]')).toHaveCount(8);

    const markers = hero.getByRole("button", { name: /^Ver obra \d\d:/ });
    await expect(markers).toHaveCount(8);
    await expect(markers.first()).toHaveAttribute("aria-current", "true");
    await expect(page.getByText("Ver las seis obras")).toHaveCount(0);
  });

  test("follows the slide colour on the hero and on the header", async ({ page }) => {
    await page.goto("/arte");

    const hero = page.locator('[aria-roledescription="carrusel"]');
    const markers = hero.getByRole("button", { name: /^Ver obra \d\d:/ });
    const header = page.locator("header");

    await expect(hero).toHaveCSS("background-color", "rgb(206, 7, 0)");
    await expect(header).toHaveCSS("color", "rgb(255, 248, 232)");

    // Slide 3 is the first light one, so both the hero and the header invert.
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("ArrowRight");

    await expect(markers.nth(2)).toHaveAttribute("aria-current", "true");
    await expect(hero).toHaveCSS("background-color", "rgb(255, 255, 255)");
    await expect(header).toHaveCSS("color", "rgb(43, 34, 56)");
  });

  test("pauses and resumes the hero reproduction", async ({ page }) => {
    await page.goto("/arte");

    await page.getByRole("button", { name: "Pausar reproducción" }).click();

    const resume = page.getByRole("button", { name: "Reanudar reproducción" });
    await expect(resume).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByText("PAUSA PARA CONTEMPLAR")).toBeVisible();

    await resume.click();
    await expect(page.getByRole("button", { name: "Pausar reproducción" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  test("navigates to the gallery from the section navigation", async ({ page }) => {
    await page.goto("/arte");
    await headerNav(page).getByRole("link", { name: "Obras" }).click();

    await expect(page).toHaveURL("/arte/galeria");
    await expect(page.getByRole("heading", { level: 1, name: "Galería" })).toBeVisible();
    await expect(page.getByRole("button", { name: /^Ver obra 15:/ })).toBeVisible();
  });

  test("navigates to my gaze and leaves the section from the last entry", async ({ page }) => {
    await page.goto("/arte");
    await headerNav(page).getByRole("link", { name: "Mi mirada" }).click();

    await expect(page).toHaveURL("/arte/sobre-mi");
    await expect(page.getByRole("heading", { level: 1, name: /Mi mirada/ })).toBeVisible();
    await expect(page.getByText("Artist statement")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Trayectoria" })).toHaveCount(0);

    const more = headerNav(page).getByRole("link", { name: /Más/ });
    await expect(more).toHaveAttribute("href", "/");
    await expect(headerNav(page).getByRole("link", { name: /Escénico/ })).toHaveCount(0);
  });

  test("keeps the contact pill inside the header over the hero", async ({ page }) => {
    await page.goto("/arte");

    const pill = headerNav(page).getByRole("link", { name: /Conversemos/ });
    await expect(pill).toBeVisible();

    const pillBox = await pill.boundingBox();
    const viewport = page.viewportSize()!;
    // The pill used to lose its horizontal padding to the underline rule, so its
    // text touched the border and the outline read as broken.
    expect(pillBox!.width).toBeGreaterThan(110);
    expect(viewport.width - (pillBox!.x + pillBox!.width)).toBeGreaterThan(30);
  });

  test("navigates to the trajectory", async ({ page }) => {
    await page.goto("/arte");
    await headerNav(page).getByRole("link", { name: "Trayectoria" }).click();

    await expect(page).toHaveURL("/arte/trayectoria");
    await expect(page.getByRole("heading", { level: 1, name: /recorrido/ })).toBeVisible();
    await expect(page.getByText("Actualmente en exhibición")).toBeVisible();
    await expect(page.getByText("Conexiones Contemporáneas")).toBeVisible();
    await expect(page.getByText("Formas del Silencio")).toBeVisible();
  });

  test("reaches the shop from the footer navigation", async ({ page }) => {
    await page.goto("/arte");

    await footerNav(page).getByRole("link", { name: "Tienda" }).click();
    await expect(page).toHaveURL("/arte/tienda");
    await expect(page.getByText("Información de Envíos")).toBeVisible();
  });

  test("redirects the retired exhibitions route to the trajectory", async ({ page }) => {
    await page.goto("/arte/exposiciones");

    await expect(page).toHaveURL("/arte/trayectoria");
    await expect(page.getByText("Actualmente en exhibición")).toBeVisible();
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
