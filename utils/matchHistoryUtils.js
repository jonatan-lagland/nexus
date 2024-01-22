'use client'
import { useItemData } from "./itemUtils";

export function useCardDetails(matchHistoryDetails, puuid, completeListOfItems) {
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
    const items = useItemData(itemIdList, completeListOfItems);

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
        items,
        participants,
        gameMode,
        win
    }
}

export function calculateGameEnd(gameEndTimestamp) {
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
}

export function calculateGameDuration(gameDuration) {
    const minutes = Math.floor(gameDuration / 60);
    const seconds = gameDuration % 60;
    const timestamp = `${minutes}:${seconds}`;
    return timestamp;
}