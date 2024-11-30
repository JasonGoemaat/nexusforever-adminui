<script lang="ts">
    import { getPlayers } from "$lib/services/Player";
    import { Button, Spinner } from "flowbite-svelte";
    import { onMount } from "svelte";
    import { RefreshOutline } from "flowbite-svelte-icons";
    import { classFor, raceFor, sexFor } from "$lib/CharacterStore";

    let playersPromise = getPlayers();

    onMount(() => {
        const promise = getPlayers();
        playersPromise = promise;
    });

    const refresh = () => playersPromise = getPlayers()
</script>

<div class="flex flex-col items-center">
    <div class="flex items-center">
        <h1 class="pb-2 pr-4">Players</h1>
        <!-- w-5 h-5 me-2 -->
        <Button onclick={refresh} outline={true} class="w-5 h-6 pl-2 pr-2" size="md">
            <!-- <PlaySolid class="w-7 h-7 text-primary-700" />  -->
            <RefreshOutline class="w-4 h-4" />
        </Button>
    </div>
</div>

{#await playersPromise}
    <div class="text-center"><span class="mr-4 pr-4">Loading Sessions...</span><Spinner /></div>
{:then players}
    <div class="flex flex-col items-center">
        {#if players && players.length}
            {#each players as player, index}
                <a class="selectable pb-2" href="/players/{player.characterId}">
                    {player.name} - <em>Level {player.level}<br/>{sexFor(player.sex)} {raceFor(player.race)} {classFor(player.class)}</em>
                </a>
            {/each}
        {:else}
            <span>No players</span>
        {/if}
    </div>
{/await}

<style>
    a.selectable:hover {
        color:theme('colors.primary.900');
    }
</style>