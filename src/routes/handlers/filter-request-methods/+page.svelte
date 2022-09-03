<script lang="ts">
  export let data: App.PageData

  const endpoint = '/handlers/filter-request-methods'
  let response: Response | undefined

  const sendDeleteRequest = async () => {
    response = await data.fetch(endpoint, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
  }
</script>

<h1>{response?.status || 0}</h1>

<form on:submit|preventDefault={sendDeleteRequest}>
  <button type="submit">Send</button>
</form>
