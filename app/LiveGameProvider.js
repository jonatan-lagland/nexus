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
            setIsLoading(true) // Enable loading icon
            const response = await getLiveGameDetails(server, summonerId) // Get live game details
            if (response.error) { // If player isn't in-game or otherwise an error occurs
                setIsGameFound(false);
                setIsShowLiveGameTab(false);
            } else {
                const rankedDetailsPromises = response.participants.map(participant => // Get ranked stats of each player
                    getRankedInfo(participant.summonerId, server)
                );
                const rankedDetails = await Promise.all(rankedDetailsPromises);
                const userNameAndTag = response.participants.map(participant =>
                    getUserNameAndTag(participant.puuid, region)
                );
                const userNameDetails = await Promise.all(userNameAndTag); // Get Riot name and Id of each player
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
            setIsLoading(false) // Finally, set loading to false
        };
        fetchData();
    };

    return (
        <LiveGameContext.Provider value={{ liveGameDetails, rankedDetailsOfEveryPlayer, fetchLiveGame, isLoading, isGameFound, isShowLiveGameTab, setIsShowLiveGameTab }}>
            {children}
        </LiveGameContext.Provider>
    );
};