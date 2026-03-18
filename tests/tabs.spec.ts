import { test, expect } from '@playwright/test';

test('Handle New Tab', async ({ page, context }) => {

  await page.goto('https://testautomationpractice.blogspot.com/');

  // Wait for new tab to open
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.click('button[onclick="myFunction()"]')
  ]);

  await newPage.waitForLoadState();
  const title = await newPage.title();
  console.log(title);

});