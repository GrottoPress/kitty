<script lang="ts">
  import Connection from '$lib/components/Connection.svelte'
</script>

<Connection slowAfterMs={1000}>
  {#snippet children({ status })}
    {status}
  {/snippet}
</Connection>
