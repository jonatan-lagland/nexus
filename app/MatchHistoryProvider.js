'use client'

import React from 'react';
import { useState } from 'react';
import { MatchHistoryContext } from '@utils/context/matchHistoryContext';
import { getMatchHistory } from './api/userProps';
import { useEffect } from 'react';

export const MatchHistoryProvider = ({ children, matchHistory }) => {
    const [matchHistoryData, setMatchHistoryData] = useState(matchHistory || null);

    const refreshMatchHistoryData = (puuid, region, refreshCache) => {
        const fetchData = async () => {
            const response = await getMatchHistory(puuid, region, refreshCache);
            console.log(response)
            setMatchHistoryData(response);
        };
        fetchData();
    };

    useEffect(() => {
        console.log("data updated:", matchHistoryData)
    }, [matchHistoryData]);


    return (
        <MatchHistoryContext.Provider value={{ refreshMatchHistoryData, matchHistoryData }}>
            {children}
        </MatchHistoryContext.Provider>
    );
};