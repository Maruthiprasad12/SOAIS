  import {test,expect} from "@playwright/test"

  import testdata from "../testData/swaglabsCreds.json"
  test("Verify swag labs with valid credentials", async ({ page }) => {
    await page.goto('/')
    await page.locator('#user-name').fill(testdata.username)
    await page.locator("#password").fill(testdata.password)
    await page.getByRole('button', { name: 'Login' }).click({timeout:5000});
    // await page.locator("#login-button").click()
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
    page.context().storageState({path:"testData/Authentication.json"})
  })