<script lang="ts">
    import { textFor } from "$lib/Text";
    import { spellTypes } from "$lib/data";

    const { table, entry, field } = $props()
    let name = $state<string>(field[0])
    let value = $state<any>(field[1])
    if (name.startsWith('LocalizedTextId')) {
        name = field[0].substring(15) || '[text]'
        value = textFor(value)
    }

    const spellClasses = {
        0x000E: 'BuffNonDispelRightClickOk',
        0x0024: 'BuffDispellable',
        0x0025: 'BuffNonDispellable',
        0x0026: 'DebuffDispellable',
        0x0027: 'DebuffNonDispellable'
    }
</script>
<li class="truncate">
    {#if name === 'Spell4IdPersistentBuff' && value > 0}
    <a href="/explorer/Spell4/{value}" style="text-decoration:underline">{name}</a>:
    <span title="{value}">{value}</span>

    {:else if name === 'Spell4BaseIdBaseSpell' && value > 0}
    <a href="/explorer/Spell4Base/{value}" style="text-decoration:underline">{name}</a>:
    <span title="{value}">{value}</span>

    {:else if name === 'Spell4SpellTypesIdSpellType' && value > 0}
    <a href="/explorer/Spell4SpellTypes/{value}" style="text-decoration:underline">SpellType</a>:
    <span title="{value}">{value} ({spellTypes[value]?.TypeName})</span>

    {:else if name === 'SpellClass' && value > 0}
    SpellClass {value} ({spellClasses[value] || 'unknown'})

    {:else}
    <strong>{name}</strong>:
    <span title="{value}">{value}</span>
    {/if}
</li>

<!-- <pre>{ JSON.stringify(field) }</pre> -->
