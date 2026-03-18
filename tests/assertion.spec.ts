import { test, expect } from '@playwright/test';

test('nopCommerce Registration Test', async ({ page }) => {

  await page.goto('https://www.nopcommerce.com/en/register?returnUrl=%2Fen');

  // Hard Assertion – Verify page title
  await expect(page).toHaveTitle(/Register/);

  // Verify important elements
  await expect(page.locator('#FirstName')).toBeVisible();
  await expect(page.locator('#LastName')).toBeVisible();
  await expect(page.locator('#Email')).toBeVisible();
  await expect(page.locator('#Password')).toBeVisible();
  await expect(page.locator('#ConfirmPassword')).toBeVisible();

  // Fill registration form
  await page.fill('#FirstName', 'John');
  await page.fill('#LastName', 'Doe');
  await page.fill('#Email', 'john.doe@test.com');
  await page.fill('#Password', 'Password123!');
  await page.fill('#ConfirmPassword', 'Password123!');

  // Soft Assertions (multiple checks)
  await expect.soft(page.locator('#FirstName')).toHaveValue('John');
  await expect.soft(page.locator('#LastName')).toHaveValue('Doe');
  await expect.soft(page.locator('#Email')).toHaveValue('john.doe@test.com');

  // Submit form
  await page.click('#register-button');

});