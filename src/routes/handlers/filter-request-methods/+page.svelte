<script lang="ts">
  export let data: App.PageData // eslint-disable-line no-undef

  let { fetch } = data
  $: ({ fetch } = data)

  const endpoint = '/handlers/filter-request-methods.json'

  let response: Response | undefined

  const sendDeleteRequest = async () => {
    response = await fetch(endpoint, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: null })
    })
  }
</script>

<h1>{response?.status || 0}</h1>

<form on:submit|preventDefault={sendDeleteRequest}>
  <button type="submit">Send</button>
</form>
