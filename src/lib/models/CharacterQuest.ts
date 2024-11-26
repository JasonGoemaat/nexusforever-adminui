export interface CharacterQuest {
    questId: number,
    title: string,
    text: string,
    state: number,
    stateText: string,
    level: number,
    prerequisites: {
        level: number,
        questIds: number[],
        item: number,
        id: number,
        class: number,
        flags: number,
    },
    objectiveIds: number[],
    objectives: QuestObjective[] | null,
    moreInfo: string[],
    _q: any,
    _c: any,
}

export interface QuestObjective {
}

export const stateTexts = ['Unknown', 'Accepted', 'Achieved', 'Completed', 'Botched', 'Mentioned', 'Abandoned', 'Ignored']

export const createCharacterQuest = (quest: any, cquest: any) => {
    const result: CharacterQuest = {
        questId: quest.Id,
        title: quest.Title,
        text: quest.Text,
        state: cquest.state,
        stateText: stateTexts[cquest.state] || `Unknown (${cquest.state})`,
        level: quest.PrerequisiteLevel,
        prerequisites: {
            level: quest.PrerequisiteLevel,
            questIds: quest.PrerequisiteQuests.filter((x: number) => x),
            item: quest.PrerequisiteItem,
            id: quest.PrerequisiteId,
            class: quest.PrerequisiteClass,
            flags: quest.PrerequisiteFlags,
        },
        objectiveIds: quest.Objectives.filter((x: number) => x),
        objectives: quest.Objectives.filter((x: number) => x).length === 0 ? [] : null,
        moreInfo: [quest.moreInfoText00, quest.moreInfoText01, quest.moreInfoText02, , quest.moreInfoText03, , quest.moreInfoText04].filter(x => x),
        _q: quest,
        _c: cquest,
    }
    return result;
}