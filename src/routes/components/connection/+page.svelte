<script lang="ts">
  import Connection from '$lib/components/Connection.svelte'
</script>

<Connection slowAfterMs={1000}>
  {#snippet offline()}
    <aside class="connection offline">
      <p>Offline</p>
    </aside>
  {/snippet}

  {#snippet slow()}
    <aside class="connection slow">
      <p>Slow</p>
    </aside>
  {/snippet}

  {#snippet online()}
    <aside class="connection online">
      <p>Online</p>
    </aside>
  {/snippet}
</Connection>
