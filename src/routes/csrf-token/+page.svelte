<script lang="ts">
  export let data: App.PageData

  let { csrfToken } = data
  $: ({ csrfToken } = data)
</script>

<h1>{csrfToken}</h1>
