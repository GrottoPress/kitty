<script lang="ts">
  import { type Snippet } from 'svelte'
  import { browser } from '$app/environment'
  import { afterNavigate, beforeNavigate } from '$app/navigation'

  interface Props {
    slowAfterMs?: number
    offline?: Snippet
    slow?: Snippet
    online?: Snippet
  }

  let {
    slowAfterMs = 6000,
    offline,
    slow,
    online
  }: Props = $props()

  let status: 'offline' | 'online' | 'slow' = $state(
    browser && !navigator.onLine ? 'offline' : 'online'
  )

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

<svelte:window onoffline={setOffline} ononline={setOnline} />

{#if status === 'offline'}
  {@render offline?.()}
{:else if status === 'slow'}
  {@render slow?.()}
{:else}
  {@render online?.()}
{/if}
