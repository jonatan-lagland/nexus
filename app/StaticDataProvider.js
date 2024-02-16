'use client'

import { GameVersionContext } from '@utils/context/gameVersionContext';
import { ChampionListContext } from '@utils/context/championListContext';
import { ItemDataContext } from '@utils/context/itemDataContext';
import { RuneDataContext } from '@utils/context/runeDataContext';
import { SummonerSpellContext } from '@utils/context/summonerSpellContext';
import { QueueContext } from '@utils/context/queueContext';

export const StaticDataProvider = ({ children, data = {} }) => {
    const { championList, itemList, runeList, summonerSpellList, queueTypes, gameVersion } = data;

    return (
        <GameVersionContext.Provider value={gameVersion}>
            <QueueContext.Provider value={queueTypes}>
                <ChampionListContext.Provider value={championList}>
                    <ItemDataContext.Provider value={itemList}>
                        <RuneDataContext.Provider value={runeList}>
                            <SummonerSpellContext.Provider value={summonerSpellList}>
                                {children}
                            </SummonerSpellContext.Provider>
                        </RuneDataContext.Provider>
                    </ItemDataContext.Provider>
                </ChampionListContext.Provider>
            </QueueContext.Provider>
        </GameVersionContext.Provider>
    );
};