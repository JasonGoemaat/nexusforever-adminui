import { getJson, getStatic} from '$lib/Api'
import { classFor, raceFor, sexFor } from '$lib/CharacterStore'
import { writable } from 'svelte/store'
import { lookupAccountCurrency, lookupEntitlement } from '$lib/services/Lookups'

export const getPlayers = () => {
    return getJson('players')
    // const hcPlayerPromise = getStatic("/players.json")
    // return hcPlayerPromise
}

export const player = writable<any>(null);

export const selectPlayer = ((newPlayer: any) => {
    player.set(newPlayer)
})

interface mapEntitlementMap { Id: number, EntitlementId: number, Amount: number }
export const mapEntitlement = (x: mapEntitlementMap) => {
/*
    "AccountEntitlement": [
        {
          "Id": 1,
          "EntitlementId": 12,
          "Amount": 1,
          "Account": null
        },
*/    
    const et = lookupEntitlement(x.EntitlementId)
    return {
        ...et,
        amount: x.Amount
    }
}

export const mapAccount = (a: any) => {
    if (!a) {
        return {
            accountId: 0,
            currency: [],
        }
    }
    return {
        accountId: a.id,
        currency: a.AccountCurrency.map((c: any) => 
           ({ ...lookupAccountCurrency(c.CurrencyId), amount: c.Amount })),
        entitlements: (a.AccountEntitlement || []).map(mapEntitlement)
    }
}

export const mapPlayer = (p: any) => {
    if (!p) {
        return {
            name: `unknown`,
        }
    }
    return {
        characterId: p.CharacterId,
        name: p.Name,
        sex: sexFor(p.Sex),
        race: raceFor(p.Race),
        class: classFor(p.Class),
        flags: p.Flags,
        path: p.Path,
        account: mapAccount(p?.Session?.Account),
    }
}