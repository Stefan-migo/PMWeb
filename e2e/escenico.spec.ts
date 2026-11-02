import { test, expect } from "@playwright/test";

test.describe("Escénico page", () => {
  test("shows the portfolio sections", async ({ page }) => {
    await page.goto("/escenico");

    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Pájaro Maca · Artes escénicas",
    );
    await expect(
      page
        .getByRole("navigation", { name: "Navegación principal" })
        .getByRole("link", { name: "Más", exact: true }),
    ).toHaveAttribute("href", "/");
    await expect(page.locator('header img[src*="pajaro-maca-logo"]')).toBeVisible();
    await expect(page.locator('footer img[src*="pajaro-maca-logo"]')).toBeVisible();
    await expect(page.locator("#inicio")).toContainText("ARTES ESCÉNICAS");
    await expect(
      page.locator("header").getByText("ARTES ESCÉNICAS"),
    ).toHaveCount(0);
    await expect(
      page.getByRole("heading", { name: /La escena, un cuerpo vivo\./ }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /De las artes visuales/ }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: /Un lenguaje que viaja\./ })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /Una práctica/ }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: /Hagamos/ })).toBeVisible();
  });

  test("runs the hero carousel and opens the full photograph", async ({ page }) => {
    await page.goto("/escenico");

    const hero = page.locator("#inicio");
    const live = hero.locator("[aria-live='polite']");

    await page.getByRole("button", { name: "Pausar carrusel" }).click();
    await page.getByRole("button", { name: "Fotografía siguiente" }).click();

    await expect(live).toHaveText("Fotografía 2 de 6. Archivo escénico");
    await expect(
      page.getByRole("button", { name: "Ver fotografía 2: Archivo escénico" }),
    ).toHaveAttribute("aria-current", "true");

    const expand = page.getByRole("button", { name: "Ver fotografía completa" });
    await expand.click();

    const viewer = page.getByRole("dialog", { name: "Fotografía escénica completa" });
    await expect(viewer).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(viewer).toBeHidden();
    await expect(expand).toBeFocused();
  });

  test("lists every work from the portfolio document", async ({ page }) => {
    await page.goto("/escenico");

    const works = page.locator("#obras");
    for (const title of [
      "Tensión Superficial",
      "Tres prácticas para habitar",
      "El final de mi carrera",
      "Atlas",
      "Kema",
      "La Taller",
    ]) {
      await expect(works.getByText(title, { exact: true }).first()).toBeVisible();
    }
  });

  test("opens the work sheet without leaving the page", async ({ page }) => {
    await page.goto("/escenico");

    const trigger = page.locator("#obras").getByRole("button", { name: /Tensión Superficial/ });
    await trigger.click();

    const sheet = page.getByRole("dialog", { name: "Tensión Superficial" });
    await expect(sheet).toBeVisible();
    await expect(sheet.getByText("Kattya Soto")).toBeVisible();
    await expect(sheet.getByText("42 minutos")).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(sheet).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("locks the page scroll while a dialog is open", async ({ page }) => {
    await page.goto("/escenico");

    await page.locator("#obras").getByRole("button", { name: /Tensión Superficial/ }).click();
    await expect(page.locator("body")).toHaveCSS("overflow", "hidden");

    await page.keyboard.press("Escape");
    await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  });

  test("opens a work detail from the sheet", async ({ page }) => {
    await page.goto("/escenico");

    await page.locator("#obras").getByRole("button", { name: /Tensión Superficial/ }).click();
    await page
      .getByRole("dialog", { name: "Tensión Superficial" })
      .getByRole("link", { name: /Ver ficha completa/ })
      .click();

    await expect(page).toHaveURL("/escenico/tension-superficial");
  });

  test("opens the scene gallery and steps through the photographs", async ({ page }) => {
    await page.goto("/escenico");

    await page
      .getByRole("button", { name: "Ampliar fotografía 1 de presentaciones en escena" })
      .click();

    const gallery = page.getByRole("dialog", { name: "Visor de fotografías" });
    await expect(gallery.getByText("ARCHIVO ESCÉNICO / 01 — 08")).toBeVisible();

    await page.keyboard.press("ArrowRight");
    await expect(gallery.getByText("ARCHIVO ESCÉNICO / 02 — 08")).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(gallery).toBeHidden();
  });

  test("keeps the art direction credit with its author", async ({ page }) => {
    await page.goto("/escenico/tension-superficial");

    await expect(
      page.getByRole("heading", { name: "Tensión Superficial", level: 1 }),
    ).toBeVisible();

    const credits = page.getByRole("region", { name: "Ficha técnica" });
    await expect(credits.getByText("Kattya Soto", { exact: true })).toBeVisible();
    await expect(credits.getByText("42 minutos", { exact: true })).toBeVisible();
    await expect(credits.getByText("Dirección de arte", { exact: true })).toBeVisible();
    // Macarena holds two roles in this work, so both rows credit her.
    await expect(credits.getByText("Macarena Almeida", { exact: true })).toHaveCount(2);
  });

  test("publishes the announced work as premiered", async ({ page }) => {
    await page.goto("/escenico/el-final-de-mi-carrera");

    await expect(
      page.getByRole("heading", { name: "El final de mi carrera", level: 1 }),
    ).toBeVisible();
    await expect(page.getByText("próximo estreno", { exact: false })).toHaveCount(0);
    await expect(page.getByText("Estrenada", { exact: true })).toBeVisible();
  });
});

test.describe("Escénico mobile navigation", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("opens the menu and closes it with Escape", async ({ page }) => {
    await page.goto("/escenico");

    const toggle = page.getByRole("button", { name: /Menú/ });
    await expect(toggle).toHaveAttribute("aria-expanded", "false");

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByRole("navigation", { name: "Navegación principal" })).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toBeFocused();
  });
});

test.describe("Escénico reduced motion", () => {
  test("starts the carousel paused", async ({ browser, baseURL }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();

    await page.goto(`${baseURL}/escenico`);

    await expect(page.getByRole("button", { name: "Reanudar carrusel" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    await context.close();
  });
});
