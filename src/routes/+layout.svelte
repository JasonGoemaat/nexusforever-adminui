<script lang="ts">
import {onMount} from 'svelte'
import Header from './Header.svelte';
import '../app.css';

import * as api from '$lib/Api'
import * as quest from '$lib/Quest'
import * as text from '$lib/Text'
    import { getAllTexts } from '$lib/Text';

onMount(() => {
    (window as any).s = { api, quest, text }
});

let { children } = $props();

</script>

{#await getAllTexts()}
Fetching texts...
{:then}
<div class="app">
	<Header></Header>

	<main>
		{@render children()}
	</main>
</div>
{/await}

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		/* max-width: 64rem; */
		max-width: 96rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
