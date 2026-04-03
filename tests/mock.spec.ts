import {test,} from '@playwright/test';
test('handling frame ',async({page})=>{

    await page.goto('https://ui.vision/demo/webtest/frames/')
    await page.frameLocator('frame[src="frame_3.html"]').frameLocator('iframe[src="https://docs.google.com/forms/d/1yfUq-GO9BEssafd6TvHhf0D6QLDVG3q5InwNE2FFFFQ/viewform?embedded=true"]').getByText('Yes').click({force:true})
})

test.only('new tab handling', async({page,context})=>{
    await page.goto('https://testautomationpractice.blogspot.com/')
    const[newpage] = await Promise.all([
        context.waitForEvent('page'),
        page.click('//button[@onclick="myFunction()"]')
    ])
})