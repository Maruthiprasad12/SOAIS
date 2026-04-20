import { test, expect } from '@playwright/test';

test('Google search suggestions - Playwright', async ({ page }) => {
  // Navigate to Google
  await page.goto('https://www.google.com');
  await page.locator('textarea[aria-label="Search"]').fill('playwright')
  const suggestions = await page.locator('//ul[@role="listbox"]/li/div/div[2]/div[1]').allInnerTexts()
  console.log(suggestions)
  await page.getByText(' install').click()
  // await expect(page.getByText('https://playwright.dev')).toBeVisible()
});
