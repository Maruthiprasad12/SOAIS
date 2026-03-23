import { Page } from '@playwright/test';

export async function selectDate(
  page: Page,
  day: number,
  month: number, // 1-12
  year: number
) {
  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  // Open date picker
  await page.locator('#datepicker').click();

  // Navigate to correct year
  while (true) {
    const yearText = await page.locator('.ui-datepicker-year').textContent();
    if (!yearText) break;
    const currentYear = parseInt(yearText);
    if (currentYear === year) break;

    if (currentYear < year) {
      await page.locator('.ui-datepicker-next').click();
    } else {
      await page.locator('.ui-datepicker-prev').click();
    }
  }

  // Navigate to correct month
  while (true) {
    const monthText = await page.locator('.ui-datepicker-month').textContent();
    if (!monthText) break;
    const currentMonth = monthNames.indexOf(monthText) + 1; // 1-based
    if (currentMonth === month) break;

    if (currentMonth < month) {
      await page.locator('.ui-datepicker-next').click();
    } else {
      await page.locator('.ui-datepicker-prev').click();
    }
  }

  // Select the day
  await page.locator(`.ui-datepicker-calendar td:not(.ui-datepicker-other-month) >> text="${day}"`).click();
}