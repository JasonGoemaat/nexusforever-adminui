import { writable } from 'svelte/store';
import { getJson } from './Api';

export const character = writable<any>(null);

export const getCharacters = async () => {
    return await getJson("sessions")
}

export const selectCharacter = ((newCharacter: any) => {
    character.set(newCharacter)
})

export const sexFor = (id: number) => {
    return ['male', 'female'][id] || `Unknown-${id}`
}

export const classFor = (id: number) => {
    switch(id) {
        case 1: return 'Warrior'
        case 2: return 'Engineer'
        case 3: return 'Esper'
        case 4: return 'Medic'
        case 5: return 'Stalker'
        case 7: return 'Spellslinger'
        default: return `Class-${id}`
    }
}

export const raceFor = (id: number) => {
    switch(id) {
        case 1: return 'Human'
        case 2: return 'Eschara'
        case 3: return 'Granok'
        case 4: return 'Aurin'
        case 5: return 'Draken'
        case 12: return 'Mechari'
        case 13: return 'Chua'
        case 16: return 'Mordesh'
        default: return `UnknownRace-${id}`
    }
}

