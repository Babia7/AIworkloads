import { test, expect } from '@playwright/test';

test('main page dock and hero', async ({ page }) => {
  await page.goto('/');
  await page.waitForTimeout(800); // allow spring animation to settle
  await expect(page).toHaveScreenshot('main-page.png', { fullPage: false });
});

test('operations page', async ({ page }) => {
  await page.goto('/operations');
  await page.waitForTimeout(800);
  await expect(page).toHaveScreenshot('operations-page.png');
});

test('glossary page', async ({ page }) => {
  await page.goto('/glossary');
  await page.waitForTimeout(800);
  await expect(page).toHaveScreenshot('glossary-page.png');
});

test('deep-dive page', async ({ page }) => {
  await page.goto('/deep-dive');
  await page.waitForTimeout(800);
  await expect(page).toHaveScreenshot('deep-dive-page.png');
});
