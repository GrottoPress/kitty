<script lang="ts">
  import { afterNavigate } from '$app/navigation'
  import clickOutsideAction from '$lib/actions/click-outside'

  export let clickOutside = false
  export let open: boolean
  export let target: HTMLElement | undefined = undefined

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
  on:click={toggle}
  class="toggle-button">

  <slot />
</button>
