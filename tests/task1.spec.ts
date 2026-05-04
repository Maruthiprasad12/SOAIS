import { test, expect } from '@playwright/test';

test('frame 5', async ({ page }) => {
  await page.goto('https://ui.vision/demo/webtest/frames/');

  const frame5 = page.frameLocator("[src='frame_5.html']");

  // Fill input
  await frame5.locator("[name='mytext5']").fill("John");

  // Get the link URL
  const url = await frame5
    .locator("a[href='https://a9t9.com']")
    .getAttribute('href');

  // Navigate manually
  await page.goto(url!);

  // Wait for load
  await page.waitForLoadState('load');

  // Verify something on the page
  await expect(page.locator('body')).toBeVisible();
}); 