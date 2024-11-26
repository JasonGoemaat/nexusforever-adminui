<script lang="ts">
    import Entry from '$lib/components/Entry.svelte';
import { getTableEntry } from '$lib/services/Table.js';
    import { Breadcrumb, BreadcrumbItem } from 'flowbite-svelte';

    const { data } = $props()
    const { table, id } = data
    console.log('entry:', table, id)
    let entryPromise = $state(getTableEntry(table, parseInt(id)))
</script>

<Breadcrumb aria-label="Default breadcrumb example">
    <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
    <BreadcrumbItem href="/explorer">explorer</BreadcrumbItem>
    <BreadcrumbItem href="/explorer/{table}">{ table }</BreadcrumbItem>
    <BreadcrumbItem href="/explorer/{table}/{id}">{ id }</BreadcrumbItem>
</Breadcrumb>

{#await entryPromise}
<p>Loading...</p>
{:then entry}
<Entry table={table} entry={entry} />
{/await}
