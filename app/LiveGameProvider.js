'use client'

import { LiveGameContext } from '@utils/context/liveGameContext';
import { useState } from 'react';
import { getLiveGameDetails, getRankedInfo, getUserNameAndTag } from './api/userProps';

export const LiveGameProvider = ({ children }) => {
    const [liveGameDetails, setLiveGameDetails] = useState(null);
    const [rankedDetailsOfEveryPlayer, setRankedDetailsOfEveryPlayer] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isGameFound, setIsGameFound] = useState(false);
    const [isShowLiveGameTab, setIsShowLiveGameTab] = useState(false);

    const fetchLiveGame = (server, region, summonerId) => {
        const fetchData = async () => {
            setIsLoading(true)
            const response = await getLiveGameDetails(server, summonerId)
            if (response.error) {
                setIsGameFound(false);
                setIsShowLiveGameTab(false);
            } else {
                const rankedDetailsPromises = response.participants.map(participant =>
                    getRankedInfo(participant.summonerId, server)
                );
                const rankedDetails = await Promise.all(rankedDetailsPromises);
                const userNameAndTag = response.participants.map(participant =>
                    getUserNameAndTag(participant.puuid, region)
                );
                const userNameDetails = await Promise.all(userNameAndTag);
                const combinedDetails = response.participants.map((participant, index) => ({
                    ...participant,
                    rankedInfo: rankedDetails[index],
                    userNameAndTag: userNameDetails[index]
                }));
                setLiveGameDetails(response);
                setRankedDetailsOfEveryPlayer(combinedDetails)
                setIsGameFound(true);
                setIsShowLiveGameTab(true);
            }
            setIsLoading(false)
        };
        fetchData();
    };

    return (
        <LiveGameContext.Provider value={{ liveGameDetails, rankedDetailsOfEveryPlayer, fetchLiveGame, isLoading, isGameFound, isShowLiveGameTab, setIsShowLiveGameTab }}>
            {children}
        </LiveGameContext.Provider>
    );
};