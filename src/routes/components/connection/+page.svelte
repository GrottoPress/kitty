<script lang="ts">
  import Connection from '$lib/components/Connection.svelte'
</script>

<Connection slowAfterMs={1000}>
  <aside slot="offline" class="connection offline">
    <p>Offline</p>
  </aside>

  <aside slot="slow" class="connection slow">
    <p>Slow</p>
  </aside>

  <aside slot="online" class="connection online">
    <p>Online</p>
  </aside>
</Connection>
