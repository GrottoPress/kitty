<script lang="ts">
  import type { Snippet } from 'svelte'
  import { afterNavigate } from '$app/navigation'
  import {
    clickOutside as clickOutsideAction
  } from '$lib/actions/click-outside'

  interface Props {
    clickOutside?: HTMLElement
    open: boolean
    children?: Snippet
  }

  let {
    clickOutside = undefined,
    open = $bindable(),
    children
  }: Props = $props()

  const toggle = () => open = !open

  const close = (event: Event) => {
    if (!open || !clickOutside) return
    const eventTarget = event.target as HTMLElement

    if (clickOutside.contains(eventTarget)) return
    open = false
  }

  afterNavigate(() => open = false)
</script>

<button type="button"
  use:clickOutsideAction={close}
  onclick={toggle}
  class="toggle-button">

  {@render children?.()}
</button>
