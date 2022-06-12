<script lang="ts">
  import { session } from '$app/stores'
</script>

<h1>{$session.csrfToken || ''}</h1>
