import { test, expect } from '@playwright/test';

test.describe('Operations Playbooks route', () => {
  test('dock "Ops Playbooks" link navigates to /operations', async ({ page }) => {
    await page.goto('/');

    // The dock renders after the spring animation (delay: 0.5s) — wait for it
    const opsLink = page.getByRole('link', { name: 'Ops Playbooks' });
    await expect(opsLink).toBeVisible({ timeout: 5000 });

    await opsLink.click();

    await expect(page).toHaveURL('/operations');
  });

  test('/operations page renders and shows back link', async ({ page }) => {
    await page.goto('/operations');

    // Brand area shows "← Back" on the operations page
    await expect(page.getByRole('link', { name: '← Back' })).toBeVisible();
  });

  test('"← Back" link returns to /', async ({ page }) => {
    await page.goto('/operations');

    await page.getByRole('link', { name: '← Back' }).click();

    await expect(page).toHaveURL('/');
  });

  test('direct navigation to /operations does not 404', async ({ page }) => {
    const response = await page.goto('/operations');

    // Vite dev server returns 200 for all routes (history API fallback)
    expect(response?.status()).toBe(200);
    await expect(page.getByRole('link', { name: '← Back' })).toBeVisible();
  });
});
