import { test, expect } from "@playwright/test"


test.describe("Handling Alerts", async () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://testautomationpractice.blogspot.com/')
    })

test('Handle simple-Alerts', async ({ page }) => {
  page.once('dialog', async dialog => {
    console.log(dialog.message());
    await dialog.accept();
  });

  await page.locator('#alertBtn').click();

})
test('Handle confirmation-Alerts', async ({ page }) => {
  page.once('dialog', async dialog => {
    console.log(dialog.message());
    await dialog.accept(); // click OK
  });

  await page.locator('#confirmBtn').click();

})

test('Handle Prompt-Alerts', async ({ page }) => {
  page.once('dialog', async dialog => {
    console.log(dialog.message());
    await dialog.accept('Maruthi'); 
  });

  await page.locator('#promptBtn').click();

});
})