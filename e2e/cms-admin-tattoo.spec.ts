import { expect, test } from "@playwright/test";

test("admin tattoo records render publicly and fallback pages stay usable", async ({ page }) => {
  test.skip(!process.env.E2E_ADMIN_EMAIL || !process.env.E2E_ADMIN_PASSWORD, "E2E admin credentials are not configured");
  const unique = `e2e-tattoo-${Date.now()}`;
  try {
    await page.goto("/admin/login");
    await page.getByLabel("Correo electrónico").fill(process.env.E2E_ADMIN_EMAIL!);
    await page.getByLabel("Contraseña").fill(process.env.E2E_ADMIN_PASSWORD!);
    await page.getByRole("button", { name: "Iniciar sesión" }).click();
    await expect(page).toHaveURL(/\/admin$/);
    const newTattoo = page.locator("form").filter({ hasText: "Nuevo tatuaje" });
    await newTattoo.getByRole("textbox", { name: "Título" }).fill(unique);
    await newTattoo.getByRole("textbox", { name: "Slug" }).fill(unique);
    await newTattoo.getByRole("textbox", { name: "Imagen (URL o ruta)" }).fill("/design/tattoo/Layer 1.png");
    await newTattoo.getByRole("checkbox", { name: "Publicado" }).check();
    await newTattoo.getByRole("button", { name: "Guardar tatuaje" }).click();
    await expect(page.getByText(unique).first()).toBeVisible();

    const visitor = await page.context().browser()!.newContext();
    try {
      const publicPage = await visitor.newPage();
      await publicPage.goto("/tatuajes/portafolio");
      await expect(publicPage.getByRole("button", { name: `Ver ${unique}` })).toBeVisible();
      await publicPage.goto("/tatuajes/disenos-disponibles");
      await expect(publicPage.getByText(unique)).toBeVisible();
      await publicPage.goto("/tatuajes/portafolio");
      await expect(publicPage.getByRole("heading", { name: "Portafolio" })).toBeVisible();
    } finally {
      await visitor.close();
    }

    await page.goto("/admin");
    const row = page.locator(`[data-tattoo-id]`).filter({ hasText: unique });
    await row.getByRole("button", { name: "Eliminar" }).click();
    const fallback = await page.context().browser()!.newPage();
    await fallback.goto("/tatuajes/portafolio");
    await expect(fallback.getByRole("heading", { name: "Portafolio" })).toBeVisible();
    await fallback.goto("/tatuajes/disenos-disponibles");
    await expect(fallback.getByRole("heading", { name: "Diseños disponibles" })).toBeVisible();
    await fallback.close();
  } finally {
    await page.goto("/admin");
    const row = page.locator(`[data-tattoo-id]`).filter({ hasText: unique });
    if (await row.count()) await row.getByRole("button", { name: "Eliminar" }).click();
  }
});
