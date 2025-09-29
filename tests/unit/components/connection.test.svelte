<script lang="ts">
  import Connection, { connection } from '$lib/components/connection.svelte'

  const state = $derived(connection)
</script>

<Connection slowAfterMs={1000}>
  {#snippet children({ status })}
    <span class="state">{state.status}</span>
    <span class="status">{status}</span>
  {/snippet}
</Connection>
