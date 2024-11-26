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

const content = {
    getAllAccountCurrency,
    getAllEntitlements,
    lookupAccountCurrency,
    lookupEntitlement,
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
