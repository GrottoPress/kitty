<script lang="ts">
  import clickOutsideAction from '$lib/actions/click-outside'

  export let clickOutside = false
  export let open: boolean
  export let target: HTMLElement | undefined = undefined

  const toggle = () => {
    open = !open
  }

  const close = (event: Event) => {
    if (!clickOutside) return
    if (target === event.target) return

    open = false
  }
</script>

<button type="button"
  use:clickOutsideAction={close}
  on:click={toggle}
  class="toggle-button">

  <slot />
</button>
