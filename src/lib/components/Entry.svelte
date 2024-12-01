<script lang="ts">
    import { Card } from "flowbite-svelte";
    import EntryField from "./EntryField.svelte";
    import { textFor } from "$lib/Text";

    const { entry, table } = $props();

    let showingEmpty = $state<boolean>(false)

    const fields = Object.entries(entry || []);

    const heading1Text = `${entry.Id} - ${table}`;
    const heading2Text = entry?.LocalizedTextId ? textFor(entry?.LocalizedTextId) : (
        entry?.LocalizedTextIdName ? textFor(entry?.LocalizedTextIdName) : ""
    );

    const toggleShowingEmpty = (e: Event) => {
        e.preventDefault()
        showingEmpty = !showingEmpty
    }
</script>

<Card class="max-w-lg mr-4 mb-4 mt-4" style="width: auto">
    <h5 class="mb-0 mt-0 pt-0 font-bold tracking-tight text-gray-900 dark:text-white truncate">{heading1Text}</h5>
    {#if heading2Text?.length}
        <h6 class="pl-8 pb-4 mt-0 pt-0"><em>{heading2Text}</em></h6>
    {/if}
    <!-- <p class="truncate">{ JSON.stringify(entry) }</p> -->
    <ul class:show-empty={showingEmpty}>
        {#each fields as field}
            <EntryField {table} {entry} {field} />
        {/each}
    </ul>
    <em><a class="underline" href="#" onclick={(e: Event) => toggleShowingEmpty(e)}>{showingEmpty ? "hide empty" : "show empty"}</a></em>
</Card>
