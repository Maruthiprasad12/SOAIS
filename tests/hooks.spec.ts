import { test, expect } from '@playwright/test';

test.describe('Hooks Demo - Version 2', () => {

  // BEFORE ALL 
  test.beforeAll(async () => {
    console.log('beforeAll: Setup before all tests');
  });

  //  BEFORE EACH 
  test.beforeEach(async ({ page }) => {
    console.log('beforeEach: Navigate to site');
    await page.goto('https://testautomationpractice.blogspot.com/');
  });

  // TEST 1 
  test('Check Page Title', async ({ page }) => {
    console.log('Running Test 1');
    await expect(page).toHaveTitle(/Automation/);
  });

  //  TEST 2 
  test('Check Heading Visible', async ({ page }) => {
    console.log(' Running Test 2');
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
  });

  // AFTER EACH 
  test.afterEach(async () => {
    console.log('afterEach: Test completed');
  });

  //  AFTER ALL 
  test.afterAll(async () => {
    console.log('afterAll: Cleanup after all tests');
  });

});