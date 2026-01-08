import { test, expect } from "@playwright/test";

test.skip(!process.env.E2E_BASE_URL, "E2E_BASE_URL not set");

test("submit analyze flow", async ({ page }) => {
  await page.goto("/analyze");

  const input = page.getByLabel("Enter your website URL");
  await expect(input).toBeVisible();
  await input.fill("https://example.com");

  await page.getByRole("button", { name: /Analyze Doorpost/i }).click();

  // Either progress appears or result is immediate from cache.
  const progressCard = page.getByText("Analysis Progress");
  await Promise.race([
    progressCard.waitFor({ state: "visible" }),
    page.getByText("Overall Score").waitFor({ state: "visible" }),
  ]);

  await expect(page.getByText("Overall Score")).toBeVisible();
  await expect(page.locator('img[alt="Site Screenshot"]')).toBeVisible();
});
