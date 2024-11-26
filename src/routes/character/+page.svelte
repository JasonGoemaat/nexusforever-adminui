<script lang="ts">
    import { sexFor, classFor, raceFor, character } from "$lib/CharacterStore";
    import { Card, Accordion, AccordionItem } from "flowbite-svelte";
    import QuestState from "$lib/components/QuestState.svelte";
    import ExpandableText from "$lib/components/ExpandableText.svelte";
    import {
        createCharacterQuest,
        type CharacterQuest,
    } from "$lib/models/CharacterQuest";
    import { getQuest } from "$lib/Quest";

    let quests = $state<CharacterQuest[] | null>(null);

    character.subscribe((c) => {
        quests = null;
        console.log("New character (check window.ch)", c);
        (window as any).ch = c;
        if (!c) {
            return;
        }
        let characterQuests = c.quest.filter((x: any) => x.state !== 3);
        console.log("characterQuests:", characterQuests);
        let promises = characterQuests.map((cq: any) => getQuest(cq.questId));
        Promise.all(promises)
            .then((results) => {
                console.log("results:", results);
                return results.map((r, i) => {
                    return createCharacterQuest(r, characterQuests[i]);
                });
            })
            .then((cq) => {
                (window as any).cq = cq;
                quests = cq;
                console.log("Loaded CharacterQuests, check window.cq", cq);
            });
    });

    const getProgress = (quest: any, index: number) => {
        const found = quest._c.questObjective.find((x: any) => x.index === index)
        if (found) {
            return found.progress
        } else {
            return "?"
        }
    }
</script>

{#if $character}
    <div class="columns">
        <section class="quests">
            {#if !quests}
                <h5
                    class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                >
                    Loading quests...
                </h5>
            {:else if quests?.length === 0}
                <h5
                    class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                >
                    No quests...
                </h5>
            {:else}
                <!-- <Card href="/cards" style="margin-bottom: 1rem;">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
            </Card> -->
                {#each quests! as quest}
                    <Card
                        style="margin-bottom: 1rem;"
                    >
                        <a href="/quests/{quest.questId}" target="_blank"
                            class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded px-2"
                        >
                            {quest.title}
            </a>
                        <ExpandableText>{quest.text}</ExpandableText>
                        <QuestState state={quest.state} />
                        <p>Objectives:</p>
                        <ul>
                            {#each quest.objectiveIds as id, index}
                            {#if quest.objectives}
                            <li>Objective Id: {id}</li>
                            {:else}
                            <li>{id} progress: {getProgress(quest, index)}</li>
                            {/if}
                            {/each}
                        </ul>
                    </Card>
                {/each}
            {/if}
        </section>
        <section
            class="character bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-lg border border-gray-200 dark:border-gray-700 divide-gray-200 dark:divide-gray-700 shadow-md p-2"
        >
            <h1 class="text-4xl">{$character?.name}</h1>
        </section>
    </div>
{:else}
    <h1>No Character</h1>
    <p>Select a character using the button on the top-right</p>
{/if}

<style type="scss">
    div.columns {
        display: flex;
        flex-direction: row;
        width: 100%;

        section.quests {
            background-color: var(--color-gray-100);
            flex: 0 0 400px;
            ul {
                list-style: inside;
                li {
                    margin-left: 1rem;
                }
            }
        }

        section.character {
            flex-grow: 1;
            flex-basis: 800px;
        }
    }
</style>
