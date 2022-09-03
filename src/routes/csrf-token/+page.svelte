<script lang="ts">
  import { page } from '$app/stores'
</script>

<h1>{$page.data.session.csrfToken || ''}</h1>
