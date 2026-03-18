import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/AutomationPractice/');
  await page.locator('label[for="radio1"]>input').check()
  
  await page.getByPlaceholder('Type to Select Countries').pressSequentially('India')
  await page.waitForTimeout(5000)
  await page.keyboard.press('Enter')
  await page.waitForTimeout(5000)
  await page.locator('#dropdown-class-example').selectOption('Option1')

  const checkboxes = page.locator('input[type="checkbox"]');

const count = await checkboxes.count();

for (let i = 0; i < count; i++) {
  await checkboxes.nth(i).check();
}

// const [newPage] = await Promise.all([
//   page.waitForEvent('popup'),   // wait for new tab
//   page.click('#openWindow')     // action that opens it
// ]);

// await newPage.waitForLoadState();
// console.log(await newPage.title());
  // Expect a title "to contain" a substring.
});
