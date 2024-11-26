<script lang="ts">
    import { allTableNames } from "$lib/Text";
    import { Badge, Breadcrumb, BreadcrumbItem } from "flowbite-svelte";
</script>

<Breadcrumb aria-label="Default breadcrumb example" class="mb-4">
    <BreadcrumbItem href="/" home>Home</BreadcrumbItem>
    <BreadcrumbItem>explorer</BreadcrumbItem>
</Breadcrumb>

<!-- <div class="split">
    <div style="min-height: 500px;">Left</div>
    <div style="min-height: 400px;">Right</div>
</div> -->

<p style="display: inline-block">
{#each allTableNames as tableName}
    <a href={tableName}><Badge>{tableName}</Badge></a>
{/each}
</p>

<style type="scss">
    p {
        a {
            display: inline-block;
            margin: 0.3rem;
        }
    }
</style>