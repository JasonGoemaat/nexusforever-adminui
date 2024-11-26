import { getJson } from './Api'
import { getText, addLocalizedText } from './Text'

// export const getCharacterQuests = async(character: any) => {
//     if (!character?.)
// }

export const getQuest = async (questId: number) => {
    console.log('getQuest()', questId)
    const start = performance.now()
    const quest = await getJson(`tables/Quest2/${questId}`)
    if (!quest) {
        alert('Quest not found')
        return { quest: null, texts: null, ms: performance.now() - start }
    }

    const texts = <any[]>[]

    const textProperties = [
        'LocalizedTextIdTitle', 'LocalizedTextIdText', 'LocalizedTextIdCompletionOverride',
        'LocalizedTextIdGiverTextUnknown', 'LocalizedTextIdGiverTextAccepted', 'LocalizedTextIdReceiverTextAccepted',
        'LocalizedTextIdReceiverTextAchieved', 'LocalizedTextIdGiverSayAccepted',
        'LocalizedTextIdReceiverSayCompleted',
        'LocalizedTextIdAcceptResponse', 'LocalizedTextIdCompleteResponse',
        'LocalizedTextIdCompletedSummary',
        'LocalizedTextIdGiverIncompleteResponse',
        'LocalizedTextIdReceiverIncompleteResponse',
        'LocalizedTextIdCompletedObjectiveShort',
        'LocalizedTextIdMoreInfoSay00',
        'LocalizedTextIdMoreInfoSay01',
        'LocalizedTextIdMoreInfoSay02',
        'LocalizedTextIdMoreInfoSay03',
        'LocalizedTextIdMoreInfoSay04',
        'LocalizedTextIdMoreInfoText00',
        'LocalizedTextIdMoreInfoText01',
        'LocalizedTextIdMoreInfoText02',
        'LocalizedTextIdMoreInfoText03',
        'LocalizedTextIdMoreInfoText04',
        'LocalizedTextIdGiverSayDecline',
    ]

    // for (let i = 0; i < textProperties.length; i++) {
    //     let name = textProperties[i]
    //     let id = quest[name]
    //     let text = null
    //     if (typeof(id) === 'number') {
    //         if (id <= 0) {
    //             text = `None (${id})`
    //         } else {
    //             text = await getText(id)
    //         }
    //     } else {
    //         text = `Unknown type ${typeof(id)} for property ${name}`
    //     }
    //     texts.push({ id, name, text })
    // }

    // await addLocalizedText(quest)
    await addLocalizedText(quest)

    const ms = performance.now() - start
    return quest
}