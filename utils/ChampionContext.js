'use client'
import React, { createContext } from 'react';
import { useChampionList } from '@utils/champion';

export const ChampionContext = createContext();

export const ChampionProvider = ({ children }) => {
    const { championList, error } = useChampionList();

    return (
        <ChampionContext.Provider value={{ championList, error }}>
            {children}
        </ChampionContext.Provider>
    );
};