const {chromium } = require('playwright');
const fs = require('fs');
const {test} = require('@playwright/test')

test("PDF Genaration",async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://www.saucedemo.com/');

  const pdfPath = 'testData/pdf/output.pdf';

  await page.pdf({
    path: pdfPath,
    format: 'A4',
    landscape: true,
    margin: {
      top: '20mm',
      bottom: '20mm',
      left: '15mm',
      right: '15mm'
    },
    printBackground: true
  });

  if (fs.existsSync(pdfPath)) {
    console.log('Custom PDF created successfully:', pdfPath);
  } else {
    console.log('PDF creation failed');
  }

  await browser.close();
})