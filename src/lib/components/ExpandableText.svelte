<script lang="ts">
let { children } = $props();
let div;
    let expanded = $state(false);

    const toggle = () => (expanded = !expanded);
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div bind:this={div} onclick={toggle} class:expanded={expanded}>
    <!-- <slot /> -->
    {#if expanded}
    <svg style="float: right; margin-left: 0.1rem; margin-top: 0.3rem;" class="w-3 h-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"></path></svg>
    {:else}
    <svg style="float: right; margin-left: 0.1rem; margin-top: 0.3rem;" class="w-3 h-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"></path></svg>
    {/if}
    {@render children?.()}
</div>

<style>
    div {
        cursor: pointer;
        text-overflow: ellipsis;
        text-wrap: nowrap;
        overflow: hidden;
        padding-bottom: 0.25rem;
    }

    div.expanded {
        height: auto;
        text-wrap: wrap;
        word-break: break-all;
    }
</style>
