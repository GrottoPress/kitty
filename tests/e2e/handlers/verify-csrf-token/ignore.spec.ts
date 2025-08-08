import { expect, test } from '@playwright/test'

const path = '/handlers/verify-csrf-token/ignore'

test.describe('verifyCsrfToken', () => {
  test('ignores valid CSRF token for form data', async ({ page }) => {
    await page.goto(path)
    await page.click('#with-token button')

    page.on('response', (response) => {
      expect(response.status()).toBe(200)
    })
  })

  test('ignores invalid CSRF token for form data', async ({ page }) => {
    await page.goto(path)
    await page.click('#without-token button')

    page.on('response', (response) => {
      expect(response.status()).toBe(200)
    })
  })

  test('ignores valid CSRF token for JSON data', async ({ page }) => {
    await page.goto(path)
    await page.click('#json-with-token button')

    await expect(page.locator('h1')).toHaveText('200')
  })

  test('ignores invalid CSRF token for JSON data', async ({ page }) => {
    await page.goto(path)
    await page.click('#json-without-token button')

    await expect(page.locator('h1')).toHaveText('200')
  })
})
