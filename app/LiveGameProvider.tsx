'use client'

import { LiveGameContext } from '@utils/context/liveGameContext';
import { useState } from 'react';
import { getLiveGameDetails, getRankedInfo, getUserNameAndTag } from './api/userProps';
import { toast } from "sonner";
import { Region, Server } from '@utils/types';

export const LiveGameProvider = ({ children }) => {
    const [liveGameDetails, setLiveGameDetails] = useState(null);
    const [rankedDetailsOfEveryPlayer, setRankedDetailsOfEveryPlayer] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isGameFound, setIsGameFound] = useState(false);
    const [isShowLiveGameTab, setIsShowLiveGameTab] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [minimizeWindow, setMinimizeWindow] = useState(false);

    const toastUpToDate = (gameName: string, tagLine: string) => {
        toast.info(`${gameName} #${tagLine} is not in-game.`, {

            action: {
                label: "Dismiss",
                onClick: () => toast.dismiss(),
            },
        });
    }

    const fetchLiveGame = async (server: Server, region: Region, summonerId: string, gameName: string, tagLine: string) => {
        try {
            setIsLoading(true);
            const response = await getLiveGameDetails(server, summonerId);
            if (response.error) { // If player isn't in-game or otherwise an error occurs
                toastUpToDate(gameName, tagLine)
                setIsShowLiveGameTab(false)
                setIsLoading(false)
                setLoadingProgress(0)
                return;
            }
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
            setLoadingProgress(0)
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
            setLoadingProgress(0)
        }
    };

    return (
        <LiveGameContext.Provider value={{
            liveGameDetails,
            rankedDetailsOfEveryPlayer,
            fetchLiveGame,
            isLoading,
            isGameFound,
            isShowLiveGameTab,
            setIsShowLiveGameTab,
            loadingProgress,
            minimizeWindow,
            setMinimizeWindow
        }}>
            {children}
        </LiveGameContext.Provider>
    );
};