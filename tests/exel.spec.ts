import { test, expect } from "@playwright/test"
import data from "../testData/swaglabsCreds.json"
import * as XLSX from 'xlsx';
import path from 'path'

const userDataFile = path.join(__dirname,'../testData/Book (1).xlsx')
interface UserData{
  username : string
  password : string
}

 test("Verify swag labs with valid credentials", async ({ page }) => {
      const workbook = XLSX.readFile(userDataFile)
      const worksheet = workbook.Sheets["Sheet1"]
      const xlsToJson = XLSX.utils.sheet_to_json<UserData>(worksheet)

      console.log(xlsToJson)
    

    await page.goto('/')
    await page.locator('#user-name').fill(xlsToJson[0].username)
    await page.locator("#password").fill(xlsToJson[0].password)
    await page.getByRole('button', { name: 'Login' }).click();
    // await page.locator("#login-button").click()
    await expect(page).toHaveURL('/inventory.html')
    let productText = await page.getByText('Products').textContent()
    await expect(productText).toEqual('Products')
    await expect(page.getByText('Swag Labs')).toBeVisible()
 
  })

//   import { test } from '@playwright/test';
// import * as XLSX from 'xlsx';

test('write username and password to excel', async () => {

  // Test data
  const data = [
    { Username: 'user1', Password: 'pass123' },
    { Username: 'user2', Password: 'pass456' },
    { Username: 'admin', Password: 'admin@123' }
  ];

  // Convert JSON to worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Create workbook
  const workbook = XLSX.utils.book_new();

  // Add worksheet
  XLSX.utils.book_append_sheet(workbook, worksheet, 'LoginData');

  // Write Excel file
  XLSX.writeFile(workbook, 'credentials.xlsx');

  console.log('Excel file created successfully');

});

test('write data to excel file', async () => {

  // Resolve file path
  const filePath = path.join(__dirname, '../testData/Book (1).xlsx');

  // Read workbook
  const workbook = XLSX.readFile(filePath);

  // Get first sheet
  const sheetName = workbook.SheetNames[1];
  const sheet = workbook.Sheets[sheetName];

  // Convert sheet to JSON
  const data: any = XLSX.utils.sheet_to_json(sheet);

  // Add new row
  data.push({
    username: 'standard_user',password: 'secret_sauce'},
    {username : 'locked_out_user',password:'secret_sauce'},
    {username : 'problem_user',password:'secret_sauce'},
    {username : 'performance_glitch_user',password:'secret_sauce'}
    
  );

  // Convert JSON back to sheet
  const newSheet = XLSX.utils.json_to_sheet(data);

  // Replace sheet
  workbook.Sheets[sheetName] = newSheet;

  // Write back to same file
  XLSX.writeFile(workbook, filePath);

});