import { getJson } from "$lib/Api";

export const getTable = (tableName: string, limit?: number, offset?: number, filters?: string[][]) => {
    console.log('filters:', JSON.parse(JSON.stringify(filters)))
    let criteria = []
    if (limit) {
        criteria.push(`limit=${limit}`)
    }
    if (offset) {
        criteria.push(`offset=${offset}`)
    }
    if (filters) {
        criteria = [...criteria, ...filters.map(f => `${f[0]}=${f[1]}`)]
    }
    let path = criteria.length === 0 ?
        `tables/${tableName}` : `tables/${tableName}?${criteria.join('&')}` 
    return getJson(path)
}

export const getTableArray = (tableName: string, limit?: number, offset?: number, filters?: string[][]) => {
    return getTable(tableName, limit, offset, filters)
    .then(x => Object.values(x))
}

export const getTableEntry = (tableName: string, id: number) => {
    return getJson(`tables/${tableName}/${id}`)
}

export const getTableNames = () => {
    return getJson(`tables`).then((x: string[]) => x.sort())
}