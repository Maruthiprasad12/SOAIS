import { test,expect} from "@playwright/test"

test('switching new Tab',async({page})=>{
    page.goto('')
    const[newTab] = await Promise.all([
        page.waitForEvent("popup"),
        page.click('')
    ])

    expect(page).toHaveURL('')
})

