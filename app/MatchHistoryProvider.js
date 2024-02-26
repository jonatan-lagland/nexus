'use client'

import React from 'react';
import { useState } from 'react';
import { MatchHistoryContext } from '@utils/context/matchHistoryContext';
import { getMatchHistory, getRankedInfo } from './api/userProps';
import { useQueryClient } from '@tanstack/react-query';

export const MatchHistoryProvider = ({ children, matchHistory }) => {
    const [matchHistoryData, setMatchHistoryData] = useState(matchHistory);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const queryClient = useQueryClient();

    const refreshMatchHistoryData = (puuid, region, server, summonerId) => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const refreshCache = true;
                if (summonerId) {
                    await getRankedInfo(summonerId, server, refreshCache);
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

    const invalidateQuery = () => {
        queryClient.invalidateQueries('query', {
            refetchActive: true,
            refetchInactive: false,
        });
    }

    return (
        <MatchHistoryContext.Provider value={{ refreshMatchHistoryData, matchHistoryData, isLoading, error, invalidateQuery }}>
            {children}
        </MatchHistoryContext.Provider>
    );
};