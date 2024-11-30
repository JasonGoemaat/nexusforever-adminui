<script lang="ts">
    import { Button, Modal } from "flowbite-svelte";
    import { getPlayers, selectPlayer, player, getPlayer } from '$lib/services/Player'
    import { classFor, raceFor, sexFor } from "$lib/CharacterStore";

    let playersPromise = $state<any>(null);
    let modal = $state(false);

    const selectSession = (e: Event) => {
        e.preventDefault();
        playersPromise = getPlayers().then(x => { console.log(x); return x; });
        modal = true;
    };

    const choosePlayer = (e: Event, p: any) => {
        e.preventDefault();
        getPlayer(p.characterId).then(x => {
            selectPlayer(x)
            modal = false;
        })
    };
</script>

<Button size="xs" color="light" onclick={(e: Event) => selectSession(e)}
    >{$player?.Name ? $player?.Name : "Select Player"}</Button
>

<Modal title="Select Player" bind:open={modal} autoclose>
    {#await playersPromise}
        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Loading...
        </p>
    {:then list}
        {#if !list?.length}
            <p>No Players</p>
        {:else}
            <ul>
                {#each list as p, i}
                    <a class="rounded text-base leading-relaxed text-gray-500 dark:text-gray-400 hover:bg-sky-700"
                        onclick={(e) => choosePlayer(e, p)}
                        aria-roledescription="button"
                        href={"#"}
                    >
                        <span class="name">{p.name} ({p.characterId})</span>
                        <span class="sub">
                            {sexFor(p.sex)}
                            {raceFor(p.race)}
                            {classFor(p.class)}
                        </span>
                    </a>
                {/each}
            </ul>
        {/if}
    {/await}
    <svelte:fragment slot="footer">
        <Button color="alternative" onclick={(e : Event) => choosePlayer(e, null)}>Clear</Button>
        <Button color="alternative">Close</Button>
    </svelte:fragment>
</Modal>

<style>
    a.rounded {
        border-radius: 1em;
        padding: 0 1em;
    }
    /* a.hover-select:hover {
        background-color: ;
    } */

    span.name {
        font-size: 2rem;
    }

    span.sub {
        font-style: italic;
        font-size: 1.5rem;
        padding-left: 1.5rem;
    }

    ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
