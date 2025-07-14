<script lang="ts">
  import type { PageData } from './$types'

  interface Props {
    data: PageData
  }

  let { data }: Props = $props()

  const endpoint = '/handlers/filter-request-methods.json'

  let response: Response | undefined = $state()

  const sendDeleteRequest = async (event: Event) => {
    event.preventDefault()

    response = await data.fetch(endpoint, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: null })
    })
  }
</script>

<h1>{response?.status || 0}</h1>

<form onsubmit={sendDeleteRequest}>
  <button type="submit">Send</button>
</form>
