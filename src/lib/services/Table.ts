import { getJson } from "$lib/Api";

export const getTable = (tableName: string, limit?: number, offset?: number) => {
    if (limit) {
        return getJson(`tables/${tableName}?limit=${limit}`)
    } else {
        return getJson(`tables/${tableName}`)
    }
}

export const getTableArray = (tableName: string, limit?: number, offset?: number) => {
    return getTable(tableName, limit, offset)
    .then(x => Object.values(x))
}

export const getTableEntry = (tableName: string, id: number) => {
    return getJson(`tables/${tableName}/${id}`)
}
