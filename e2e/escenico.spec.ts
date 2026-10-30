import { test, expect } from "@playwright/test";

test.describe("Escénico page", () => {
  test("shows the portfolio sections", async ({ page }) => {
    await page.goto("/escenico");

    await expect(page.getByRole("heading", { name: "Escénico", level: 1 })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Sobre Macarena", level: 2 }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Dirección de arte", level: 2 }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Formación y trayectoria", level: 2 }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Obras", level: 2 })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Escenarios internacionales", level: 2 }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Contacto", level: 2 })).toBeVisible();
  });

  test("lists every work from the portfolio document", async ({ page }) => {
    await page.goto("/escenico");

    const works = page.getByRole("region", { name: "Obras" });
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

  test("opens a work detail from the list", async ({ page }) => {
    await page.goto("/escenico");

    await page.getByRole("link", { name: /Tensión Superficial/ }).first().click();
    await expect(page).toHaveURL("/escenico/tension-superficial");
  });

  test("keeps the art direction credit with its author", async ({ page }) => {
    await page.goto("/escenico/tension-superficial");

    await expect(
      page.getByRole("heading", { name: "Tensión Superficial", level: 1 }),
    ).toBeVisible();

    const credits = page.getByRole("region", { name: "Ficha técnica" });
    await expect(credits.getByText("Kattya Soto", { exact: true })).toBeVisible();
    await expect(credits.getByText("42 minutos", { exact: true })).toBeVisible();
    await expect(
      credits.getByText("Dirección de arte", { exact: true }),
    ).toBeVisible();
    // Macarena holds two roles in this work, so both rows credit her.
    await expect(credits.getByText("Macarena Almeida", { exact: true })).toHaveCount(2);
  });

  test("publishes the announced work as premiered", async ({ page }) => {
    await page.goto("/escenico/el-final-de-mi-carrera");

    await expect(
      page.getByRole("heading", { name: "El final de mi carrera", level: 1 }),
    ).toBeVisible();
    await expect(page.getByText("próximo estreno", { exact: false })).toHaveCount(0);
  });
});
