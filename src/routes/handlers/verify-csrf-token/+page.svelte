<script lang="ts">
  import { page } from '$app/stores'

  export let data: App.PageData

  const { csrfHeaderKey, csrfParamKey, csrfToken } = $page.data.session
  const endpoint = '/handlers/verify-csrf-token'
  let response: Response | undefined

  const jsonWithToken = async () => {
    const headers = new Headers
    headers.set('Content-Type', 'application/json')

    if (csrfHeaderKey && csrfToken) headers.set(csrfHeaderKey, csrfToken)

    response = await data.fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({ city: 'Kumasi' })
    })
  }

  const jsonWithoutToken = async () => {
    response = await data.fetch(endpoint, {
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
