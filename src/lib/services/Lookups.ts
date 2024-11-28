import { textFor } from '$lib/Text'
import { accountCurrencyTable, entitlementTable } from '$lib/data'
import registry from '$lib/Registry'

// http://localhost:5003/tables/AccountCurrencyType

export const lookupAccountCurrency = (id: number) => {
    var ac = accountCurrencyTable[id]
    if (!ac) {
        return {
            accountCurrencyId: id,
            name: `Unknown (${id})`,
            accountItemId: -1,
        }
    }
    return {
        accountCurrencyId: ac.Id,
        name: textFor(ac.LocalizedTextId),
        accountItemId: ac.AccountItemId,
    }
}

export const getAllAccountCurrency = () => {
    return Object.keys(entitlementTable).map(key => lookupEntitlement(parseInt(key)))
}

export const getAllEntitlements = () => {
    return Object.keys(entitlementTable).map(key => lookupEntitlement(parseInt(key)))
}

export const lookupEntitlement = (id: number) => {
    var et = entitlementTable[id] || {
        Id: 0,
        MaxCount: 0,
        Flags: 0,
        Spell4IdPersistentBuff: 0,
        CharacterTitleId: 0,
        LocalizedTextIdName: 0,
        LocalizedTextIdDescription: 0,
        ButtonIcon: ''
    }
    if (!et) {
        return {
            entitlementId: id,
            maxCount: 0,
            flags: 0,
            spell4IdPersistentBuff: 0,
            characterTitleId: 0,
            name: `NotFound (${id})`,
            description: `NotFound (${id})`,
        }
    }
    return {
        entitlementId: et.Id,
        maxCount: et.MaxCount,
        flags: et.Flags,
        spell4IdPersistentBuff: et.Spell4IdPersistentBuff,
        characterTitleId: et.CharacterTitleId,
        name: textFor(et.LocalizedTextIdName),
        description: textFor(et.LocalizedTextIdDescription),
    }
}

const lookupFlags = (map: string[], flags: number) => {
    if (flags == 0) {
        return 'None'
    }
    let list = []
    let index = 0
    while (flags > 0) {
        if (flags & 1) {
            if (index < map.length) {
                list.push(map[index])
            } else {
                list.push(`?0x${(1<<index).toString(16)}?`)
            }
        }
        flags = flags >> 1
        index++;
    }
    return list.join(', ')
}

export const lookupSpellEffectTargetFlags = (flags: number) => {
/*
    public enum SpellEffectTargetFlags
    {
        None      = 0x00,
        Caster    = 0x01,
        Target    = 0x02,
        Telegraph = 0x04,
        Unknown08 = 0x08
    }
*/
    const map = ['Caster', 'Target', 'Telegraph', 'Unknown08']
    return lookupFlags(map, flags)
}

export const lookupSpellEffectFlags = (flags: number) => {
/*
    public enum SpellEffectFlags
    {
        None       = 0x00,
        CancelOnly = 0x02,
    }
*/
    const map = ['Unknown01', 'CancelOnly']
    return lookupFlags(map, flags)
}


const spellEffectTypes = [
    'NOTSET00',
    'VitalModifier',
	'SpellCounter',
	'ForcedMove',
	'CCStateSet',
	'Transference',
	'SummonVehicle',
	'Activate',
	'Damage',
	'FactionSet',
	'Heal',
	'UnitPropertyModifier',
	'DistanceDependentDamage',
	'Script',
	'Proc',
	'UnitStateSet',
	'Resurrect',
	'Fluff',
	'Scale',
	'ProxyLinearAE',
	'UnlockActionBar',
	'SummonCreature',
	'HousingTeleport',
	'ActionBarSet',
	'ForcedAction',
	'ProxyChannel',
	'Proxy',
	'CCStateBreak',
	'ForceFacing',
	'Absorption',
	'SapVital',
	'Disguise',
	'SpellImmunity',
	'DistributedDamage',
	'ChangePhase',
	'NpcExecutionDelay',
	'SummonMount',
	'ReputationModify',
	'GiveSchematic',
	'UNUSED039',
	'UNUSED040',
	'TradeSkillProfession',
	'QuestAdvanceObjective',
	'GiveItemToPlayer',
	'GiveLootTableToPlayer',
	'NpcLootTableModify',
	'ThreatModification',
	'ThreatTransfer',
	'WarplotTeleport',
	'CraftItem',
	'RewardPropertyModifier',
	'SpellForceRemoveChanneled',
	'ModifyInterruptArmor',
	'SpellDispel',
	'UNUSED054',
	'ModifySpell',
	'ModifySpellEffect',
	'AddSpell',
	'AddSpellEffect',
	'SuppressSpellEffect',
	'ModifyCreatureFlags',
	'UNUSED061',
	'VacuumLoot',
	'UNUSED063',
	'ShieldOverload',
	'Teleport',
	'TitleGrant',
	'TitleRevoke',
	'VendorPriceModifier',
	'ApplyLASChanges',
	'UNUSED070',
	'FacilityModification',
	'UNUSED072',
	'ModifySpellCooldown',
	'UNUSED074',
	'ChangeIcon',
	'ItemVisualSwap',
	'AggroImmune',
	'GiveAbilityPointsToPlayer',
	'SpellEffectImmunity',
	'SpellForceRemove',
	'RavelSignal',
	'ChangeDisplayName',
	'Stealth',
	'RemoveStealth',
	'PathActionExplorerDig',
	'HazardEnable',
	'HazardModify',
	'HazardSuspend',
	'NpcForceFacing',
	'ModifyAbilityCharges',
	'UNUSED091',
	'AchievementAdvance',
	'PathXpModify',
	'ProxyChannelVariableTime',
	'FullScreenEffect',
	'ProxyRandomExclusive',
	'DespawnUnit',
	'SummonPet',
	'MimicDisplayName',
	'MimicDisguise',
	'GrantXP',
	'UNUSED102',
	'UNUSED103',
	'UNUSED104',
	'SettlerCampfire',
	'SummonTrap',
	'SetBusy',
	'CooldownReset',
	'RestedXpDecorBonus',
	'LearnDyeColor',
	'PetCastSpell',
	'DisguiseOutfit',
	'RewardBuffModifier',
	'UNUSED114',
	'UNUSED115',
	'HousingEscape',
	'NPCForceAIMovement',
	'HealShields',
	'PathMissionIncrement',
	'GrantLevelScaledXP',
	'DelayDeath',
	'GrantLevelScaledPrestige',
	'UnlockPetFlair',
	'WarplotPlugUpgrade',
	'UnlockMount',
	'SetMatchingEligibility',
	'UnlockInlaidAugment',
	'GiveAugmentPowerToPlayer',
	'TemporarilyUnflagPvp',
	'SupportStuck',
	'MiniMapIcon',
	'Disembark',
	'ChangePlane',
	'ModifyRestedXP',
	'HousingPlantSeed',
	'UnlockVanityPet',
	'SummonVanityPet',
	'DamageShields',
	'RapidTransport',
	'DisallowPvP',
	'GoMap',
	'VectorSlide',
	'ClampVital',
	'HealingAbsorption',
	'UnitPropertyConversion',
	'ActivateSpellCooldown',
	'ReturnMap',
	'SharedHealthPool',
	'Kill',
    'UNUSED0x0096',
    'PersonalDmgHealMod'
]

export const lookupSpellEffectType = (id: number) => {
    return spellEffectTypes[id] || `UKNOWN(0x${(id || -1).toString(16)})`
}

const content = {
    getAllAccountCurrency,
    getAllEntitlements,
    lookupAccountCurrency,
    lookupEntitlement,
    lookupSpellEffectTargetFlags,
    spellEffectTypes,
}

registry.add('Lookups', content)
/*
          {
            "Id": 1,
            "CurrencyId": 1,
            "Amount": 1000,
            "Account": null
          },
*/
