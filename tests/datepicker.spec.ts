import { test } from '@playwright/test';
import { selectDate } from '../helperFunctions/Datapicker'; 

// Example test data
const testDates = [
  { day: 16, month: 3, year: 2026 },
  { day: 5, month: 8, year: 2024 },
];

test('Reusable Date Picker Test', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  for (const data of testDates) {
    console.log(`Selecting date: ${data.day}-${data.month}-${data.year}`);
    await selectDate(page, data.day, data.month, data.year);
  }
});