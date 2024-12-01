<script lang="ts">
    let {filters = $bindable()} = $props()

    const testFilter = () => {
        filters = [['Id', '3']]
    }
</script>

<div>
    Filters:
    <button onclick={testFilter}>Test</button>
    <p>Child filters: {JSON.stringify(filters)}</p>
</div>