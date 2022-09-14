<script lang="ts">
  import Button from '../../../lib/components/ToggleButton.svelte'

  let menu: HTMLElement | undefined
  let showMenu = false
</script>

<div>
  <Button bind:open={showMenu} target={menu} clickOutside>
    &equiv; Menu
  </Button>

  {#if showMenu}
    <nav bind:this={menu} data-sveltekit-prefetch>
      <a href="/csrf-token">Link A</a>
      <a href="/handlers/filter-request-methods">Link B</a>
      <a href="/handlers/verify-csrf-token">Link C</a>
    </nav>
  {/if}
</div>
