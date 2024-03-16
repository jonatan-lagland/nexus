'use client'

import { LiveGameContext } from '@utils/context/liveGameContext';
import { useState } from 'react';
import { getLiveGameDetails, getRankedInfo, getUserNameAndTag } from './api/userProps';
import { toast } from "sonner";

export const LiveGameProvider = ({ children }) => {
    const [liveGameDetails, setLiveGameDetails] = useState(null);
    const [rankedDetailsOfEveryPlayer, setRankedDetailsOfEveryPlayer] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isGameFound, setIsGameFound] = useState(false);
    const [isShowLiveGameTab, setIsShowLiveGameTab] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0)

    const fetchLiveGame = async (server, region, summonerId, gameName, tagLine) => {
        setIsLoading(true); // Enable loading icon
        try {
            const response = await getLiveGameDetails(server, summonerId); // Get live game details

            if (response.error) { // If player isn't in-game or otherwise an error occurs
                toast.info(`${gameName} #${tagLine} is not in-game.`, {

                    action: {
                        label: "Dismiss",
                        onClick: () => toast.dismiss(),
                    },
                });
                setIsShowLiveGameTab(false);
                setIsLoading(false);
            } else {
                setLoadingProgress(30)
                const rankedDetailsPromises = response.participants.map(participant => // Get ranked stats of each player
                    getRankedInfo(participant.summonerId, server)
                );
                const rankedDetails = await Promise.all(rankedDetailsPromises);
                setLoadingProgress(100)

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
                setRankedDetailsOfEveryPlayer(combinedDetails);
                setIsGameFound(true);
                setIsShowLiveGameTab(true);
                setIsLoading(false);
            }
        } catch (error) {
            toast.error(`An error has occured.`, {
                description: "Please try again later.",
                action: {
                    label: "Dismiss",
                    onClick: () => toast.dismiss(),
                },
            });
            setIsGameFound(false);
            setIsShowLiveGameTab(false);
            setIsLoading(false);
        }
        setLoadingProgress(0)
    };

    return (
        <LiveGameContext.Provider value={{ liveGameDetails, rankedDetailsOfEveryPlayer, fetchLiveGame, isLoading, isGameFound, isShowLiveGameTab, setIsShowLiveGameTab, loadingProgress }}>
            {children}
        </LiveGameContext.Provider>
    );
};