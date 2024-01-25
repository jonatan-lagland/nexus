'use client'
import { useMemo } from "react";

export function useCardDetails(matchHistoryDetails, puuid) {
    return useMemo(() => {
        const { info } = matchHistoryDetails;
        const { gameEndTimestamp, gameDuration, gameMode, participants } = info;
        const mainPlayer = participants.find(participant => participant.puuid === puuid);
        const {
            individualPosition,
            kills,
            deaths,
            assists,
            totalMinionsKilled,
            visionScore,
            goldEarned,
            champLevel,
            championName,
            summoner1Id,
            summoner2Id,
            perks,
            win
        } = mainPlayer

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
            individualPosition,
            kills,
            deaths,
            assists,
            totalMinionsKilled,
            visionScore,
            goldEarned,
            champLevel,
            championName,
            summoner1Id,
            summoner2Id,
            perks,
            itemIdList,
            participants,
            gameMode,
            win
        };
    }, [matchHistoryDetails, puuid]);
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

        if (days > 0) {
            return (`${days} days ago`);
        } else if (hours > 0) {
            return (`${hours} hours ago`);
        } else if (minutes > 0) {
            return (`${minutes} minutes ago`);
        } else {
            return ("Just now");
        }
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
