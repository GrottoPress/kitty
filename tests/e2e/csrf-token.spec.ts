import { expect, test } from '@playwright/test'

test.describe('/csrf-token', () => {
  test('has access to CSRF token', async ({ page }) => {
    await page.goto('/csrf-token')
    expect(await page.textContent('h1')).toBeTruthy()
  })
})
