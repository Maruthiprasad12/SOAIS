import { test, expect } from '@playwright/test';


test.beforeEach(async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');
})

test('Radio Button Validation', async ({ page }) => {
  

  // Locate all radio buttons (Gender section)
  const radios = page.locator('input[type="radio"]');

  const count = await radios.count();
  console.log('Total Radio Buttons:', count);

  // Loop through each radio button
  for (let i = 0; i < count; i++) {
    const radio = radios.nth(i);

    // Select radio button
    await radio.check();

    // Get value or id
    const value = await radio.getAttribute('value');
    console.log('Selected:', value);

    // Assertion: current radio should be checked
    await expect(radio).toBeChecked();

    // Verify only one is selected
    for (let j = 0; j < count; j++) {
      if (i !== j) {
        await expect(radios.nth(j)).not.toBeChecked();
      }
    }
  }

});


test('Radio Button using Array', async ({ page }) => {

  const values = ['male', 'female']; // radio values

  for (const val of values) {
    const radio = page.locator(`input[type="radio"][value="${val}"]`);

    await radio.check();

    console.log('Selected:', val);

    await expect(radio).toBeChecked();
  }
});