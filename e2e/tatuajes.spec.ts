import { test, expect } from "@playwright/test";

test.describe("Tattoo Section", () => {
  test("landing keeps the approved hero and every section", async ({ page }) => {
    await page.goto("/tatuajes", { waitUntil: "domcontentloaded" });

    // The approved hero has no visible title: the h1 is for screen readers only.
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveClass(/sr-only/);

    const quote = page.getByRole("link", { name: "Cotizar" });
    await expect(quote).toBeVisible();
    await expect(quote).toHaveAttribute("href", "#cotizar");

    await expect(page.getByRole("button", { name: /^Ver foto/ })).toHaveCount(3);
    await page.getByRole("button", { name: "Ver foto 2" }).click();
    await expect(page.getByRole("button", { name: "Ver foto 2" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    await page.getByRole("button", { name: "Pausar carrusel" }).click();
    await expect(page.getByRole("button", { name: "Reanudar carrusel" })).toBeVisible();

    await expect(page.getByRole("heading", { name: /El arte de/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Una idea esperando/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Una colaboración/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Todo empieza/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: /El cuidado también/ })).toBeVisible();

    await expect(page.getByRole("navigation")).toHaveCount(1);
    await expect(page.locator("footer")).toHaveCount(1);
    await expect(page.getByRole("link", { name: "Ver diseños disponibles" })).toHaveAttribute(
      "href",
      "/tatuajes/disenos-disponibles",
    );
    await expect(page.getByRole("link", { name: /Ver portafolio completo/ })).toHaveAttribute(
      "href",
      "/tatuajes/portafolio",
    );
  });

  test("gallery expands and the viewer moves with the arrow keys", async ({ page }) => {
    await page.goto("/tatuajes", { waitUntil: "domcontentloaded" });

    const works = page.getByRole("button", { name: /^Ver Tatuaje/ });
    await expect(works).toHaveCount(4);
    // Counting buttons is not enough: without a sized frame they render with
    // zero size and the gallery reads as empty.
    await expect(works.first()).toBeVisible();

    await page.getByRole("button", { name: /Ver más tatuajes/ }).click();
    await expect(works).toHaveCount(8);
    await expect(page.getByRole("button", { name: /Ver menos/ })).toHaveAttribute(
      "aria-expanded",
      "true",
    );

    await works.first().click();
    const dialog = page.getByRole("dialog", { name: "Fotografía de tatuaje" });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText("01 / 08 — Tatuaje de corazón y flores")).toBeVisible();

    await page.keyboard.press("ArrowRight");
    await expect(dialog.getByText("02 / 08 — Tatuaje botánico sobre el hombro")).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    // The native dialog returns focus to the work that opened it.
    await expect(works.first()).toBeFocused();
  });

  test("should navigate to portafolio", async ({ page }) => {
    await page.goto("/tatuajes", { waitUntil: "domcontentloaded" });
    await page.getByRole("link", { name: "Ver portafolio completo" }).click();
    await expect(page).toHaveURL("/tatuajes/portafolio");
    await expect(page.getByRole("heading", { name: "Portafolio" })).toBeVisible();
  });

  test("should navigate to cotizar from the header pill", async ({ page }) => {
    await page.goto("/tatuajes/portafolio");
    await page.getByRole("link", { name: /Hablemos/ }).click();
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

  test("portafolio shows every piece and only offers filters it can honour", async ({ page }) => {
    await page.goto("/tatuajes/portafolio");

    await expect(page.getByRole("heading", { name: "Portafolio", level: 1 })).toBeVisible();
    await expect(page.getByRole("button", { name: /^Ver Tatuaje/ })).toHaveCount(8);
    await expect(page.getByRole("button", { name: /^Ver Tatuaje/ }).first()).toBeVisible();

    // The local collection carries no style metadata, so a style filter rendered
    // today would be a row of buttons with nothing to filter. It appears on its
    // own once works are loaded with a style.
    await expect(page.getByRole("button", { name: "Todos" })).toHaveCount(0);
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

  test("one header serves the landing and every section page", async ({ page }) => {
    await page.goto("/tatuajes", { waitUntil: "domcontentloaded" });
    await expect(page.getByRole("navigation")).toHaveCount(1);
    const landingWordmark = page.getByRole("link", { name: "Pájaro Maca, tatuajes" });
    await expect(landingWordmark).toHaveAttribute("href", "#inicio");

    await page.goto("/tatuajes/cotizar");
    await expect(page.getByRole("navigation")).toHaveCount(1);
    await expect(page.getByRole("link", { name: "Pájaro Maca, tatuajes" })).toHaveAttribute(
      "href",
      "/tatuajes",
    );

    await page.getByRole("navigation").getByRole("link", { name: /Más/ }).click();
    await expect(page).toHaveURL("/");
    await expect(page.getByRole("heading", { name: "Tatuajes", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Escénico", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Arte", exact: true })).toBeVisible();
  });

  test("cotizar leads with Instagram and publishes the email last, with no form", async ({ page }) => {
    await page.goto("/tatuajes/cotizar");

    const contact = page.getByRole("region", { name: "Contacto para cotizar" });
    const links = contact.getByRole("link");

    await expect(links).toHaveCount(3);
    await expect(links.nth(0)).toHaveAttribute("href", "https://instagram.com/pajaro_maca");
    await expect(links.nth(1)).toHaveAttribute("href", /^https:\/\/wa\.me\//);
    await expect(links.nth(2)).toHaveAttribute("href", /^mailto:/);
    await expect(links.nth(2)).toContainText("@");

    await expect(page.locator("form")).toHaveCount(0);
  });

  test("mobile menu should work", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/tatuajes", { waitUntil: "domcontentloaded" });
    const openButton = page.getByLabel("Abrir menú");
    const portafolio = page.getByRole("navigation").getByRole("link", { name: "Portafolio" });
    // The toggle lives in a client component: retry so the click is never lost before hydration.
    await expect(async () => {
      if (await openButton.count()) await openButton.click();
      await expect(portafolio).toBeVisible({ timeout: 1000 });
    }).toPass({ timeout: 20000 });
    await expect(page.getByLabel("Cerrar menú")).toHaveAttribute("aria-expanded", "true");
    await expect(portafolio).toHaveAttribute("href", "#portafolio");
    await page.getByLabel("Cerrar menú").click();
    await expect(portafolio).toBeHidden();
  });
});
