<script lang="ts">
  export let data: App.PageData // eslint-disable-line no-undef

  let { csrfToken } = data
  $: ({ csrfToken } = data)
</script>

<h1>{csrfToken}</h1>
