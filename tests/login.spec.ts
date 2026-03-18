import { test, expect } from '@playwright/test';

const baseURL = 'https://www.saucedemo.com/';
const password = 'secret_sauce';

const users = [
  'standard_user',
  'locked_out_user',
  'problem_user',
  'performance_glitch_user',
  'error_user',
  'visual_user'
];

test.describe('SauceDemo Login Tests', () => {

  users.forEach((username) => {

    test(`Login test for ${username}`, async ({ page }) => {

      await page.goto(baseURL);

      await page.fill('#user-name', username);
      await page.fill('#password', password);

      await page.click('#login-button');

      if (username === 'locked_out_user') {
        await expect(page.locator('[data-test="error"]'))
          .toContainText('Sorry, this user has been locked out');
      } else {
        await expect(page).toHaveURL(/inventory/);
        await expect(page.locator('.title')).toHaveText('Products');
      }

    });

  });

});