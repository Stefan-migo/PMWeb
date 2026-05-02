import { test, expect } from "@playwright/test";

test.describe("Landing Page", () => {
  test("should display both sections", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("TATUAJES")).toBeVisible();
    await expect(page.getByText("ARTE")).toBeVisible();
  });

  test("should navigate to tattoo section", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel("Ir a sección Tatuajes").click();
    await expect(page).toHaveURL("/tatuajes");
  });

  test("should navigate to art section", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel("Ir a sección Arte").click();
    await expect(page).toHaveURL("/arte");
  });

  test("should have working Instagram link", async ({ page }) => {
    await page.goto("/");
    const igLink = page.getByLabel("Instagram");
    await expect(igLink).toBeVisible();
    await expect(igLink).toHaveAttribute("href", "https://instagram.com");
  });

  test("should have working WhatsApp link", async ({ page }) => {
    await page.goto("/");
    const waLink = page.getByLabel("WhatsApp");
    await expect(waLink).toBeVisible();
    await expect(waLink).toHaveAttribute("href", /wa\.me/);
  });
});
