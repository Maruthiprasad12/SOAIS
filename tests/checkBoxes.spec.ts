import { test, expect } from '@playwright/test';

test('Checkbox Handling', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  // Locate all checkboxes
  const checkboxes = page.locator('input[type="checkbox"]');

  const count = await checkboxes.count();
  console.log('Total Checkboxes:', count);

  // Select multiple checkboxes
  await checkboxes.nth(0).check();
  await checkboxes.nth(1).check();
  await checkboxes.nth(2).check();

  // Verify selected 
  await expect(checkboxes.nth(0)).toBeChecked();
  await expect(checkboxes.nth(1)).toBeChecked();
  await expect(checkboxes.nth(2)).toBeChecked();

  console.log('First 3 checkboxes selected');

  //Uncheck one 
  await checkboxes.nth(1).uncheck();
  await expect(checkboxes.nth(1)).not.toBeChecked();

  console.log('One checkbox unchecked');
});


test('Select all checkboxes using loop', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  const checkboxes = page.locator('input[type="checkbox"]');

  const count = await checkboxes.count();

  // Select all using loop
  for (let i = 0; i < count; i++) {
    await checkboxes.nth(i).check();
    await expect(checkboxes.nth(i)).toBeChecked();
  }

  console.log('All checkboxes selected:', count);
});