<script lang="ts">
  interface Props {
    data: App.PageData // eslint-disable-line no-undef
  }

  let { data }: Props = $props()
</script>

<h1>{data.csrfToken}</h1>
