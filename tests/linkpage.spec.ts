import { test, expect } from '@playwright/test';

test('Task 1 - Validate Created link', async ({ page }) => {
  await page.goto('https://www.tutorialspoint.com/selenium/practice/links.php');

  // Click on "Created" link
  await page.getByRole('link', { name: 'Created' }).click();

  // Validate response message
  const responseText = page.locator('div.create')
  //getByText('Link has responded').first();

  await expect(responseText).toContainText('Link has responded with staus 201 and status text Created');
});