<script lang="ts" module>
  import { browser } from '$app/environment'

  export type ConnectionStatus = 'offline' | 'online' | 'slow'

  export type ConnectionState = {
    isOffline: boolean,
    isOnline: boolean,
    isSlow: boolean,
    status: ConnectionStatus
  }

  const isOnline = !browser || navigator.onLine

  export const connection: ConnectionState = $state({
    isOffline: !isOnline,
    isOnline,
    isSlow: false,
    status: isOnline ? 'online' : 'offline'
  })
</script>

<script lang="ts">
  import { type Snippet, untrack } from 'svelte'
  import { afterNavigate, beforeNavigate } from '$app/navigation'

  interface Props {
    slowAfterMs?: number
    children?: Snippet<[ConnectionState]>
  }

  let { slowAfterMs = 6000, children }: Props = $props()

  let status = $state(connection.status)

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

  $effect(() => {
    const state = untrack(() => connection)

    state.isOffline = isOffline
    state.isOnline = isOnline
    state.isSlow = isSlow
    state.status = status
  })
</script>

<svelte:window onoffline={setOffline} ononline={setOnline} />

{@render children?.({ isOffline, isOnline, isSlow, status })}
