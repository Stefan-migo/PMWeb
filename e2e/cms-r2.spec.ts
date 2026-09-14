import { expect, test } from "@playwright/test";

test("authorized media upload persists a delivery URL and rejects invalid files", async ({ page }) => {
  test.setTimeout(120000);
  test.skip(!process.env.E2E_ADMIN_EMAIL || !process.env.E2E_ADMIN_PASSWORD, "E2E admin credentials are not configured");
  const slug = `e2e-r2-${Date.now()}`;
  await page.goto("/admin/login");
  await page.getByLabel("Correo electrónico").fill(process.env.E2E_ADMIN_EMAIL!);
  await page.getByLabel("Contraseña").fill(process.env.E2E_ADMIN_PASSWORD!);
  await page.getByRole("button", { name: "Iniciar sesión" }).click();
  await expect(page).toHaveURL(/\/admin$/, { timeout: 30000 });

  const form = page.locator("form").filter({ hasText: "Nueva obra" }).first();
  await form.getByLabel("Título").fill(slug);
  await form.getByLabel("Slug").fill(slug);
  await form.locator("input[type=file]").setInputFiles({ name: "upload.png", mimeType: "image/png", buffer: Buffer.from("not-a-real-png") });
  await expect(form.getByRole("status")).toHaveText("Archivo listo para guardar", { timeout: 90000 });
  await form.getByRole("button", { name: "Guardar obra" }).click();
  await expect(page.locator("[data-artwork-id]").filter({ hasText: slug })).toBeVisible();

  const invalid = page.locator("form").filter({ hasText: "Nueva obra" }).first();
  await invalid.getByLabel("Título").fill(`${slug}-invalid`);
  await invalid.getByLabel("Slug").fill(`${slug}-invalid`);
  await invalid.locator("input[type=file]").setInputFiles({ name: "bad.svg", mimeType: "image/svg+xml", buffer: Buffer.from("<svg/>") });
  await expect(invalid.getByRole("status")).toHaveText("No se pudo validar el archivo");
  await expect(page.locator("[data-artwork-id]").filter({ hasText: `${slug}-invalid` })).toHaveCount(0);

  await page.goto("/admin");
  const row = page.locator("[data-artwork-id]").filter({ hasText: slug });
  await row.getByRole("button", { name: "Eliminar" }).click();
  await page.goto(`/admin?e2e_cleanup=${Date.now()}`);
  await expect(page.locator("[data-artwork-id]").filter({ hasText: slug })).toHaveCount(0);
});
