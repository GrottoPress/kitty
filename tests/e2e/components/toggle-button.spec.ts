import { expect, test } from '@playwright/test'

const path = '/components/toggle-button'

test.describe('ToggleButton', () => {
  test('opens and closes target', async ({ page }) => {
    await page.goto(path)

    await page.click('button')
    await expect(page.locator('nav')).toBeVisible()

    await page.click('button')
    await expect(page.locator('nav')).not.toBeVisible()

    await page.click('button')
    await expect(page.locator('nav')).toBeVisible()

    await page.click('button')
    await expect(page.locator('nav')).not.toBeVisible()
  })

  test('closes upon clicking outside it', async ({ page }) => {
    await page.goto(path)

    await page.click('button')
    await expect(page.locator('nav')).toBeVisible()

    await page.click('div')
    await expect(page.locator('nav')).not.toBeVisible()
  })

  test('does not close upon clicking its target', async ({ page }) => {
    await page.goto(path)

    await page.click('button')
    await expect(page.locator('nav')).toBeVisible()

    await page.click('nav')
    await expect(page.locator('nav')).toBeVisible()
  })

  test('closes upon clicking a link inside its target', async ({ page }) => {
    await page.goto(path)

    await page.click('button')
    await expect(page.locator('nav')).toBeVisible()

    await page.click('nav a:first-child')
    await expect(page.locator('nav')).not.toBeVisible()
  })
})
