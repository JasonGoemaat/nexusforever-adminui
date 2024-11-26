<script lang="ts">
    import { stateTexts } from "$lib/models/CharacterQuest";
    import { Badge } from "flowbite-svelte";
    const { state } = $props()
    const stateColors = ['pink', 'green', 'dark', 'dark', 'red', 'none', 'none', 'dark']
    const color = $derived(stateColors[state] || 'dark')
    const text = $derived(stateTexts[state] || `Unknown (${state})`)
</script>
<Badge color={color as any}>{text}</Badge>
