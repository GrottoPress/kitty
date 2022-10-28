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
      <a href="#!">Link A</a>
      <a href="#!">Link B</a>
      <a href="#!">Link C</a>
    </nav>
  {/if}
</div>
