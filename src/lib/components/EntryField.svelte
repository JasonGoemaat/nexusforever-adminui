<script lang="ts">
    import { textFor } from "$lib/Text";
    import { spellTypes } from "$lib/data";
    import { lookupSpellEffectFlags, lookupSpellEffectTargetFlags, lookupSpellEffectType } from "$lib/services/Lookups";
    import { preventDefault } from "svelte/legacy";

    const { table, entry, field } = $props();
    let name = $state<string>(field[0]);
    let value = $state<any>(field[1]);
    let creatures = $state<string[][]>();
    let locations = $state<string[][]>();

    if (name.startsWith("LocalizedTextId")) {
        name = field[0].substring(15) || "[text]";
        const s = textFor(value);
        value = s;
        // process like this:
        /*
        var s = `$(creature=27725) has created a toxin from barkblight glands that's particularly effective against the Chua. 
        He's asked you to use the toxin to sabotage $m(creature=28086) outside 
        <text Link="Location:21314">Bloodbloom Vale</text> 
        and <text Link="Location:21316">Fort Firestorm</text>.`
        var rx  = /\<text Link="Location:(\d+)"\>([^\<]+)\<\/text\>/gm
        var arr = Array.from(s.matchAll(rx))
        console.log(arr)

        // let rxCreature = /\$\(creature=(?<creature>\d+)\)/gm
        let rxCreature = /\$\(creature=(\d+)\)/gm
        let cm = Array.from(s.matchAll(rxCreature))

        let creatureMatches = Array.from(s.matchAll(rxCreature)).map(x => x?.groups?.creature).map(x => parseInt(x))
        */
        const rxCreatures = /\(creature=(\d+)\)/gm;
        creatures = Array.from(s.matchAll(rxCreatures));
        const rxLocations = /\<text Link="Location:(\d+)"\>([^\<]+)\<\/text\>/gm;
        if (s && s != "[TextId=0]") {
            locations = Array.from(s.matchAll(rxLocations));
        //     console.log("locs:", locs, s);
        //     if (locs?.length) {
        //         console.log("locations:", $state.snapshot(locations));
        //     }
        }
    }

    const spellClasses = {
        0x000e: "BuffNonDispelRightClickOk",
        0x0024: "BuffDispellable",
        0x0025: "BuffNonDispellable",
        0x0026: "DebuffDispellable",
        0x0027: "DebuffNonDispellable",
    };
</script>

<li class="indented" class:empty={value === 0 || value === "[TextId=0]"}>
    {#if name === "Spell4IdPersistentBuff" && value > 0}
        <a href="/explorer/Spell4/{value}" style="text-decoration:underline">{name}</a>:
        <span title={value}>{value}</span>
    {:else if name === "TargetFlags" && table === "Spell4Effects"}
        <strong>{name}</strong>:
        <span>{value}</span>
        <em>({lookupSpellEffectTargetFlags(value)})</em>
    {:else if name === "Flags" && table === "Spell4Effects"}
        <strong>{name}</strong>:
        <span>{value}</span>
        <em>({lookupSpellEffectFlags(value)})</em>
    {:else if name === "EffectType" && table === "Spell4Effects"}
        <strong>{name}</strong>:
        <span>{value}</span>
        <em>({lookupSpellEffectType(value)})</em>
    {:else if name === "Spell4VisualGroupId" && value > 0}
        <strong>{name}</strong>:
        <a href="/explorer/Spell4VisualGroup/{value}" style="text-decoration:underline">{value}</a>
    {:else if name === "SpellId" && value > 0}
        <strong>{name}</strong>:
        <a href="/explorer/Spell4/{value}" style="text-decoration:underline">{value}</a>
    {:else if name === "Spell4BaseIdBaseSpell" && value > 0}
        <a href="/explorer/Spell4Base/{value}" style="text-decoration:underline">{name}</a>:
        <span title={value}>{value}</span>
    {:else if name === "Spell4SpellTypesIdSpellType" && value > 0}
        <a href="/explorer/Spell4SpellTypes/{value}" style="text-decoration:underline">SpellType</a>:
        <span title={value}>{value} ({spellTypes[value]?.TypeName})</span>
    {:else if name === "SpellClass" && value > 0}
        SpellClass {value} ({spellClasses[value] || "unknown"})
    {:else}
        <strong>{name}</strong>:
        <span title={value}>{value}</span>
    {/if}

    <!-- Handle 'extras', normally links in text -->
    {#if creatures?.length}
        {#each creatures as creature}
            <div class="pl-4"><a class="underline" href="/explorer/Creature2/{creature[1]}">Creature {creature[1]}</a></div>
        {/each}
    {/if}

    {#if locations?.length}
        {#each locations as loc}
            <div class="pl-4"><a class="underline" href="/explorer/WorldLocation2/{loc[1]}">Location {loc[1]}</a> ({loc[2]})
            <a class="underline" href="#" onclick={(e: Event) => { e.preventDefault(); alert('not implemented'); }}>teleport</a></div>
        {/each}
    {/if}
</li>

<!-- <pre>{ JSON.stringify(field) }</pre> -->

<style lang="scss">
    div.secondary {
        font-style: italic;
        padding-left: 1rem;
    }
</style>
