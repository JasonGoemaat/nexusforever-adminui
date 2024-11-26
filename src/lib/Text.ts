import { getJson, getString, postJson } from '$lib/Api'
import registry from './Registry'
import importedAllTableNames from '$lib/data/AllTableNames.json'

export const getText = async (id: number) => {
    return await getString(`text/${id}`)
}

/**
 * Look for properties on object beginning with 'LocalizedTextId', for each
 * one that is a number, add a new property with the same name without the
 * prefix with the text.  Empty string if 0.
 */
export const addLocalizedText_old = async (obj: any) => {
    var entries = Object.entries(obj).filter(x => `${x[0]}`.startsWith('LocalizedTextId'))
    for (let i = 0; i < entries.length; i++) {
        const entry = entries[i]
        const newName = entry[0].substring(15)
        const id = entry[1]
        if (typeof(id) === 'number') {
            if (id === 0) {
                obj[newName] = ""
            } else {
                obj[newName] = await getText(id)
            }
        } else {
            obj[newName] = `Bad id type ${typeof(id)} for id ${id}`
        }
    }
}

export const getTableEntryWithText = (tableName: string, id: number) => {
    getJson(`tables/{tableName}/${id}`)
        .then(x => addLocalizedTextExisting(x))
}

export const addLocalizedText = async (obj: any) => {
    var entries = Object.entries(obj).filter(x => `${x[0]}`.startsWith('LocalizedTextId'))
    var ids = entries.map(x => x[1]) as number[]
    var results = await getMultiple(ids)
    for (let i = 0; i < entries.length; i++) {
        const entry = entries[i]
        const newName = entry[0].substring(15)
        obj[newName] = results[i]
    }
    return obj
}

export const addLocalizedTextExisting = (obj: any) => {
    var entries = Object.entries(obj).filter(x => `${x[0]}`.startsWith('LocalizedTextId'))
    var ids = entries.map(x => x[1]) as number[]
    var results = ids.map(x => textFor(x))
    for (let i = 0; i < entries.length; i++) {
        const entry = entries[i]
        const newName = entry[0].substring(15)
        obj[newName] = results[i]
    }
    return obj
}

export const getMultiple = async(ids: number[]) : Promise<string[]> => {
    const result = await postJson<string[]>(`text`, ids)
    return result
}

let allTextsPromise: Promise<Map<number, string>> | null = null;
export const allTexts: Map<number, string> = new Map<number, string>()

export const getAllTexts = () => {
    if (allTextsPromise) {
        return allTextsPromise
    }
    allTextsPromise = getJson(`text/all`).then(x => {
        Object.entries(x).forEach((e => {
            const key = parseInt(e[0])
            const value : string = `${e[1]}`
            allTexts.set(key, value);
        }))
        return allTexts;
    })
    return allTextsPromise
}

export const textFor = (id: number) => {
    return allTexts.get(id) || `[TextId=${id}]`
}

export const allTableNames =importedAllTableNames

const text = {
    getText,
    getAllTexts,
    allTexts,
    textFor,
    getMultiple,
    addLocalizedTextExisting,
    addLocalizedText,
    getTableEntryWithText,
    allTableNames,
};

registry.add('text', text)

// (() => (window as any).s = Object.assign((window as any).s || {}, { text }))()
