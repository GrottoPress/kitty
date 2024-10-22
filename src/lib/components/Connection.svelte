<script lang="ts">
  import { browser } from '$app/environment'
  import { afterNavigate, beforeNavigate } from '$app/navigation'

  export let slowAfterMs = 6000

  let status: 'offline' | 'online' | 'slow' =
    browser && !navigator.onLine ? 'offline' : 'online'

  let timeout: NodeJS.Timeout | undefined // eslint-disable-line no-undef

  const setOffline = () => status = 'offline'
  const setOnline = () => status = 'online'
  const setSlow = () => status = 'slow'

  beforeNavigate(() => {
    timeout = setTimeout(() => {
      if (status === 'online') setSlow()
    }, slowAfterMs)
  })

  afterNavigate(() => {
    if (status === 'slow') setOnline()
    clearTimeout(timeout)
  })
</script>

<svelte:window on:offline={setOffline} on:online={setOnline} />

{#if status === 'offline'}
  <slot name="offline" />
{:else if status === 'slow'}
  <slot name="slow" />
{:else}
  <slot name="online" />
{/if}
