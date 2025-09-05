import { describe, expect, it } from 'vitest'
import { fireEvent, render } from '@testing-library/svelte'
import Connection from './connection.test.svelte'

describe(Connection, () => {
  it('shows online status', async () => {
    const { container } = render(Connection)

    await fireEvent.online(window)

    expect(container.querySelector('.state')).toHaveTextContent('online')
    expect(container.querySelector('.status')).toHaveTextContent('online')
  })

  it('shows offline status', async () => {
    const { container } = render(Connection)

    await fireEvent.offline(window)

    expect(container.querySelector('.state')).toHaveTextContent('offline')
    expect(container.querySelector('.status')).toHaveTextContent('offline')
  })

  it.skip('shows slow status', () => {
    // TODO:
  })
})
