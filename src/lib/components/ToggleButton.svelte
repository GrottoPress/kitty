<script lang="ts">
  import { type Snippet } from 'svelte'
  import { afterNavigate } from '$app/navigation'
  import clickOutsideAction from '$lib/actions/click-outside'

  interface Props {
    clickOutside?: boolean
    open: boolean
    target?: HTMLElement | undefined
    children?: Snippet
  }

  let {
    clickOutside = false,
    open = $bindable(),
    target = undefined,
    children
  }: Props = $props()

  const toggle = () => {
    open = !open
  }

  const close = (event: Event) => {
    if (!clickOutside || !target) return
    const eventTarget = event.target as HTMLElement

    if (target.contains(eventTarget)) return
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
