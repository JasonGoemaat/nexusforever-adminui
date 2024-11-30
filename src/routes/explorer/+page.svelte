<script lang="ts">
    import { getTableNames } from "$lib/services/Table";
    import { A, Badge, Breadcrumb, BreadcrumbItem, Input, Label, Spinner } from "flowbite-svelte";

    let allTableNamesPromise = getTableNames();
    let filterText = $state("");
    let filteredTableNames = $derived.by(() => {
        let ft = filterText;
        return allTableNamesPromise.then((all: string[]) => {
            if (ft?.length === 0) {
                return all;
            }
            let text = ft.toLocaleLowerCase();
            return all.filter((x) => x.toLocaleLowerCase().indexOf(text) >= 0);
        });
    });
</script>

<Breadcrumb aria-label="Default breadcrumb example" class="mb-4">
    <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
    <BreadcrumbItem>explorer</BreadcrumbItem>
</Breadcrumb>

{#await allTableNamesPromise}
    <div class="text-center"><span class="mr-4 pr-4">Loading Table Names...</span><Spinner /></div>
{:then allTableNames}
    <div class="mb-6">
        <Input placeholder="Filter" bind:value={filterText} />
    </div>
    {#await filteredTableNames then tableNames}
        <p style="display: inline-block">
            {#each tableNames as tableName}
                <!-- <A href={tableName}><Badge>{tableName}</Badge></A> -->
                <A class="px-3 py-1" href={tableName}>{tableName}</A>
            {/each}
        </p>
    {/await}
{/await}

<style type="scss">
    p {
        a {
            display: inline-block;
            margin: 0.3rem;
        }
    }
</style>
