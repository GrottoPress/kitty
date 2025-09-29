<script lang="ts">
  import Button from '$lib/components/toggle-button.svelte'

  let menu: HTMLElement | undefined = $state()
  let showMenu = $state(false)
</script>

<div data-testid="wrap">
  <Button bind:open={showMenu} clickOutside={menu}>
    &equiv; Menu
  </Button>

  {#if showMenu}
    <nav bind:this={menu} data-testid="menu">
      <a href="#!">Link A</a>
      <a href="#!">Link B</a>
      <a href="#!">Link C</a>
    </nav>
  {/if}
</div>
