import { test, expect } from '@playwright/test';

test('Simple Web Table', async ({ page }) => {

  await page.goto('https://testautomationpractice.blogspot.com/');

  // Rows & Columns
  const rows = page.locator('//table[@name="BookTable"]//tr');
  const cols = page.locator('//table[@name="BookTable"]//th');

  // Count
  console.log('Rows:', await rows.count());
  console.log('Columns:', await cols.count());

  // Print table data
  for (let i = 2; i <= await rows.count(); i++) {
    for (let j = 1; j <= await cols.count(); j++) {

      const text = await page.locator(`//table[@name="BookTable"]//tr[${i}]/td[${j}]`).textContent();
      console.log(text);

    }
  }

  // Validate one value
  const value = await page.locator('//table[@name="BookTable"]//tr[2]/td[1]').textContent();
  expect(value).toBe('Learn Selenium');

});

test('Simple Pagination', async ({ page }) => {

  await page.goto('https://testautomationpractice.blogspot.com/');

  const pages = page.locator('#pagination a');

  for (let i = 0; i < await pages.count(); i++) {

    await pages.nth(i).click();

    const rows = page.locator('#productTable tbody tr');

    for (let j = 0; j < await rows.count(); j++) {
      console.log(await rows.nth(j).textContent());
    }
  }

});