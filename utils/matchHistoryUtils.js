'use client'
import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getMatchHistoryDetails } from "@app/api/userProps";
import { useInView } from "react-intersection-observer";

export function useCardDetails(matchHistoryDetails, puuid) {
    return useMemo(() => {
        const { info } = matchHistoryDetails;
        const { gameEndTimestamp, gameDuration, gameMode, queueId, participants } = info;
        const mainPlayer = participants.find(participant => participant.puuid === puuid);

        if (!mainPlayer)
            return null

        const { win } = mainPlayer;
        // Item id's of the main player in a match
        const {
            item0,
            item1,
            item2,
            item3,
            item4,
            item5,
            item6 } = mainPlayer;

        // Convert to array
        const itemIdList = [item0, item1, item2, item3, item4, item5, item6];
        // Turn item id's into fully detailed item descriptions

        return {
            gameEndTimestamp,
            gameDuration,
            mainPlayer,
            itemIdList,
            participants,
            gameMode,
            queueId,
            win
        };
    }, [matchHistoryDetails, puuid]);
}

export function getQueueTypes(queueId, queueTypes) {
    if (queueId && queueTypes) {
        let foundQueue;
        if (Array.isArray(queueTypes)) {
            foundQueue = queueTypes.find(queue => queue.id === queueId || queue[queueId]);
            if (foundQueue && queueId in foundQueue) {
                foundQueue = foundQueue[queueId];
            }
        } else if (typeof queueTypes === 'object') {
            foundQueue = queueTypes[queueId];
        }
        return {
            name: foundQueue?.name || 'Unknown',
            shortName: foundQueue?.shortName || 'Unknown',
            description: foundQueue?.description || 'Unknown',
            detailedDescription: foundQueue?.detailedDescription || 'Unknown',
        };
    }
}

export function useCalculateGameEnd(gameEndTimestamp) {
    return useMemo(() => {
        const currentTime = Date.now(); // Gets the current timestamp in milliseconds
        // Calculate the difference in milliseconds
        const timeDifference = currentTime - gameEndTimestamp;

        // Convert the time difference into a human-readable format
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30)
        const years = Math.floor(months / 12)

        if (years >= 2)
            return (`${years} years ago`); // Equal or more than 2 years
        if (years > 0)
            return (`${years} year ago`); // More than 1 year less than 2 years
        if (months >= 2)
            return (`${months} months ago`); // More than 2 months
        if (months > 0)
            return (`${months} month ago`); // More than 1 month less than 2 months
        if (days >= 2)
            return (`${days} days ago`); // More than 2 days
        if (days > 0)
            return (`${days} day ago`); // More than 1 day less than 2 days
        if (hours >= 2)
            return (`${hours} hours ago`); // More than 2 hours
        if (hours > 0)
            return (`${hours} hour ago`); // More than 1 hour less than 2 hours
        if (minutes > 0)
            return (`${minutes} minutes ago`);

        return ("Just now"); // default

    }, [gameEndTimestamp]);
}

export function useCalculateGameDuration(gameDuration) {
    return useMemo(() => {
        const minutes = Math.floor(gameDuration / 60); // Rounds to nearest minute
        const seconds = gameDuration % 60; // Remainding seconds of the division
        const paddedSeconds = String(seconds).padStart(2, '0'); // Turns timestamp 10:2 = > 10:02
        const timestamp = `${minutes}:${paddedSeconds}`;
        return timestamp;
    }, [gameDuration]);
}

export function useCalculateCsPerMinute(minionsKilled, gameDurationInSeconds) {
    return useMemo(() => {
        const totalMinutes = gameDurationInSeconds / 60;
        const csPerMinute = minionsKilled / totalMinutes;
        return Number.isFinite(csPerMinute) ? csPerMinute.toFixed(1) : null;
    }, [minionsKilled, gameDurationInSeconds]);
}

export function useCalculateGoldInThousands(goldEarned) {
    return useMemo(() => {
        return Math.abs(goldEarned) > 999 ? Math.sign(goldEarned) * ((Math.abs(goldEarned) / 1000).toFixed(1)) + 'K' : Math.sign(goldEarned) * Math.abs(goldEarned)
    }, [goldEarned]);
}

export function useCalculateOPScore(matchHistoryDetails, puuid) {
    return useMemo(() => {
        if (!matchHistoryDetails) {
            return null;
        }
        const teamScores = matchHistoryDetails.info.teams.map(team => ({
            teamId: team.teamId,
            totalKills: team.objectives.champion.kills
        }));

        const playerScores = matchHistoryDetails.info.participants.map(player => {
            const totalKillsAndAssists = player.kills + player.assists;

            // Find the team of the player and get total team kills
            const team = teamScores.find(t => t.teamId === player.teamId);
            const teamTotalKills = team ? team.totalKills : 0;
            const mainPlayer = player.puuid === puuid ? true : false;

            // Calculate KDA ratio
            const deaths = player.deaths === 0 ? 1 : player.deaths; // Avoid division by zero
            const kdaRatio = Math.abs(((player.kills + player.assists) / deaths).toFixed(2))

            // Calculate kill participation
            const killParticipation = teamTotalKills > 0 ? Math.floor((totalKillsAndAssists / teamTotalKills) * 100) : 0;

            return {
                puuid: player.puuid,
                killParticipation: killParticipation,
                kdaRatio: kdaRatio,
                mainPlayer: mainPlayer
            };
        });

        const mainPlayerScore = playerScores.find(player => player.mainPlayer === true);
        return { playerScores, mainPlayerScore };

    }, [matchHistoryDetails, puuid]);
}

export function useCalculateKDA(kills, deaths, assists) {
    return useMemo(() => {
        return Math.abs(((kills + assists) / deaths).toFixed(2))
    }, [kills, deaths, assists]);
}

export function useMatchHistoryUtils(matchHistory, region) {
    const [hasNoMatches, setHasNoMatches] = useState(false);
    const maxPages = 20;

    const { data, fetchNextPage, hasNextPage, isFetching, refetch } = useInfiniteQuery({
        queryKey: ["query"],
        queryFn: async ({ pageParam = 1 }) => {
            if (matchHistory.length === 0) {
                setHasNoMatches(true);
                return null;
            }
            const matchId = matchHistory.slice(pageParam - 1, pageParam).join('')
            const response = await getMatchHistoryDetails(matchId, region);
            return response;
        },
        getNextPageParam: (_, pages) => {
            return pages.length < maxPages ? pages.length + 1 : undefined;
        },
    });

    // Reference for loading skeletons whenever they become in view
    const { ref: bottomRef, inView: bottomView } = useInView({
        rootMargin: '700px 0px 0px 0px',
        threshold: 0,
    });

    // Fetch a new page, for up to x amount whenever in view
    useEffect(() => {
        if (bottomView && hasNextPage && !isFetching) {
            fetchNextPage();
        }
    }, [bottomView, fetchNextPage, hasNextPage, isFetching]);

    useEffect(() => {
        // Refetch the data when matchHistory changes. This will reset the pages and start from the first page again.
        refetch();
    }, [matchHistory, refetch]);

    return { data, bottomRef, hasNoMatches, bottomView }
}