// Web Tables:

import { test, expect } from '@playwright/test';

const URL = 'https://www.tutorialspoint.com/selenium/practice/webtables.php';
const URL1 = 'https://www.tutorialspoint.com/selenium/practice/links.php';
const URL2 = 'https://www.tutorialspoint.com/selenium/practice/selenium_automation_practice.php';
async function getAllRows(page: any) {
    const rows = await page.locator('table tbody tr').all();
    const data = [];
    for (const row of rows) {
        const cells = await row.locator('td').allTextContents();
        if (cells.length > 0) data.push(cells.map((c: string) => c.trim()));
    }
    return data;
}


test('Task 1 - Verify column headers', async ({ page }) => {
    await page.goto(URL);

    const headers = await page.locator('table thead th').allTextContents();
    const expected = ['First Name', 'Last Name', 'Age', 'Email', 'Salary', 'Department'];

    for (const header of expected) {
        expect(headers).toContain(header);
        console.log(`Header found: ${header}`);
    }
});


test('Task 2 - Fetch and print all rows', async ({ page }) => {
    await page.goto(URL);

    const headers = await page.locator('table thead th').allTextContents();
    const rows = await getAllRows(page);

    rows.forEach((row, i) => {
        const rowData: Record<string, string> = {};
        headers.forEach((h, j) => rowData[h.trim()] = row[j]);
        console.log(`Row ${i + 1}:`, rowData);
    });

    expect(rows.length).toBeGreaterThan(0);
});


test('Task 3 - Count rows and columns', async ({ page }) => {
    await page.goto(URL);

    const rowCount = await page.locator('table tbody tr').count();
    const colCount = await page.locator('table thead th').count();

    console.log('Total rows:', rowCount);
    console.log('Total columns:', colCount);

    expect(rowCount).toBeGreaterThan(0);
    expect(colCount).toBeGreaterThan(0);
});


test('Task 4 - Validate specific record exists', async ({ page }) => {
    await page.goto(URL);

    const rows = await getAllRows(page);
    const found = rows.some(row => row.includes('Cierra') && row.includes('Vega'));

    console.log('Cierra Vega found:', found);
    expect(found).toBe(true);
});


test('Task 5 - Fetch salary of specific person', async ({ page }) => {
    await page.goto(URL);

    const headers = await page.locator('table thead th').allTextContents();
    const salaryIndex = headers.map(h => h.trim()).indexOf('Salary');
    const rows = await getAllRows(page);

    const aldenRow = rows.find(row => row.includes('Alden') && row.includes('Cantrell'));
    expect(aldenRow).toBeDefined();

    const salary = aldenRow![salaryIndex];
    console.log('Salary of Alden Cantrell:', salary);
});


test('Task 6 - Verify duplicate records', async ({ page }) => {
    await page.goto(URL);

    const rows = await getAllRows(page);
    const seen = new Set<string>();
    let hasDupes = false;

    for (const row of rows) {
        const key = row.join('|');
        if (seen.has(key)) {
            console.log('Duplicate found:', row);
            hasDupes = true;
        }
        seen.add(key);
    }

    console.log('Has duplicates:', hasDupes);
});

test('Task 7 - Click Edit button of specific row', async ({ page }) => {
    await page.goto(URL);

    const rows = await page.locator('table tbody tr').all();

    for (const row of rows) {
        const cells = await row.locator('td').allTextContents();
        if (cells[0].trim() === 'Cierra' && cells[1].trim() === 'Vega') {

            await row.getByRole('link', { name: 'edit' }).click({ force: true });
            console.log('Edit clicked for Cierra Vega');
            break;
        }
    }


    await expect(page.locator('input').first()).toBeVisible({ timeout: 5000 });
});


test('Task 8 - Add new record and verify in table', async ({ page }) => {
    await page.goto(URL);

    await page.locator('button', { hasText: 'Add' }).click({ force: true });

    await expect(page.getByRole('dialog')).toBeVisible();

    await page.locator('[placeholder="First Name"]').fill('Hareesh');
    await page.locator('[placeholder="Last Name"]').fill('Reddy');
    await page.locator('[placeholder="Enter Email"]').fill('hareesh@example.com');
    await page.locator('[placeholder="Enter Age"]').fill('3000');
    await page.locator('[placeholder="Enter Salary"]').fill('5000000000');
    await page.locator('[placeholder="Enter Department"]').fill('QA');

    await page.getByRole('button', { name: 'Login' }).click();


});



test('Extra - Validate all emails contain @', async ({ page }) => {
    await page.goto(URL);

    const headers = await page.locator('table thead th').allTextContents();
    const emailIndex = headers.map(h => h.trim()).indexOf('Email');
    const rows = await getAllRows(page);

    for (const row of rows) {
        const email = row[emailIndex];
        console.log('Email:', email);
        expect(email).toContain('@');
    }
});


test('Extra - Find highest salary', async ({ page }) => {
    await page.goto(URL);

    const headers = await page.locator('table thead th').allTextContents();
    const salaryIndex = headers.map(h => h.trim()).indexOf('Salary');
    const rows = await getAllRows(page);

    const salaries = rows.map(row => parseInt(row[salaryIndex]) || 0);
    const highest = Math.max(...salaries);
    const topRow = rows.find(row => parseInt(row[salaryIndex]) === highest);

    console.log('Highest salary:', highest);
    console.log('Record:', topRow);
    expect(highest).toBeGreaterThan(0);
});

// import { test, expect } from '@playwright/test';

test('Task 1 - Click Created link and verify response', async ({ page }) => {
    await page.goto(URL1);

    await page.getByRole('link', { name: 'Created' }).click();

    await expect(page.getByText('201')).toBeVisible();
});

test('Task 2 - Click Bad Request using partial text and verify 400', async ({ page }) => {
    await page.goto(URL1);

    await page.getByRole('link', { name: /Bad Request/i }).click();

    await expect(page.getByText('400')).toBeVisible();
});

test('Task 3 - Count total links on the page', async ({ page }) => {
    await page.goto(URL1);

    const links = page.locator('a');
    const count = await links.count();

    console.log('Total links:', count);
    expect(count).toBeGreaterThan(0);
});

test('Debug - Print all input elements', async ({ page }) => {
    await page.goto(URL2);
    await page.waitForLoadState('networkidle');

    const inputs = await page.evaluate(() =>
        Array.from(document.querySelectorAll('input, select, textarea, button')).map(el => {
            const e = el as HTMLInputElement;
            return `tag=${e.tagName} id="${e.id}" name="${e.name}" type="${e.type}" value="${e.value}" placeholder="${e.placeholder}"`;
        })
    );

    inputs.forEach(i => console.log(i));
});


test('Task 6 - Fill Complete Form and Submit', async ({ page }) => {
    await page.goto(URL2);
    await page.waitForLoadState('networkidle');

    await page.locator('#name:visible').fill('Hareesh Reddy');
    await page.locator('input[placeholder="name@example.com"]').fill('hareesh@example.com');

    // Radio buttons — use force to bypass overlays
    await page.locator('input[type="radio"][value="Male"]').check({ force: true });

    await page.locator("#mobile").fill('9876543210');
    await page.locator('#dob').fill('2000-01-15');

    await page.locator('#subjects').fill('Maths');
    await page.keyboard.press('Enter');

    // Checkboxes — use force to bypass overlays
    await page.locator('input[type="checkbox"][value="Sports"]').check({ force: true });

    await page.locator('#picture').fill('123 Main Street, Hyderabad');

    await page.locator('#state').click({ force: true });
    await page.getByText('NCR', { exact: true }).click({ force: true });

    await page.locator('#city').click({ force: true });
    await page.getByText('Delhi', { exact: true }).click({ force: true });

    /* await page.locator('button[type="submit"]').click({ force: true });
     await page.waitForNavigation().catch(() => {}); */
});


test('Task 7 - Radio Button Handling', async ({ page }) => {
    await page.goto(URL2);
    await page.waitForLoadState('networkidle');

    await page.locator('#gender').check({ force: true });

    expect(await page.locator('#gender').isChecked()).toBe(true);
});


test('Task 8 - Checkbox Validation', async ({ page }) => {
    await page.goto(URL2);
    await page.waitForLoadState('networkidle');

    await page.locator('#hobbies').check({ force: true });
    await page.getByRole('checkbox', { name: 'Reading' }).check({ force: true });
    await page.locator('input[type="checkbox"]').check({ force: true });

    expect(await page.locator('input[type="checkbox"][value="Sports"]').isChecked()).toBe(true);
    expect(await page.locator('input[type="checkbox"][value="Reading"]').isChecked()).toBe(true);
    expect(await page.locator('input[type="checkbox"][value="Music"]').isChecked()).toBe(true);
});


test('Task 9 - Form Validation on Empty Submit', async ({ page }) => {
    await page.goto(URL2);
    await page.waitForLoadState('networkidle');

    await page.locator('button[type="submit"]').click({ force: true });

    const validationMessage = await page.locator('input[placeholder="Name"]').evaluate(
        (el: HTMLInputElement) => el.validationMessage
    );

    console.log('Validation message:', validationMessage);
    expect(validationMessage).not.toBe('');
});
//  const URL = 'https://www.tutorialspoint.com/selenium/practice/links.php';

test('Task 10 - Click Created link and verify response', async ({ page }) => {
    await page.goto(URL);

    await page.getByRole('link', { name: 'Created' }).click();

    await expect(page.getByText('201')).toBeVisible();
});

test('Task 11 - Click Bad Request using partial text and verify 400', async ({ page }) => {
    await page.goto(URL);

    await page.getByRole('link', { name: /Bad Request/i }).click();

    await expect(page.getByText('400')).toBeVisible();
});

test('Task 12- Count total links on the page', async ({ page }) => {
    await page.goto(URL);

    const links = page.locator('a');
    const count = await links.count();

    console.log('Total links:', count);
    expect(count).toBeGreaterThan(0);
});