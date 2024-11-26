<script lang="ts">
	import { page } from '$app/stores';
</script>

This is <pre>/routes/quest/[slug]/+error.svelte</pre>

<h1>{$page.status}: {$page.error?.message}</h1>