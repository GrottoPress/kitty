import { expect, test } from '@playwright/test'

const path = '/components/connection'

test.describe('Connection', () => {
  test('shows online status', async ({ page }) => {
    await page.goto(path)

    await page.evaluate(() => window.dispatchEvent(new Event('online')))
    expect(await page.textContent('aside p')).toBe('Online')
  })

  test('shows offline status', async ({ page }) => {
    await page.goto(path)

    await page.evaluate(() => window.dispatchEvent(new Event('offline')))
    expect(await page.textContent('aside p')).toBe('Offline')
  })

  // TODO: route.abort() errors and halts run as a result
  test.skip('shows slow status', async ({ page }) => {
    await page.goto(path)
    await page.evaluate(() => window.dispatchEvent(new Event('online')))

    await page.route('/', async (route) => {
      await page.waitForTimeout(2000)
      await route.abort('aborted')
    })

    await page.goto('/')
    expect(await page.textContent('aside p')).toBe('Slow')
  })
})
