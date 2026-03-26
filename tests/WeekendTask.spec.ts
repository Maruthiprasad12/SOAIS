import { test, expect } from '@playwright/test';
 test.describe('Weekend Task - Form Handling and Window Management', () => {
const URL = 'https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php';
 
test('Debug - Print all input elements', async ({ page }) => {
  await page.goto(URL);
  await page.waitForLoadState('networkidle');
 
  const inputs = await page.evaluate(() =>
    Array.from(document.querySelectorAll('input, select, textarea, button')).map(el => {
      const e = el as HTMLInputElement;
      return `tag=${e.tagName} id="${e.id}" name="${e.name}" type="${e.type}" value="${e.value}" placeholder="${e.placeholder}"`;
    })
  );
 
  inputs.forEach(i => console.log(i));
});
 
 
test('Task 6 - Fill Complete Form and Submit', async ({ page }) => {
  await page.goto(URL);
  await page.waitForLoadState('networkidle');
 
  await page.locator('#name:visible').fill('Maruthi');
  await page.locator('input[placeholder="name@example.com"]').fill('Maruthi@example.com');
 
  // Radio buttons — use force to bypass overlays
  await page.locator('#gender').check({ force: true });
 
  await page.locator("#mobile").fill('9876543210');
  await page.locator('#dob').fill('2000-01-15');
 
  await page.locator('#subjects').fill('Maths');
  await page.keyboard.press('Enter');
 
  // Checkboxes — use force to bypass overlays
  await page.locator('#hobbies').check({ force: true });
 
  await page.getByPlaceholder('Currend Address').fill('123 Main Street, Hyderabad');
 
  // await page.locator('#state').click({ force: true });
  // await page.getByText('NCR', { exact: true }).click({ force: true });
 await page.locator('#state').selectOption({ label: 'NCR' });
 await page.locator('#city').selectOption({ label: 'Agra' });
  // await page.locator('#city').click({ force: true });
  // await page.getByText('Delhi', { exact: true }).click({ force: true });
 
 /* await page.locator('button[type="submit"]').click({ force: true });
  await page.waitForNavigation().catch(() => {}); */
});
 
 
test('Task 7 - Radio Button Handling', async ({ page }) => {
  await page.goto(URL);
  await page.waitForLoadState('networkidle');
 
  await page.locator('#gender').check({ force: true });
 
  expect(await page.locator('#gender').isChecked()).toBe(true);
});
 
 
test('Task 8 - Checkbox Validation', async ({ page }) => {
  await page.goto(URL);
  await page.waitForLoadState('networkidle');
 
  await page.locator('#hobbies').check({ force: true });
  await page.locator('//form[@id="practiceForm"]/div[7]/div/div/div[2]/input').check({ force: true });
  await page.locator('//form[@id="practiceForm"]/div[7]/div/div/div[3]/input').check({ force: true });
 
  expect(await page.locator('#hobbies').isChecked()).toBe(true);
  expect(await page.locator('//form[@id="practiceForm"]/div[7]/div/div/div[2]/input').isChecked()).toBe(true);
  expect(await page.locator('//form[@id="practiceForm"]/div[7]/div/div/div[3]/input').isChecked()).toBe(true);
});
 
 
// test('Task 9 - Form Validation on Empty Submit', async ({ page }) => {
//   await page.goto(URL);
//   await page.waitForLoadState('networkidle');
 
//   await page.locator('button[type="submit"]').click({ force: true });
 
//   const validationMessage = await page.locator('input[placeholder="Name"]').evaluate(
//     (el: HTMLInputElement) => el.validationMessage
//   );
 
//   console.log('Validation message:', validationMessage);
//   expect(validationMessage).not.toBe('');
// });
 

const WINDOWS_URL = 'https://www.tutorialspoint.com/selenium/practice/browser-windows.php';
const SELECT_URL  = 'https://www.tutorialspoint.com/selenium/practice/select-menu.php';
 
 
test('Task 10 - Handle New Window', async ({ page, context }) => {
  await page.goto(WINDOWS_URL);
  await page.waitForLoadState('networkidle');
 
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.getByRole('button', { name: 'New Window', exact: true }).click({ force: true })
  ]);
 
  await newPage.waitForLoadState('domcontentloaded');
  console.log('New window title:', await newPage.title());
  console.log('New window URL:', newPage.url());
 
  await expect(newPage.locator('body')).toBeVisible();
});
 
 
test('Task 11 - Multiple Windows', async ({ page, context }) => {
  await page.goto(WINDOWS_URL);
  await page.waitForLoadState('networkidle');
 
  // Open window 1 via "New Tab" button
  const [window1] = await Promise.all([
    context.waitForEvent('page'),
    page.getByRole('button', { name: 'New Tab', exact: true }).click({ force: true })
  ]);
  await window1.waitForLoadState('domcontentloaded');
 
  // Open window 2 via "New Window" button
  const [window2] = await Promise.all([
    context.waitForEvent('page'),
    page.getByRole('button', { name: 'New Window', exact: true }).click({ force: true })
  ]);
  await window2.waitForLoadState('domcontentloaded');
 
  // Print all open window titles
  const allPages = context.pages();
  console.log(`Total open windows: ${allPages.length}`);
  for (let i = 0; i < allPages.length; i++) {
    console.log(`Window ${i + 1} title: ${await allPages[i].title()}`);
  }
 
  expect(allPages.length).toBeGreaterThan(1);
});
 
 
test('Task 12 - Dropdown Handling', async ({ page }) => {
  await page.goto(SELECT_URL);
  await page.waitForLoadState('networkidle');
 
  const dropdown = page.locator('#inputGroupSelect03');
 
  // Select by label
  await dropdown.selectOption({ label: 'Mr.' });
  await expect(dropdown).toHaveValue('2');
  console.log('Selected by label Mr. → value:', await dropdown.inputValue());
 
  // Select by index
  await dropdown.selectOption({ index: 1 });
  await expect(dropdown).toHaveValue('1');
  console.log('Selected by index 1 → value:', await dropdown.inputValue());
 
  // Select by value
  await dropdown.selectOption({ value: '3' });
  await expect(dropdown).toHaveValue('3');
  console.log('Selected by value 3 → value:', await dropdown.inputValue());
})
});