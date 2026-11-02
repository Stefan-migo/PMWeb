import { test, expect } from "@playwright/test";

test.describe("Landing Page", () => {
  test("should display all three sections", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Tatuajes", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Escénico", exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Arte", exact: true })).toBeVisible();
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

  test("should advertise the brand icon set in the document head", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator('link[rel="icon"][sizes="16x16"]')).toHaveAttribute(
      "href",
      "/favicon-16x16.png",
    );
    await expect(page.locator('link[rel="icon"][sizes="32x32"]')).toHaveAttribute(
      "href",
      "/favicon-32x32.png",
    );
    await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveAttribute(
      "href",
      "/apple-touch-icon.png",
    );
    await expect(page.locator('link[rel="manifest"]')).toHaveAttribute(
      "href",
      "/site.webmanifest",
    );
  });

  test("should keep the page free of scrollbars while a panel grows on hover", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1600, height: 900 });
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Tatuajes", exact: true })).toBeVisible();

    await page.getByLabel("Ir a sección Tatuajes").hover();
    // The panel grows through a 300ms transition; measure once it settled.
    await page.waitForTimeout(600);

    const overflow = await page.evaluate(() => {
      const de = document.documentElement;
      return {
        horizontal: de.scrollWidth - de.clientWidth,
        vertical: de.scrollHeight - de.clientHeight,
      };
    });

    expect(overflow).toEqual({ horizontal: 0, vertical: 0 });
  });
});
