import { test, expect } from '@playwright/test';

test('Mouse Events Automation', async ({ page }) => {
  await page.goto('https://vinothqaacademy.com/mouse-event/');

//   Mouse Hover
  const hoverBtn = page.locator('#tooltipTarget');
  await hoverBtn.hover();
  console.log('Mouse Hover performed on button');

  // Right Click (Context Menu)
  const rightClickBtn = page.locator('#rightBtn');
  await rightClickBtn.click({ button: 'right' });
  console.log('Right click performed')

  //Drag and Drop
  const drag = page.locator('#dragItem');
  const drop = page.locator('#dropZone');
  await drag.dragTo(drop);
  console.log('Drag and Drop performed');

  // Optional: verify drop text changes (depends on site)
  await expect(drop).toContainText('Drag Me');
  console.log('Drop validated');

  //Double Click
  const dblClickBtn = page.locator('#doubleBtn');
  await dblClickBtn.dblclick();
  console.log('Double Click performed');

  // Verify result of double click (example: alert text or color change)
  // On this page, text changes to "Double Clicked"
  await expect(dblClickBtn).toHaveText('Double Click Me');
  console.log('Double click result validated');
});