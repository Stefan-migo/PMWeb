import { test, expect } from "@playwright/test";

const headerNav = (page: import("@playwright/test").Page) =>
  page.getByRole("navigation", { name: "Navegación de tatuajes" });

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

    await expect(headerNav(page)).toHaveCount(1);
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

  test("landing gallery expands and the viewer moves with the arrow keys", async ({ page }) => {
    await page.goto("/tatuajes", { waitUntil: "domcontentloaded" });

    const works = page.getByRole("button", { name: /^Ver Tatuaje/ });
    await expect(works).toHaveCount(4);
    await expect(works.first()).toBeVisible();

    await page.getByRole("button", { name: /Ver más tatuajes/ }).click();
    await expect(works).toHaveCount(8);

    await works.first().click();
    const dialog = page.getByRole("dialog", { name: "Fotografía de tatuaje" });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText("01 / 08 — Tatuaje de corazón y flores")).toBeVisible();

    await page.keyboard.press("ArrowRight");
    await expect(dialog.getByText("02 / 08 — Tatuaje botánico sobre el hombro")).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(works.first()).toBeFocused();
  });

  test("portafolio filters the eight pieces and opens the viewer", async ({ page }) => {
    await page.goto("/tatuajes/portafolio", { waitUntil: "domcontentloaded" });

    await expect(page.getByRole("heading", { level: 1, name: /Portafolio/ })).toBeVisible();
    const pieces = page.getByRole("button", { name: /^Ampliar / });
    await expect(pieces).toHaveCount(8);
    await expect(pieces.first()).toBeVisible();

    await page.getByRole("button", { name: "Fauna", exact: true }).click();
    await expect(pieces).toHaveCount(2);
    await expect(page.getByRole("status")).toContainText("02 TRABAJOS");

    await pieces.first().click();
    const dialog = page.getByRole("dialog", { name: "Fotografía de tatuaje" });
    await expect(dialog).toBeVisible();
    // The viewer walks only the filtered set.
    await expect(dialog.getByText(/\/ 02 —/)).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();

    await page.getByRole("button", { name: "Todos", exact: true }).click();
    await expect(pieces).toHaveCount(8);
  });

  test("designs catalogue filters availability and carries the choice to cotizar", async ({
    page,
  }) => {
    await page.goto("/tatuajes/disenos-disponibles", { waitUntil: "domcontentloaded" });

    await expect(page.getByRole("heading", { level: 1, name: /Una idea/ })).toBeVisible();
    const cards = page.getByRole("button", { name: /^Ver detalle de / });
    await expect(cards).toHaveCount(3);
    await expect(page.getByRole("status")).toHaveText("03 DISEÑOS");

    await page.getByRole("button", { name: /Disponibles/ }).click();
    await expect(cards).toHaveCount(2);
    await expect(page.getByRole("status")).toHaveText("02 DISEÑOS");

    await page.getByRole("button", { name: /Reservados/ }).click();
    await expect(cards).toHaveCount(1);
    await expect(page.getByRole("link", { name: /Pedir una variación/ })).toHaveAttribute(
      "href",
      /diseno=.*variacion=1/,
    );

    await page.getByRole("button", { name: /^Todos/ }).click();
    await cards.first().click();

    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(cards.first()).toBeFocused();
  });

  test("should navigate to cotizar from the header pill", async ({ page }) => {
    await page.goto("/tatuajes/portafolio");
    await page.getByRole("link", { name: /Hablemos/ }).click();
    await expect(page).toHaveURL("/tatuajes/cotizar");
    await expect(page.getByRole("heading", { name: /Cuéntame/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /Preparar mi mensaje/ })).toBeVisible();
  });

  test("cotizar prepares the message and leads with Instagram", async ({ page }) => {
    await page.goto("/tatuajes/cotizar", { waitUntil: "domcontentloaded" });

    await expect(page.getByText(/Así empieza la conversación/)).toHaveCount(0);

    await page.getByLabel(/Qué te gustaría tatuarte/).fill("Una rama de lavanda");
    await page.getByLabel(/En qué parte del cuerpo/).fill("antebrazo izquierdo");
    await page.getByLabel(/Qué tamaño imaginas/).fill("10 × 15 cm");
    await page.getByRole("button", { name: /Preparar mi mensaje/ }).click();

    await expect(page.getByText(/Así empieza la conversación/)).toBeVisible();
    await expect(page.locator(".tp-cotizar__preview")).toContainText("Una rama de lavanda");

    // Nothing is sent: the page stays put and every destination is a link out.
    await expect(page).toHaveURL("/tatuajes/cotizar");
    const actions = page.locator(".tp-cotizar__actions");
    await expect(actions.getByRole("button", { name: /Abrir Instagram/ })).toBeVisible();
    await expect(actions.getByRole("link").nth(0)).toHaveAttribute("href", /^https:\/\/wa\.me\//);
    await expect(actions.getByRole("link").nth(1)).toHaveAttribute("href", /^mailto:/);
  });

  test("cotizar keeps the chosen design from the catalogue", async ({ page }) => {
    await page.goto("/tatuajes/cotizar?diseno=Bot%C3%A1nico&variacion=1");

    await expect(page.getByLabel(/Qué te gustaría tatuarte/)).toHaveValue(
      /Me gustaría una variación del diseño Botánico/,
    );
  });

  test("cuidados switches stages and offers the guide", async ({ page }) => {
    await page.goto("/tatuajes/cuidados", { waitUntil: "domcontentloaded" });

    await expect(page.getByRole("tab", { name: /Primeras 24 h/ })).toHaveAttribute(
      "aria-selected",
      "true",
    );

    await page.getByRole("tab", { name: /Semana 2/ }).click();
    await expect(page.getByRole("tabpanel").filter({ hasText: "Dale su tiempo" })).toBeVisible();

    await expect(page.getByRole("link", { name: /Consultar por WhatsApp/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /Guardar guía/ })).toBeVisible();
  });

  test("sobre mí tells the story and links the profile", async ({ page }) => {
    await page.goto("/tatuajes/sobre-mi", { waitUntil: "domcontentloaded" });

    await expect(page.getByRole("heading", { level: 1, name: /Mi trazo/ })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Villarrica, Chile" })).toBeVisible();
    await expect(page.getByRole("link", { name: /@pajaro_maca/ })).toHaveAttribute(
      "href",
      "https://instagram.com/pajaro_maca",
    );
  });

  test("secondary pages expose the shared active navigation", async ({ page }) => {
    await page.goto("/tatuajes/cuidados");
    await expect(page.locator('nav a[href="/tatuajes/cuidados"]')).toHaveAttribute(
      "aria-current",
      "page",
    );
    await expect(page.locator('nav a[href="/tatuajes/portafolio"]')).not.toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  test("one header serves the landing and every section page", async ({ page }) => {
    await page.goto("/tatuajes", { waitUntil: "domcontentloaded" });
    await expect(headerNav(page)).toHaveCount(1);
    const landingWordmark = page.getByRole("link", { name: "Pájaro Maca, tatuajes" });
    await expect(landingWordmark).toHaveAttribute("href", "#inicio");

    await page.goto("/tatuajes/cotizar");
    await expect(headerNav(page)).toHaveCount(1);
    await expect(page.getByRole("link", { name: "Pájaro Maca, tatuajes" })).toHaveAttribute(
      "href",
      "/tatuajes",
    );

    await headerNav(page).getByRole("link", { name: /Más/ }).click();
    await expect(page).toHaveURL("/");
    await expect(page.getByRole("heading", { name: "Tatuajes", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Escénico", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Arte", exact: true })).toBeVisible();
  });

  test("mobile menu should work", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/tatuajes", { waitUntil: "domcontentloaded" });
    const openButton = page.getByLabel("Abrir menú");
    const portafolio = headerNav(page).getByRole("link", { name: "Portafolio" });
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
