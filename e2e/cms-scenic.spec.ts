import { expect, test, type Locator } from "@playwright/test";

test("admin scenic works render in order and hide drafts", async ({ page }) => {
  test.setTimeout(180000);
  test.skip(!process.env.E2E_ADMIN_EMAIL || !process.env.E2E_ADMIN_PASSWORD, "E2E admin credentials are not configured");
  const unique = `e2e-scenic-${Date.now()}`;
  const slugs = [`${unique}-first`, `${unique}-second`, `${unique}-draft`];

  async function login() {
    await page.goto("/admin/login");
    await page.getByLabel("Correo electrónico").fill(process.env.E2E_ADMIN_EMAIL!);
    await page.getByLabel("Contraseña").fill(process.env.E2E_ADMIN_PASSWORD!);
    await page.getByRole("button", { name: "Iniciar sesión" }).click();
    await expect(page).toHaveURL(/\/admin$/, { timeout: 30000 });
  }

  async function uploadMedia(form: Locator) {
    await form.locator("input[type=file]").setInputFiles({
      name: "e2e-scenic.png",
      mimeType: "image/png",
      buffer: Buffer.from("e2e-scenic-image"),
    });
    await expect(form.getByRole("status")).toHaveText("Archivo listo para guardar", { timeout: 90000 });
  }

  async function createWork(slug: string, published: boolean, order: number) {
    const form = page.locator("form").filter({ hasText: "Nueva obra escénica" });
    await form.getByRole("textbox", { name: "Título" }).fill(slug);
    await form.getByRole("textbox", { name: "Slug" }).fill(slug);
    await uploadMedia(form);
    await form.getByLabel("Orden").fill(String(order));
    if (published) await form.getByRole("checkbox", { name: "Publicado" }).check();
    await form.getByRole("button", { name: "Guardar obra escénica" }).click();
    await expect(page.locator("[data-scenic-id]").filter({ hasText: slug })).toBeVisible({ timeout: 30000 });
  }

  try {
    await login();
    await createWork(slugs[1], true, 2);
    await createWork(slugs[0], true, 1);
    await createWork(slugs[2], false, 3);

    const visitor = await page.context().browser()!.newContext();
    try {
      const publicPage = await visitor.newPage();
      const response = await publicPage.goto("/escenico", { waitUntil: "domcontentloaded" });
      expect(response?.status()).toBe(200);
      const cards = publicPage.locator("article");
      await expect(cards).toHaveCount(2);
      await expect(cards.nth(0).getByRole("heading", { level: 3 })).toHaveText(slugs[0]);
      await expect(cards.nth(1).getByRole("heading", { level: 3 })).toHaveText(slugs[1]);
      await expect(publicPage.getByText(slugs[2])).toHaveCount(0);
    } finally {
      await visitor.close();
    }

    const invalidForm = page.locator("form").filter({ hasText: "Nueva obra escénica" });
    await invalidForm.getByRole("textbox", { name: "Título" }).fill(`${unique}-invalid`);
    await invalidForm.getByRole("textbox", { name: "Slug" }).fill(`${unique}-invalid`);
    await uploadMedia(invalidForm);
    await invalidForm.locator("select[name=media_kind]").evaluate((select) => {
      const option = document.createElement("option");
      option.value = "audio";
      option.textContent = "Audio";
      select.append(option);
      (select as HTMLSelectElement).value = "audio";
    });
    void invalidForm.getByRole("button", { name: "Guardar obra escénica" }).click();
    await page.waitForTimeout(1000);
    await page.reload({ waitUntil: "domcontentloaded" });
    await expect(page.getByText(`${unique}-invalid`)).toHaveCount(0);
  } finally {
    await login();
    for (const slug of slugs) {
      await page.goto("/admin");
      const row = page.locator("[data-scenic-id]").filter({ hasText: slug });
      if (await row.count()) {
        await row.getByRole("button", { name: "Eliminar" }).click();
        await page.reload({ waitUntil: "domcontentloaded" });
        await expect(page.locator("[data-scenic-id]").filter({ hasText: slug })).toHaveCount(0, { timeout: 30000 });
      }
    }
  }
});
