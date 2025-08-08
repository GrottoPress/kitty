import { expect, test } from '@playwright/test'

const path = '/components/connection'

test.describe('Connection', () => {
  test('shows online status', async ({ context, page }) => {
    context.setOffline(false)
    await page.goto(path)

    await expect(page.locator('aside p')).toHaveText('Online')
  })

  test('shows offline status', async ({ context, page }) => {
    context.setOffline(true)
    await page.goto(path)

    await expect(page.locator('aside p')).toHaveText('Offline')
  })

  // TODO: route.abort() errors and halts run as a result
  test.skip('shows slow status', async ({ context, page }) => {
    context.setOffline(false)

    await page.route('/', async (route) => {
      await page.waitForTimeout(2000)
      await route.abort('aborted')
    })

    await page.goto('/')

    await expect(page.locator('aside p')).toHaveText('Slow')
  })
})
