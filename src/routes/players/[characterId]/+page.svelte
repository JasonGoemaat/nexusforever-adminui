<script lang="ts">
    import { getPlayer, player } from "$lib/services/Player.js";
    import { Sidebar, SidebarDropdownItem, SidebarDropdownWrapper, SidebarGroup, SidebarItem, SidebarWrapper, Spinner } from "flowbite-svelte";
    import { GridSolid, ChartPieSolid, CartSolid, MailBoxSolid, UsersSolid, ShoppingBagSolid, ArrowRightToBracketOutline, EditOutline } from "flowbite-svelte-icons";

    const { data } = $props();
    let { characterId } = data;

    let playerPromise = getPlayer(characterId);
    let spanClass = "flex-1 ms-3 whitespace-nowrap";
</script>

{#await playerPromise}
    <div class="text-center"><span class="mr-4 pr-4">Loading Player...</span><Spinner /></div>
{:then player}
    <h4>What do I want to put here?</h4>
    <p>It might be nice to have quick access to a short
        description of active quests.  I'm thinking just
        quest name and current objective, along with links
        to port to the locations mentioned in the quest
        texts.
    </p>
{/await}
