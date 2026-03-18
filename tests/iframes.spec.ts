import {test} from '@playwright/test'

test("Iframes",async({page})=>{
   await page.goto('https://ui.vision/demo/webtest/frames/')

    await page.frameLocator('frame[src="frame_3.html"]').frameLocator('iframe[src="https://docs.google.com/forms/d/1yfUq-GO9BEssafd6TvHhf0D6QLDVG3q5InwNE2FFFFQ/viewform?embedded=true"]').locator('(//div[@class="uHMk6b fsHoPb"])[1]').check()
})

test("date",async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/')
    await page.locator('#datepicker').fill('02/01/2026')
    
})