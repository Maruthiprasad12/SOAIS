import { test, expect } from '@playwright/test';

test('@smoke Login test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await expect(page).toHaveTitle(/Swag Labs/);
});

test('@regression Add to cart test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await expect(page.locator('#login-button')).toBeVisible();
});

test('@sanity Page load test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await expect(page).toHaveURL(/saucedemo/);
});