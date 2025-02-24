<script lang="ts">
  import Button from '$lib/components/ToggleButton.svelte'

  let menu: HTMLElement | undefined = $state()
  let showMenu = $state(false)
</script>

<div>
  <Button bind:open={showMenu} clickOutside={menu}>
    &equiv; Menu
  </Button>

  {#if showMenu}
    <nav bind:this={menu}>
      <a href="#!">Link A</a>
      <a href="#!">Link B</a>
      <a href="#!">Link C</a>
    </nav>
  {/if}
</div>
