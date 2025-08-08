import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import ToggleButton from './toggle-button.test.svelte'

describe(ToggleButton, () => {
  it('opens and closes target', async () => {
    const user = userEvent.setup()
    const { container } = render(ToggleButton)

    await user.click(screen.getByRole('button'))
    expect(container.querySelector('nav')).toBeInTheDocument()

    await user.click(screen.getByRole('button'))
    expect(container.querySelector('nav')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button'))
    expect(container.querySelector('nav')).toBeInTheDocument()
  })

  it('closes upon clicking outside it', async () => {
    const user = userEvent.setup()
    const { container } = render(ToggleButton)

    await user.click(screen.getByRole('button'))
    expect(container.querySelector('nav')).toBeInTheDocument()

    await user.click(screen.getByTestId('wrap'))
    expect(container.querySelector('nav')).not.toBeInTheDocument()
  })

  it('does not close upon clicking its target', async () => {
    const user = userEvent.setup()
    const { container } = render(ToggleButton)

    await user.click(screen.getByRole('button'))
    expect(container.querySelector('nav')).toBeInTheDocument()

    await user.click(screen.getByTestId('menu'))
    expect(container.querySelector('nav')).toBeInTheDocument()
  })
})
