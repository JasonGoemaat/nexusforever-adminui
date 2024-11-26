<script lang="ts">
    import {
        character,
        selectCharacter,
        getCharacters,
        sexFor,
        classFor,
        raceFor,
    } from "$lib/CharacterStore";
    import { Button, Modal } from "flowbite-svelte";
    let dialog = $state<HTMLDialogElement>();
    let charactersPromise = $state<any>(null);
    let modal = $state(false);

    const selectSession = (e: Event) => {
        e.preventDefault();
        charactersPromise = getCharacters();
        // dialog!.showModal();
        modal = true;
    };

    const chooseCharacter = (e: Event, c: any) => {
        e.preventDefault();
        selectCharacter(c);
        // dialog?.close();
        modal = false;
    };
</script>

<Button size="xs" color="light" onclick={e => selectSession(e)}
    >{$character?.name ? $character?.name : "Select Character"}</Button
>

<Modal title="Select Character" bind:open={modal} autoclose>
    {#await charactersPromise}
        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Loading...
        </p>
    {:then list}
        {#if !list?.length}
            <p>No sessions</p>
        {:else}
            <ul>
                {#each list as c, i}
                    <a class="rounded text-base leading-relaxed text-gray-500 dark:text-gray-400 hover:bg-sky-700"
                        onclick={(e) => chooseCharacter(e, c)}
                        aria-roledescription="button"
                        href={"#"}
                    >
                        <span class="name">{c.name}</span>
                        <span class="sub">
                            {raceFor(c.race)}
                            {classFor(c.class)}
                            ({sexFor(c.sex)})
                        </span>
                    </a>
                {/each}
            </ul>
        {/if}
    {/await}
    <svelte:fragment slot="footer">
        <Button color="alternative" onclick={(e : Event) => chooseCharacter(e, null)}>Clear</Button>
        <Button color="alternative">Close</Button>
    </svelte:fragment>
</Modal>

<dialog bind:this={dialog}>
    <h3>Select Character</h3>

    {#await charactersPromise}
        <p>loading...</p>
    {:then list}
        {#if !list?.length}
            <p>No sessions</p>
        {:else}
            <ul>
                {#each list as c, i}
                    <li>
                        <div>
                            <a
                                onclick={(e) => chooseCharacter(e, c)}
                                aria-roledescription="button"
                                href={"#"}
                            >
                                <span class="name">{c.name}</span>
                                <span class="sub">
                                    {raceFor(c.race)}
                                    {classFor(c.class)}
                                    ({sexFor(c.sex)})
                                </span>
                            </a>
                        </div>
                    </li>
                {/each}
            </ul>
        {/if}
    {/await}
    <form method="dialog">
        <button onclick={(e) => chooseCharacter(e, null)}>Clear</button>
        <button onclick={() => dialog!.close()}>Close</button>
    </form>
</dialog>

<style>
    a.rounded {
        border-radius: 1em;
        padding: 0 1em;
    }
    /* a.hover-select:hover {
        background-color: ;
    } */

    dialog[open] {
        width: 1024px;
        max-height: 500px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    span.name {
        font-size: 2rem;
    }
    span.sub {
        font-style: italic;
        font-size: 1.5rem;
        padding-left: 1.5rem;
    }
    h3 {
        font-size: 3rem;
        margin: 1rem;
    }
    ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    /* li {
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 1rem;
        border: solid 1px transparent;
    } */
    /* li:hover {
        background-color: #ccc;
        border: solid 1px #444;
    } */
    /* a,
    a:hover,
    a:visited {
        text-decoration: none;
    } */
</style>
