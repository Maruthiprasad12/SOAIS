import {test,expect, chromium} from "@playwright/test"

test('handling tables',async()=>{
    const browser = await chromium.launch()
    const context = await browser.newContext()
    const page = await context.newPage()

    await page.goto('https://testautomationpractice.blogspot.com/')

    const Rows = await page.locator
})