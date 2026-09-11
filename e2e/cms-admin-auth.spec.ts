import { expect, test } from "@playwright/test";

test("anonymous visitors are sent to the Spanish admin login", async ({ page }) => {
  await page.goto("/admin");
  await expect(page).toHaveURL(/\/admin\/login/);
  await expect(page.getByRole("heading", { name: "Administración" })).toBeVisible();
  await expect(page.getByLabel("Correo electrónico")).toBeVisible();
});

test("the login form rejects an unauthorized identity", async ({ page }) => {
  await page.goto("/admin/login");
  await page.getByLabel("Correo electrónico").fill("not-allowlisted@example.com");
  await page.getByLabel("Contraseña").fill("invalid-password");
  await page.getByRole("button", { name: "Iniciar sesión" }).click();
  await expect(page.locator("p[role='alert']")).toContainText("No tienes autorización");
});

test("an allowlisted identity can open and close the admin session", async ({ page }) => {
  test.skip(!process.env.E2E_ADMIN_EMAIL || !process.env.E2E_ADMIN_PASSWORD, "E2E admin credentials are not configured");
  await page.goto("/admin/login");
  await page.getByLabel("Correo electrónico").fill(process.env.E2E_ADMIN_EMAIL!);
  await page.getByLabel("Contraseña").fill(process.env.E2E_ADMIN_PASSWORD!);
  await page.getByRole("button", { name: "Iniciar sesión" }).click();
  await expect(page).toHaveURL(/\/admin$/);
  await expect(page.getByRole("heading", { name: "Administración" })).toBeVisible();
  await page.getByRole("button", { name: "Cerrar sesión" }).click();
  await expect(page).toHaveURL(/\/admin\/login/);
});
