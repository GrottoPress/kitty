<script lang="ts">
  interface Props {
    data: App.PageData // eslint-disable-line no-undef
  }

  let { data }: Props = $props()

  const endpoint = '/handlers/verify-csrf-token'

  let response: Response | undefined = $state()

  const jsonWithToken = async (event: Event) => {
    event.preventDefault()

    if (!data.csrfHeaderKey || !data.csrfToken) return

    const headers = new Headers
    headers.set('Content-Type', 'application/json')
    headers.set(data.csrfHeaderKey, data.csrfToken)

    response = await data.fetch(`${endpoint}.json`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ city: 'Kumasi' })
    })
  }

  const jsonWithoutToken = async (event: Event) => {
    event.preventDefault()

    response = await data.fetch(`${endpoint}.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ city: 'Kumasi' })
    })
  }
</script>

<h1>{response?.status || 0}</h1>

<form id="with-token" method="POST" action="{endpoint}?/create">
  <input type="hidden" name={data.csrfParamKey} value={data.csrfToken} />
  <input type="hidden" name="city" value="Kumasi" />
  <button type="submit">Send</button>
</form>

<form id="without-token" method="POST" action="{endpoint}?/create">
  <input type="hidden" name="city" value="Kumasi" />
  <button type="submit">Send</button>
</form>

<form id="json-with-token" onsubmit={jsonWithToken}>
  <button type="submit">Send</button>
</form>

<form id="json-without-token" onsubmit={jsonWithoutToken}>
  <button type="submit">Send</button>
</form>
