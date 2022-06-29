<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit'

  export const load: Load = async ({ fetch }) => {
    return { props: { fetch } }
  }
</script>

<script lang="ts">
  export let fetch: Fetch // eslint-disable-line no-undef

  const endpoint = '/handlers/filter-request-methods.json'
  let response: Response | undefined

  const sendDeleteRequest = async () => {
    response = await fetch(endpoint, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
  }
</script>

<h1>{response?.status || 0}</h1>

<form on:submit|preventDefault={sendDeleteRequest}>
  <button type="submit">Send</button>
</form>
