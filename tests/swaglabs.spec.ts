// import { test, expect } from "@playwright/test"
// import * as XLSX from 'xlsx';
// import * as path from 'path'

// const userDataFile = path.join(__dirname,'testData/Book (1).xlsx')
// interface UserData {
//   username: string
//   password: string
// }
import {test,expect} from '@playwright/test'
const users: string[] = [
  'standard_user',
  'locked_out_user',
  'problem_user',
  'performance_glitch_user',
  'error_user',
  'visual_user'
];
const password : string = 'secret_sauce'
test.describe("verify swaglabs functionalities", async () => {
    //  const workbook = XLSX.readFile(userDataFile)
    //   const worksheet = workbook.Sheets["Sheet1"]
    //   const xlsToJson = XLSX.utils.sheet_to_json<UserData>(worksheet)

      // console.log(xlsToJson)

  test("Verify swag labs with valid credentials", async ({ page }) => {
   
    

    await page.goto('/')
    await page.locator('#user-name').fill(users[1])
    await page.locator("#password").fill(password)
    await page.getByRole('button', { name: 'Login' }).click({timeout:5000});
    // await page.locator("#login-button").click()
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
    let productText = await page.getByText('Products').textContent()
    await expect(productText).toEqual('Products')
    await expect(page.getByText('Swag Labs')).toBeVisible()
  })

  test("Verify swag labs with locked user", async ({ page }) => {
    await page.goto('/')
    await page.fill('#user-name',users[1])
    await page.locator("#password").fill(password)
    await page.locator("#login-button").click()
    await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.')).toBeVisible()
  })

    test("Verify swag labs with invalid credentials", async ({ page }) => {
    await page.goto('/')
    await page.locator('#user-name').fill("woidjjqefhewiu")
    await page.locator("#password").fill("jdkjdj")
    await page.getByRole('button', { name: 'Login' }).click();
    // await page.locator("#login-button").click()
   await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible()
  })
})