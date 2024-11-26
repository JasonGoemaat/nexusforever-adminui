<script lang="ts">
    import { getPlayers, mapPlayer, player, selectPlayer } from "$lib/services/Player";
    import { getAllTexts } from "$lib/Text";
    let player3 = $derived(mapPlayer($player))
    // let player3 = $state(mapPlayer(player))
    // player.subscribe(x => player3 = mapPlayer(x))
    let allTextsPromise = getAllTexts().then(x => {
        return x;
    })
    if (!$player) {
        getPlayers().then(x => selectPlayer(x[0]))
    } else {
        console.log('Loading not needed,  player is:', player)
    }
</script>

<div class="split">
    {#await allTextsPromise}
    <div>Loading texts...</div>
    {:then allTexts}
    <div>
        <h1>From api:</h1>
        <pre>{JSON.stringify($player, null, 2)}</pre>
    </div>
    <div>
        <h1>Processed:</h1>
        {#if player3}
        <pre>{JSON.stringify(player3, null, 2)}</pre>
        {/if}
    </div>
    {/await}
</div>

<style type="scss">
    div.split {
        pre {
            text-wrap: wrap;
            word-break: break-all;
        }
    }
</style>