import { test, expect } from '@playwright/test'
test.describe('verifying Login functionality', () => {
    test('verifying login with valid credentials', async ({ page }) => {
        await page.goto('/')
        // await page.fill('#user-name','standard_user')
        const locator = page.locator('#user-name');
        await locator.pressSequentially('standard_user',{ delay: 100 });
        await page.fill('#password', 'secret_sauce')
        const elementHandle = page.locator('#login-button')
        await elementHandle.dispatchEvent('click')
        // await page.click('#login-button')
        await expect(page.getByText('Swag Labs')).toBeVisible()
    })
})