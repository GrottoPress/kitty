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
    <nav bind:this={menu}>
      <a sveltekit:prefetch href="/csrf-token">Link A</a>
      <a sveltekit:prefetch href="/handlers/filter-request-methods">Link B</a>
      <a sveltekit:prefetch href="/handlers/verify-csrf-token">Link C</a>
    </nav>
  {/if}
</div>
