import { test,expect } from '@playwright/test'

test('working with screenshot', async ({ page }) => {
    await page.goto('https://www.flipkart.com/')
    await page.screenshot({ path: 'testData/screenshot/screenshot.png' })
    await page.screenshot({ path: 'testData/screenshot/screenshot1.png',fullPage:true })
    await page.locator('img[alt="Login"]').first().dblclick({force:true})
     await page.locator('//div[@id="container"]/div/div[3]/div/div[2]').screenshot({ path: 'testData/screenshot/screenshot3.png' })
    //  await expect(page).toHaveScreenshot('testData/screenshot/screenshot1.png')
})