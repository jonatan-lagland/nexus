'use client'

import React from 'react';
import { useState } from 'react';
import { MatchHistoryContext } from '@utils/context/matchHistoryContext';
import { getMatchHistory, getRankedInfo, getUserInfo } from './api/userProps';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from "sonner";
import { Region, Server } from '@utils/types';

export const MatchHistoryProvider = ({ children, matchHistory, user, userDetails }) => {
    const [matchHistoryData, setMatchHistoryData] = useState(matchHistory);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const queryClient = useQueryClient();

    const toastUpToDate = () => {
        toast.info(`${user.gameName} #${user.tagLine} is already up-to-date.`, {
            action: {
                label: "Dismiss",
                onClick: () => toast.dismiss(),
            },
        });
    }

    const refreshMatchHistoryData = (puuid: string, region: Region, server: Server, summonerId: string) => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                /* SummonerId is depracated on some accounts created after the introduction of Riot ID's */
                if (!summonerId) {
                    throw new Error('Summoner ID is required')
                }
                /* Refresh user and ranked details, the response is not required to be set */
                await getRankedInfo(summonerId, server, true);
                await getUserInfo(user.puuid, server, true);
                const res_match = await getMatchHistory(puuid, region, true);

                if (JSON.stringify(res_match) !== JSON.stringify(matchHistory)) {
                    setMatchHistoryData(res_match);
                } else {
                    /* Display a toast if there are no new matches */
                    toastUpToDate();
                }
            } catch (error) {
                setError(error)
            } finally {
                setIsLoading(false)
            }
        };
        fetchData();
    };

    const invalidateQuery = () => {
        queryClient.invalidateQueries({ queryKey: ['query'] })
    }

    return (
        <MatchHistoryContext.Provider value={{ refreshMatchHistoryData, matchHistoryData, isLoading, error, invalidateQuery, userDetails, user }}>
            {children}
        </MatchHistoryContext.Provider>
    );
};