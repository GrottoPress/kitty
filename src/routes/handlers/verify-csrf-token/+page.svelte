<script lang="ts">
  export let data: App.PageData // eslint-disable-line no-undef

  let { csrfHeaderKey, csrfParamKey, csrfToken, fetch } = data
  $: ({ csrfHeaderKey, csrfParamKey, csrfToken, fetch } = data)

  const endpoint = '/handlers/verify-csrf-token'

  let response: Response | undefined

  const jsonWithToken = async () => {
    const headers = new Headers
    headers.set('Content-Type', 'application/json')
    headers.set(csrfHeaderKey, csrfToken)

    response = await fetch(`${endpoint}.json`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ city: 'Kumasi' })
    })
  }

  const jsonWithoutToken = async () => {
    response = await fetch(`${endpoint}.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ city: 'Kumasi' })
    })
  }
</script>

<h1>{response?.status || 0}</h1>

<form id="with-token" method="POST" action="{endpoint}?/create">
  <input type="hidden" name={csrfParamKey} value={csrfToken} />
  <input type="hidden" name="city" value="Kumasi" />
  <button type="submit">Send</button>
</form>

<form id="without-token" method="POST" action="{endpoint}?/create">
  <input type="hidden" name="city" value="Kumasi" />
  <button type="submit">Send</button>
</form>

<form id="json-with-token" on:submit|preventDefault={jsonWithToken}>
  <button type="submit">Send</button>
</form>

<form id="json-without-token" on:submit|preventDefault={jsonWithoutToken}>
  <button type="submit">Send</button>
</form>
