import { getJson } from './Api'
import { getText, addLocalizedText } from './Text'

export const getQuest = async (questId: number) => {
    console.log('getQuest()', questId)
    const start = performance.now()
    const quest = await getJson(`tables/Quest2/${questId}`)
    if (!quest) {
        alert('Quest not found')
        return { quest: null, texts: null, ms: performance.now() - start }
    }

    await addLocalizedText(quest)

    const ms = performance.now() - start
    return quest
}