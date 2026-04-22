import { test, expect, chromium,firefox,webkit } from '@playwright/test';   
test('Login with standard and locked users in separate contexts', async () => {
  // const browser: Browser = await chromium.launch();
  const browser = [chromium,firefox,webkit]
for (const browserType of browser){
  const browser = await browserType.launch()
   const context1 = await browser.newContext();

  // STANDARD USER
 
  const page1 = await  context1.newPage();

  await page1.goto('/');
  await page1.fill('#user-name', 'standard_user');
  await page1.fill('#password', 'secret_sauce');
  await page1.click('#login-button');

  // Validate successful login
  await expect(page1).toHaveURL(/inventory/);

  console.log(' Standard user logged in successfully');

  // LOCKED USER 
  const context2 = await browser.newContext();
  const page2 = await context2.newPage();

  await page2.goto('/');
  await page2.fill('#user-name', 'locked_out_user');
  await page2.fill('#password', 'secret_sauce');
  await page2.click('#login-button');

  // Validate error message
  const error = page2.locator('[data-test="error"]');
  await expect(error).toContainText('locked out');

  console.log('Locked user login failed as expected');

  await browser.close();
}
});