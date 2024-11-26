<script lang="ts">
    import { Card } from 'flowbite-svelte';
    import { getQuest } from '$lib/Quest'
    import QuestObjective from '$lib/components/QuestObjective.svelte';

    let { data } = $props();
    let objectives = $state<any[]>([]) 

    let questId = $state(parseInt(data.params.slug))
    let questPromise = getQuest(questId).then(quest => {
        objectives = quest.Objectives.filter((x: number) => x > 0)
        return quest
    })
</script>

{#await questPromise}
<h1>Fetching quest {questId}...</h1>
<p>querying...</p>
{:then quest}
<p>{quest?.Title}</p>
<ol>
    {#each objectives as objectiveId}
    <QuestObjective id={objectiveId} />
    {/each}
</ol>
{:catch error}
<p>Error:</p>
<p>{error}</p>
{/await}

<pre>{JSON.stringify(data, null, 2)}</pre>