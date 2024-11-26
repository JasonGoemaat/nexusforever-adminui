<script lang="ts">
    import { Card } from "flowbite-svelte";
    import EntryField from "./EntryField.svelte";
    import { textFor } from "$lib/Text";

    const { entry, table } = $props()

    const fields = Object.entries(entry)

    const headingText = entry?.LocalizedTextId ? textFor(entry?.LocalizedTextId) : `Id: ${entry.Id}`
</script>

<Card class="max-w-lg mr-4 mb-4">
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white truncate">{headingText}</h5>
    <!-- <p class="truncate">{ JSON.stringify(entry) }</p> -->
    <ul>
        {#each fields as field}
        <EntryField table={table} entry={entry} field={field} />
        {/each}
    </ul>
</Card>
