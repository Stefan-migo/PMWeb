import { expect, test } from "@playwright/test";

test("admin tattoo records render publicly and fallback pages stay usable", async ({ page }) => {
  test.skip(!process.env.E2E_ADMIN_EMAIL || !process.env.E2E_ADMIN_PASSWORD, "E2E admin credentials are not configured");
  test.setTimeout(150000);
  const unique = `e2e-tattoo-${Date.now()}`;
  try {
    await page.goto("/admin/login");
    await page.getByLabel("Correo electrónico").fill(process.env.E2E_ADMIN_EMAIL!);
    await page.getByLabel("Contraseña").fill(process.env.E2E_ADMIN_PASSWORD!);
    await page.getByRole("button", { name: "Iniciar sesión" }).click();
    await expect(page).toHaveURL(/\/admin$/, { timeout: 20000 });
    const newTattoo = page.locator("form").filter({ hasText: "Nuevo tatuaje" });
    await newTattoo.getByRole("textbox", { name: "Título" }).fill(unique);
    await newTattoo.getByRole("textbox", { name: "Slug" }).fill(unique);
    await newTattoo.locator("input[type=file]").setInputFiles({
      name: "e2e-tattoo.png",
      mimeType: "image/png",
      buffer: Buffer.from("e2e-tattoo-image"),
    });
    await expect(newTattoo.getByRole("status")).toHaveText("Archivo listo para guardar", { timeout: 90000 });
    await newTattoo.getByRole("checkbox", { name: "Publicado" }).check();
    await newTattoo.getByRole("button", { name: "Guardar tatuaje" }).click();
    await expect(page.getByText(unique).first()).toBeVisible({ timeout: 30000 });

    const visitor = await page.context().browser()!.newContext();
    try {
      const publicPage = await visitor.newPage();
      await publicPage.goto("/tatuajes/portafolio", { waitUntil: "domcontentloaded" });
      await expect(publicPage.getByRole("button", { name: `Ver ${unique}` })).toBeVisible();
      await publicPage.goto("/tatuajes/disenos-disponibles", { waitUntil: "domcontentloaded" });
      await expect(publicPage.getByText(unique)).toBeVisible();
      await publicPage.goto("/tatuajes/portafolio", { waitUntil: "domcontentloaded" });
      await expect(publicPage.getByRole("heading", { name: "Portafolio" })).toBeVisible();
    } finally {
      await visitor.close();
    }

    await page.goto("/admin");
    const row = page.locator(`[data-tattoo-id]`).filter({ hasText: unique });
    await row.getByRole("button", { name: "Eliminar" }).click();
    const fallback = await page.context().browser()!.newPage();
    await fallback.goto("/tatuajes/portafolio", { waitUntil: "domcontentloaded" });
    await expect(fallback.getByRole("heading", { name: "Portafolio" })).toBeVisible();
    await fallback.goto("/tatuajes/disenos-disponibles", { waitUntil: "domcontentloaded" });
    await expect(fallback.getByRole("heading", { name: "Diseños disponibles" })).toBeVisible();
    await fallback.close();
  } finally {
    await page.goto("/admin");
    const row = page.locator(`[data-tattoo-id]`).filter({ hasText: unique });
    if (await row.count()) await row.getByRole("button", { name: "Eliminar" }).click();
  }
});
