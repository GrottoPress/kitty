import { expect, test } from '@playwright/test'

const path = '/handlers/filter-request-methods'

test.describe('filterRequestMethods', () => {
  test('rejects disallowed request method', async ({ page }) => {
    await page.goto(path)
    await page.click('form button')

    await expect(page.locator('h1')).toHaveText('400')
  })
})
