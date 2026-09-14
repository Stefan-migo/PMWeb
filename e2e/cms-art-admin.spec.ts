import { expect, test } from "@playwright/test";

test("admin can create a draft that stays hidden from the public gallery", async ({ page }) => {
  test.skip(!process.env.E2E_ADMIN_EMAIL || !process.env.E2E_ADMIN_PASSWORD, "E2E admin credentials are not configured");
  test.setTimeout(150000);
  const unique = `e2e-art-${Date.now()}`;
  try {
    await page.goto("/admin/login");
    await page.getByLabel("Correo electrónico").fill(process.env.E2E_ADMIN_EMAIL!);
    await page.getByLabel("Contraseña").fill(process.env.E2E_ADMIN_PASSWORD!);
    await page.getByRole("button", { name: "Iniciar sesión" }).click();
    await expect(page).toHaveURL(/\/admin$/, { timeout: 20000 });
    await page.getByRole("textbox", { name: "Título" }).first().fill(unique);
    await page.getByRole("textbox", { name: "Slug" }).first().fill(unique);
    const artworkForm = page.locator("form").filter({ hasText: "Nueva obra" }).first();
    await artworkForm.locator("input[type=file]").setInputFiles({
      name: "e2e-art.png",
      mimeType: "image/png",
      buffer: Buffer.from("e2e-art-image"),
    });
    await expect(artworkForm.getByRole("status")).toHaveText("Archivo listo para guardar", { timeout: 90000 });
    await page.getByRole("button", { name: "Guardar obra" }).first().click();
    await expect(page.getByText(unique).first()).toBeVisible({ timeout: 30000 });
    await page.goto("/arte/galeria", { waitUntil: "domcontentloaded" });
    await expect(page.getByText(unique)).toHaveCount(0);
    await page.goto(`/arte/galeria/${unique}`, { waitUntil: "domcontentloaded" });
    await expect(page.getByText("Obra no encontrada")).toBeVisible();
  } finally {
    await page.goto("/admin");
    const row = page.locator(`[data-artwork-id]`).filter({ hasText: unique });
    if (await row.count()) {
      await row.getByRole("button", { name: "Eliminar" }).click();
      await expect(row).toHaveCount(0, { timeout: 30000 });
    }
  }
});
