import { test, expect } from '@playwright/test';

test('Dropdown Handling', async ({ page }) => {

  await page.goto('https://testautomationpractice.blogspot.com/');

  // Locate dropdown
  const dropdown = page.locator('#country');

  // Select by Visible Text
  await dropdown.selectOption({ label: 'India' });
  await expect(dropdown).toHaveValue('india');

  // Select by Value
  await dropdown.selectOption('usa');
  await expect(dropdown).toHaveValue('usa');

  // Select by Index
  await dropdown.selectOption({ index: 2 }); // example index

  // Verify selected value
  const selected = await dropdown.inputValue();
  console.log('Selected value:', selected);

  // Print all dropdown options
  // Print all options
const options = await dropdown.locator('option').allTextContents();

console.log('All options:', options);

});