import { test, expect } from '@playwright/test';

test('Select dates (simple)', async ({ page }) => {
  await page.goto('https://www.booking.com/');

  // Open calendar
  await page.getByTestId('searchbox-dates-container').click();

  // Select check-in and check-out using stable attributes
  await page.locator('[data-date="2026-06-15"]').click();
  await page.locator('[data-date="2026-06-20"]').click();

  // Basic validation
  await expect(page.getByTestId('date-display-field-start'))
    .toContainText('15');

  await expect(page.getByTestId('date-display-field-end'))
    .toContainText('20');
});