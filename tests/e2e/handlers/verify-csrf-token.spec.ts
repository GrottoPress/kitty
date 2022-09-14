import { expect, test } from '@playwright/test'

const path = '/handlers/verify-csrf-token'

test.describe('verifyCsrfToken', () => {
  test('accepts valid CSRF token for form data', async ({ page }) => {
    await page.goto(path)
    await page.click('#with-token button')

    page.on('response', (response) => {
      expect(response.status()).toBe(200)
    })
  })

  test('rejects invalid CSRF token for form data', async ({ page }) => {
    await page.goto(path)
    await page.click('#without-token button')

    page.on('response', (response) => {
      expect(response.status()).toBe(403)
    })
  })

  test('accepts valid CSRF token for JSON data', async ({ page }) => {
    await page.goto(path)
    await page.click('#json-with-token button')
    expect(await page.textContent('h1')).toBe('200')
  })

  test('rejects invalid CSRF token for JSON data', async ({ page }) => {
    await page.goto(path)
    await page.click('#json-without-token button')
    expect(await page.textContent('h1')).toBe('403')
  })
})
