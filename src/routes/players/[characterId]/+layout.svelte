<script lang="ts">
    import { getPlayer, player } from "$lib/services/Player.js";
    import { Sidebar, SidebarDropdownItem, SidebarDropdownWrapper, SidebarGroup, SidebarItem, SidebarWrapper, Spinner } from "flowbite-svelte";
    import { GridSolid, ChartPieSolid, CartSolid, MailBoxSolid, UsersSolid, ShoppingBagSolid, ArrowRightToBracketOutline, EditOutline } from "flowbite-svelte-icons";

    const { data, children } = $props();
    let { characterId } = data;

    let playerPromise = getPlayer(characterId);
    let spanClass = "flex-1 ms-3 whitespace-nowrap";
</script>

{#await playerPromise}
    <div class="text-center"><span class="mr-4 pr-4">Loading Player...</span><Spinner /></div>
{:then player}
    <div class="lefterly">
        <div class="left">
            <Sidebar>
                <SidebarWrapper divClass="overflow-y-auto py-4 px-3 rounded dark:bg-gray-800">
                    <SidebarGroup>
                        <SidebarDropdownWrapper label="Account">
                            <svelte:fragment slot="icon">
                                <CartSolid class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            </svelte:fragment>
                            <SidebarDropdownItem label="Costume Unlock" />
                            <SidebarDropdownItem href="currency" label="Currency" />
                            <SidebarDropdownItem label="Entitlements" />
                            <SidebarDropdownItem label="Inventory" />
                            <SidebarDropdownItem label="Reward Track" />
                            <SidebarDropdownItem label="Roles" />
                            <SidebarDropdownItem label="Permissions" />
                        </SidebarDropdownWrapper>
                        <SidebarItem label="Active Quests">
                            <svelte:fragment slot="icon">
                                <GridSolid class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            </svelte:fragment>
                        </SidebarItem>
                        <SidebarItem label="Inventory">
                            <svelte:fragment slot="icon">
                                <GridSolid class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                            </svelte:fragment>
                        </SidebarItem>
                    </SidebarGroup>
                </SidebarWrapper>
            </Sidebar>
        </div>
        <div class="right">
            <div class="triple-threat">
                <!-- <div class="text-xl font-bold">{player.name}</div> -->
                <h1>{player.name}</h1>
                <div>
                    <div>Level {player.level} {player.class}</div>
                    <div>{player.sex} {player.race}</div>
                </div>
            </div>
            {@render children()}
        </div>
    </div>
{/await}

<style>
    div.triple-threat {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.3rem;
    }

    div.lefterly {
        display: flex;
        margin-top: 0.3rem;
    }

    div.lefterly > div.right {
        margin-left: 1rem;
        width: 100%;
        max-width: 900px;
    }
</style>
