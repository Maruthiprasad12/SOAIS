import { test, expect } from '@playwright/test';

test('file download test', async ({ page }) => {
  await page.goto('https://example.com');

  const [download] = await Promise.all([
    page.waitForEvent('download'),   // wait for download
    page.click('#downloadBtn')       // trigger download
  ]);

  const path = await download.path();
  console.log(path);
});