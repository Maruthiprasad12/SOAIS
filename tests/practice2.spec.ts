import { test, expect, Page } from '@playwright/test';

// ── CONFIG ────────────────────────────────────────────────────────────────────
const CHECK_IN  = { month: 'June', year: '2026', day: '15' };
const CHECK_OUT = { month: 'July', year: '2026', day: '20' };

// ── TEST ──────────────────────────────────────────────────────────────────────
test('Check-In and Check-Out date selection on Booking.com', async ({ page }) => {
  test.setTimeout(60000);

  await page.goto('https://www.booking.com/');

  // Dismiss sign-in modal if it appears
  const dismissBtn = page.locator('[aria-label="Dismiss sign-in info."]');
  if (await dismissBtn.isVisible({ timeout: 4000 }).catch(() => false)) {
    await dismissBtn.click();
  }

  // Open the date picker
  await page.getByTestId('searchbox-dates-container').click();

  // Wait for calendar to appear — the calendar wrapper always contains
  // the "Next month" button, so we wait for that as our "calendar is open" signal.
  await page
    .locator('[data-testid="calendar-next-month-button"]')
    .waitFor({ state: 'visible', timeout: 10000 });

  // ── CHECK-IN ────────────────────────────────────────────────────────────────
  await navigateToMonth(page, CHECK_IN.month, CHECK_IN.year);
  await clickDay(page, CHECK_IN.day, CHECK_IN.month, CHECK_IN.year);

  const checkInValue = await page.getByTestId('date-display-field-start').inputValue();
  expect(checkInValue).toBe('2026-06-15');

  // ── CHECK-OUT ───────────────────────────────────────────────────────────────
  await navigateToMonth(page, CHECK_OUT.month, CHECK_OUT.year);
  await clickDay(page, CHECK_OUT.day, CHECK_OUT.month, CHECK_OUT.year);

  const checkOutValue = await page.getByTestId('date-display-field-end').inputValue();
  expect(checkOutValue).toBe('2026-07-20');
});

// ── HELPERS ───────────────────────────────────────────────────────────────────

/**
 * Returns the text of all visible <h3> month titles in the calendar.
 *
 * Booking.com renders two side-by-side month panels, each with an <h3>
 * containing plain text like "June 2026". We do NOT use a test-id on the
 * calendar wrapper because Booking.com does not expose one consistently —
 * instead we scope to any <h3> that is a descendant of the next-month
 * button's closest calendar ancestor, or simply grab ALL h3s on the page
 * that match the "Month Year" pattern.
 */
async function getVisibleMonths(page: Page): Promise<string[]> {
  // Grab every h3 on the page and filter to those matching "Word 4digits"
  const allH3Texts = await page.locator('h3').allInnerTexts();
  return allH3Texts
    .map((t) => t.trim())
    .filter((t) => /^[A-Za-z]+ \d{4}$/.test(t));
}

/**
 * Clicks "Next month" until the target month/year appears in either
 * of the two calendar panels.
 */
async function navigateToMonth(
  page: Page,
  targetMonth: string,
  targetYear: string,
): Promise<void> {
  const target = `${targetMonth} ${targetYear}`;

  for (let i = 0; i < 24; i++) {
    const visibleMonths = await getVisibleMonths(page);

    if (visibleMonths.some((m) => m === target)) {
      return;
    }

    const nextBtn = page.locator('[data-testid="calendar-next-month-button"]');
    await nextBtn.waitFor({ state: 'visible', timeout: 5000 });
    await nextBtn.click();

    // Allow calendar animation to settle before re-reading headings
    await page.waitForTimeout(350);
  }

  throw new Error(
    `Could not navigate to "${target}" within 24 clicks. ` +
    `Last visible months: ${(await getVisibleMonths(page)).join(', ')}`,
  );
}

/**
 * Clicks the correct day cell in the calendar.
 *
 * Strategy 1 — aria-label (most reliable):
 *   Each <td> button on Booking.com has an aria-label like "15 June 2026"
 *   or "June 15, 2026". We try both formats.
 *
 * Strategy 2 — table index + inner text (fallback):
 *   Find which panel (left/right) shows the target month via the h3 list,
 *   then scan that panel's <table> for a <td> whose text equals the day number.
 *   We skip any cell that has aria-disabled="true".
 */
async function clickDay(
  page: Page,
  day: string,
  month: string,
  year: string,
): Promise<void> {
  // Strategy 1: aria-label
  const ariaPatterns = [
    `${day} ${month} ${year}`,   // "15 June 2026"
    `${month} ${day}, ${year}`,  // "June 15, 2026"
  ];

  for (const pattern of ariaPatterns) {
    const cell = page.locator(`[aria-label*="${pattern}"]`).first();
    if (await cell.isVisible({ timeout: 2000 }).catch(() => false)) {
      await cell.click();
      return;
    }
  }

  // Strategy 2: scan the correct table by panel index
  const visibleMonths = await getVisibleMonths(page);
  const panelIndex = visibleMonths.findIndex((m) => m.startsWith(month));

  if (panelIndex === -1) {
    throw new Error(`Month "${month}" not visible in either calendar panel. Visible: ${visibleMonths.join(', ')}`);
  }

  const table = page.locator('table').nth(panelIndex);
  const cells = table.locator('tbody td');
  const count = await cells.count();

  for (let i = 0; i < count; i++) {
    const cell = cells.nth(i);
    const text = (await cell.innerText()).trim();

    if (text === day) {
      const isDisabled = await cell.getAttribute('aria-disabled');
      if (isDisabled === 'true') continue;

      await cell.click();
      return;
    }
  }

  throw new Error(`Day "${day}" not found in calendar panel for "${month} ${year}".`);
}