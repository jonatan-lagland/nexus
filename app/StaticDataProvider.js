'use client'

import React from 'react';
import { GameVersionContext } from '@utils/context/gameVersionContext';
import { ChampionListContext } from '@utils/context/championListContext';
import { ItemDataContext } from '@utils/context/itemDataContext';
import { RuneDataContext } from '@utils/context/runeDataContext';

export const StaticDataProvider = ({ children, data = {} }) => {
    const { championList, itemList, runeList, gameVersion } = data;

    return (
        <GameVersionContext.Provider value={gameVersion}>
            <ChampionListContext.Provider value={championList}>
                <ItemDataContext.Provider value={itemList}>
                    <RuneDataContext.Provider value={runeList}>
                        {children}
                    </RuneDataContext.Provider>
                </ItemDataContext.Provider>
            </ChampionListContext.Provider>
        </GameVersionContext.Provider>
    );
};