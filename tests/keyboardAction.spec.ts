import { test, expect } from '@playwright/test';

test('Keyboard Interactions - GoTranscript', async ({ page }) => {

  await page.goto('https://gotranscript.com/text-compare');

  const textArea1 = page.locator('textarea[name="text1"]');
  const textArea2 = page.locator('textarea[name="text2"]');

  // Enter text in first text area
  await textArea1.click();
  await page.keyboard.type('Hello Playwright');

  // Tab to move to second field
  await page.keyboard.press('Tab');
  await page.keyboard.type('Initial text');

  // Select all text in second textarea
  await page.keyboard.press('Control+A');

  // Clear text using Backspace
  await page.keyboard.press('Backspace');

  // Copy text from first textarea
  await textArea1.click();
  await page.keyboard.press('Control+A');
  await page.keyboard.press('Control+C');

  // Paste into second textarea
  await textArea2.click();
  await page.keyboard.press('Control+V');

  // Assertion
  await expect(textArea2).toHaveValue('Hello Playwright');

  // Extra Challenge: Edit text using keyboard
  await page.keyboard.press('End');
  await page.keyboard.type(' Automation');

  const finalText = await textArea2.inputValue();
  expect(finalText).toBe('Hello Playwright Automation');

});