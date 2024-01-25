'use client'

import React from 'react';
import { GameVersionContext } from '@utils/context/gameVersionContext';
import { ChampionListContext } from '@utils/context/championListContext';
import { ItemDataContext } from '@utils/context/itemDataContext';
import { RuneDataContext } from '@utils/context/runeDataContext';

export const StaticDataProvider = ({ children, data = {} }) => {
    const { championListData, itemListData, runeListData, gameVersionData } = data;

    return (
        <GameVersionContext.Provider value={gameVersionData}>
            <ChampionListContext.Provider value={championListData}>
                <ItemDataContext.Provider value={itemListData}>
                    <RuneDataContext.Provider value={runeListData}>
                        {children}
                    </RuneDataContext.Provider>
                </ItemDataContext.Provider>
            </ChampionListContext.Provider>
        </GameVersionContext.Provider>
    );
};