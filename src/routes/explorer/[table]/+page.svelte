<script lang="ts">
    import { allTableNames } from "$lib/Text";
    import {
        Badge,
        Breadcrumb,
        BreadcrumbItem,
        Card,
        Input,
        PaginationItem,
    } from "flowbite-svelte";
    import { goto } from "$app/navigation";
    import { getTable, getTableArray } from "$lib/services/Table.js";
    import Entry from "$lib/components/Entry.svelte";
    const { data } = $props();
    const { table } = data;

    let value = $state("");
    let offset = $state(0);
    let limit = $state(100);

    const submit = (e: Event) => {
        e.preventDefault();
        goto(`${value}`);
    };

    let loadValues = () => {
        return getTableArray(table, limit, offset);
    };

    const previous = () => {
        offset = Math.max(offset - 100, 0);
        list = loadValues();
    };

    const next = () => {
        offset += 100;
        list = loadValues();
    };

    let list = $state(loadValues());
</script>

<Breadcrumb aria-label="Default breadcrumb example" class="mb-4">
    <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
    <BreadcrumbItem href="/explorer">explorer</BreadcrumbItem>
    <BreadcrumbItem>{table}</BreadcrumbItem>
    <BreadcrumbItem
        ><form onsubmit={(e: Event) => submit(e)}>
            <Input size="sm" bind:value />
            <button style="display: none" onclick={(e: Event) => submit(e)}>
                GO</button
            >
        </form>
    </BreadcrumbItem>
</Breadcrumb>

<div
    class="flex space-x-3 rtl:space-x-reverse mb-4"
    style="align-items: center"
>
    <PaginationItem on:click={previous}>Previous</PaginationItem>
    <p>Offset: {offset}</p>
    <PaginationItem on:click={next}>Next</PaginationItem>
</div>

<div class="section">
    <h2>{table}</h2>
    {#await list}
        Loading...
    {:then entries}
        <div class="flex flex-wrap">
            {#each entries as entry}
                <Entry {table} {entry} />
            {/each}
        </div>
    {/await}
</div>
