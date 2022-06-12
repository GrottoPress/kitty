<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit'

  export const load: Load = async ({ fetch }) => {
    return { props: { fetch } }
  }
</script>

<script lang="ts">
  import { session } from '$app/stores'

  export let fetch: Fetch

  const { csrfHeaderKey, csrfParamKey, csrfToken } = $session
  const endpoint = '/handlers/verify-csrf-token.json'
  let response: Response | undefined

  const jsonWithToken = async () => {
    const headers = new Headers
    headers.set('Content-Type', 'application/json')
    headers.set(csrfHeaderKey!, csrfToken!)

    response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({ city: 'Kumasi' })
    })
  }

  const jsonWithoutToken = async () => {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ city: 'Kumasi' })
    })
  }
</script>

<h1>{response?.status || 0}</h1>

<form id="with-token" method="POST" action={endpoint}>
  <input type="hidden" name={csrfParamKey} value={csrfToken} />
  <input type="hidden" name="city" value="Kumasi" />
  <button type="submit">Send</button>
</form>

<form id="without-token" method="POST" action={endpoint}>
  <input type="hidden" name="city" value="Kumasi" />
  <button type="submit">Send</button>
</form>

<form id="json-with-token" on:submit|preventDefault={jsonWithToken}>
  <button type="submit">Send</button>
</form>

<form id="json-without-token" on:submit|preventDefault={jsonWithoutToken}>
  <button type="submit">Send</button>
</form>
