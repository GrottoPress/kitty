<script lang="ts" module>
  export type ConnectionStatus = 'offline' | 'online' | 'slow'
</script>

<script lang="ts">
  import { type Snippet } from 'svelte'
  import { browser } from '$app/environment'
  import { afterNavigate, beforeNavigate } from '$app/navigation'

  interface Props {
    slowAfterMs?: number
    children?: Snippet<[{
      isOffline: boolean,
      isOnline: boolean,
      isSlow: boolean,
      status: ConnectionStatus
    }]>
  }

  let { slowAfterMs = 6000, children }: Props = $props()

  let status = $state<ConnectionStatus>(
    browser && !navigator.onLine ? 'offline' : 'online'
  )

  const isOffline = $derived(status === 'offline')
  const isOnline = $derived(status === 'online')
  const isSlow = $derived(status === 'slow')

  let timeout: NodeJS.Timeout | undefined // eslint-disable-line no-undef

  const setOffline = () => status = 'offline'
  const setOnline = () => status = 'online'
  const setSlow = () => status = 'slow'

  beforeNavigate(() => {
    timeout = setTimeout(() => {
      if (isOnline) setSlow()
    }, slowAfterMs)
  })

  afterNavigate(() => {
    clearTimeout(timeout)
    if (isSlow) setOnline()
  })
</script>

<svelte:window onoffline={setOffline} ononline={setOnline} />

{#if children}
  <div class="connection"
    class:connection--offline={isOffline}
    class:connection--online={isOnline}
    class:connection--slow={isSlow}>

    {@render children({ isOffline, isOnline, isSlow, status })}
  </div>
{/if}
