import { describe, expect, it } from 'vitest'
import { fireEvent, render } from '@testing-library/svelte'
import Connection from './connection.test.svelte'

describe(Connection, () => {
  it('shows online status', async () => {
    const { container } = render(Connection)

    await fireEvent.online(window)
    expect(container.querySelector('.connection')).toHaveTextContent('online')
  })

  it('shows offline status', async () => {
    const { container } = render(Connection)

    await fireEvent.offline(window)
    expect(container.querySelector('.connection')).toHaveTextContent('offline')
  })

  it.skip('shows slow status', () => {
    // TODO:
  })
})
