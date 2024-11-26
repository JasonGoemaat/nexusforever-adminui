import entitlementTableData from '$lib/data/EntitlementTable.json'
import accountCurrencyTableData from '$lib/data/AccountCurrencyTable.json'
import spell4SpellTypesData from '$lib/data/Spell4SpellTypesTable.json'

/*
"Id": 1,
"LocalizedTextId": 723872,
"IconName": "IconSprites:Icon_ItemMisc_UI_Item_CREDD",
"AccountItemId": 0
*/
interface accountCurrencyMap { [key: number]: { Id: number, LocalizedTextId: number, IconName: string, AccountItemId: number} }
export const accountCurrencyTable: accountCurrencyMap = accountCurrencyTableData

/*
    "1": {
        "Id": 1,
        "MaxCount": 100,
        "Flags": 1,
        "Spell4IdPersistentBuff": 0,
        "CharacterTitleId": 0,
        "LocalizedTextIdName": 0,
        "LocalizedTextIdDescription": 0,
        "ButtonIcon": ""
    },
*/
interface entitlementMap { [key: number]: {
    Id: number,
    MaxCount: number,
    Flags: number,
    Spell4IdPersistentBuff: number,
    CharacterTitleId: number,
    LocalizedTextIdName: number,
    LocalizedTextIdDescription: number,
    ButtonIcon: string
}}
export const entitlementTable: entitlementMap = entitlementTableData

interface spellTypeMap { [key: number]: {
    Id: number,
    TypeName: string,
    EnumName: string,
}}
export const spellTypes: spellTypeMap = spell4SpellTypesData
