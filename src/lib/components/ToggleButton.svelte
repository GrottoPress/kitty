<script lang="ts">
  import clickOutsideAction from '$lib/actions/click-outside'

  export let clickOutside = false
  export let open: boolean

  const toggle = () => {
    open = !open
  }

  const close = () => {
    if (!clickOutside) return

    open = false
  }
</script>

<button type="button"
  use:clickOutsideAction={close}
  on:click={toggle}
  class="toggle-button">

  <slot />
</button>
