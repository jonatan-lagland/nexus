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

    const toastError = () => {
        toast.info(`An error has occurred. Please try again later.`, {

            action: {
                label: "Dismiss",
                onClick: () => toast.dismiss(),
            },
        });
    }

    function endLoadingInteraction() {
        setIsShowLiveGameTab(false)
        setIsLoading(false)
        setLoadingProgress(0)
    }

    function endLoadingInteractionIsGame(response) {
        setLiveGameDetails(response);
        setIsGameFound(true);
        setIsShowLiveGameTab(true);
        setIsLoading(false);
        setLoadingProgress(0)
    }

    const fetchLiveGame = async (server: Server, region: Region, gameName: string, tagLine: string, puuid: string) => {
        try {
            setIsLoading(true);
            setLoadingProgress(30)
            const response = await getLiveGameDetails(server, puuid);

            if (response.error && response.status === 404) { // If player isn't in-game
                toastUpToDate(gameName, tagLine)
                endLoadingInteraction()
                return;
            }
            if (response.error) { // If a generic error occurs
                toastError()
                endLoadingInteraction()
                return;
            }

            // Exit early if identical game in question
            if (response?.gameId === liveGameDetails?.gameId) {
                endLoadingInteractionIsGame(response)
                return;
            }

            setLoadingProgress(100)

            const combinedDetailsPromises = response.participants.map(async (participant) => {
                const [rankedInfo, userNameAndTag] = await Promise.all([
                    getRankedInfo(participant.summonerId, server),
                    getUserNameAndTag(participant.puuid, region)
                ]);

                return {
                    ...participant,
                    rankedInfo,
                    userNameAndTag
                };
            });

            const combinedDetails = await Promise.all(combinedDetailsPromises);
            setRankedDetailsOfEveryPlayer(combinedDetails);
            endLoadingInteractionIsGame(response)

        } catch (error) {
            toastError()
            endLoadingInteraction()
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