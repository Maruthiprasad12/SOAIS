import { test } from '@playwright/test';

test('File Upload Demo', async ({ page }) => {

  await page.goto('https://davidwalsh.name/demo/multiple-file-upload.php');

  // Upload single file
  await page.setInputFiles('#filesToUpload', 'screenshots/after.png');

  // Wait to see result
  await page.waitForTimeout(2000);

  // Upload multiple files
  await page.setInputFiles('#filesToUpload', [
    'screenshots/after.png',
    'screenshots/before.png'
  ]);

  await page.waitForTimeout(2000);

});