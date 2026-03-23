import { test, expect } from '@playwright/test';
import fs from 'fs';

test('Screenshot Demo (Beginner)', async ({ page }) => {

    // Create screenshots folder
    if (!fs.existsSync('screenshots')) {
        fs.mkdirSync('screenshots');
    }

    await page.goto('https://www.saucedemo.com/');

    // Full page screenshot
    await page.screenshot({
        path: 'screenshots/full.png',
        fullPage: true
    });

    //  Logo screenshot
    await page.locator('.login_logo').screenshot({
        path: 'screenshots/logo.png'
    });

    // Fill login details
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');

    //  Before login
    await page.screenshot({ path: 'screenshots/before.png' });

    // Click login
    await page.click('#login-button');

    // 📸 After login
    await page.screenshot({ path: 'screenshots/after.png' });

    // ✅ Check files created
    expect(fs.existsSync('screenshots/full.png')).toBeTruthy();
    expect(fs.existsSync('screenshots/logo.png')).toBeTruthy();
    const before = fs.readFileSync('screenshots/before.png');
    const after = fs.readFileSync('screenshots/after.png');

    console.log(after.equals(after)); // true or false
});