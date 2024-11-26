<script lang="ts">
    import { getJson } from '$lib/Api'
    import { getText,  } from '$lib/Text'
    import { getQuest } from '$lib/Quest'
    import QuestObjective from '$lib/components/QuestObjective.svelte';

    let startValue = localStorage.getItem('quest:id')
    let qid = 7540
    if (startValue) {
        qid = parseInt(startValue)
    }
    let questId = $state<number>(qid)
    let quest = $state<any>(null)
    let textValues = $state<any[]>([]);
    let objectives = $state<any[]>([])

    const getQuestClick = async () => {
        const id = questId;
        localStorage.setItem('quest:id', `${id}`)
        console.log('looking up quest id', id, questId)
        const result = await getQuest(questId)
        quest = result?.quest
        objectives = quest.Objectives.filter(x => x > 0)
    }
</script>

<h1>Quests</h1>

<div class="value-action">
    <input bind:value={questId} type="number">
    <button onclick={getQuestClick}>Get Quest</button>
</div>


{#if quest}
<h3>Quest {quest.Id} - {quest.Title}</h3>

    {#if objectives?.length}
        <ol>
        {#each objectives as id}
            <QuestObjective id={id} />
        {/each}
    </ol>
    {:else}
        <p>No objectives</p>
    {/if}

{/if}

<style>
    div.value-action {
        display: flex;
        align-items: center;
    }

    div.value-action button {
        margin-left: 1rem;
    }
</style>