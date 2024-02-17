'use client'

import React from 'react';
import { useState } from 'react';
import { MatchHistoryContext } from '@utils/context/matchHistoryContext';
import { getMatchHistory, getRankedInfo } from './api/userProps';

export const MatchHistoryProvider = ({ children, matchHistory, rankedDetails }) => {
    const [matchHistoryData, setMatchHistoryData] = useState(matchHistory);
    const [rankedDetailsData, setrankedDetailsData] = useState(rankedDetails);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const refreshMatchHistoryData = (puuid, region, server, leagueId) => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const refreshCache = true;
                if (leagueId) {
                    const res_ranked = await getRankedInfo(leagueId, server, refreshCache);
                    setrankedDetailsData(res_ranked)
                }
                const res_match = await getMatchHistory(puuid, region, refreshCache);
                setMatchHistoryData(res_match);
            } catch (error) {
                setError(error)
            } finally {
                setIsLoading(false)
            }
        };
        fetchData();
    };

    return (
        <MatchHistoryContext.Provider value={{ refreshMatchHistoryData, matchHistoryData, isLoading, error, rankedDetailsData }}>
            {children}
        </MatchHistoryContext.Provider>
    );
};