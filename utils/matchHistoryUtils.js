'use client'
import { useState, useEffect, useContext } from "react";
import { useItemData } from "./item";
import { ItemDataContext } from "./context/itemDataContext";

export function useCardDetails(matchHistoryDetails, puuid) {
    const { info } = matchHistoryDetails;
    const { gameEndTimestamp, gameDuration, gameMode, gameId, participants } = info;
    const timestampGameDuration = calculateGameDuration(gameDuration);
    const [timestampGameEnd, setTimestampGameEnd] = useState(null);
    const mainPlayer = participants.find(participant => participant.puuid === puuid);

    console.log(participants)

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
        win
    } = mainPlayer

    const completeListOfItems = useContext(ItemDataContext)
    const {
        item0,
        item1,
        item2,
        item3,
        item4,
        item5,
        item6 } = mainPlayer;

    const itemIdList = [item0, item1, item2, item3, item4, item5, item6];
    const items = useItemData(itemIdList, completeListOfItems);

    useEffect(() => {
        calculateGameEnd(gameEndTimestamp);
    }, []);

    function calculateGameEnd() {
        const currentTime = Date.now(); // Gets the current timestamp in milliseconds

        // Calculate the difference in milliseconds
        const timeDifference = currentTime - gameEndTimestamp;

        // Convert the time difference into a human-readable format
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            setTimestampGameEnd(`${days} days ago`);
        } else if (hours > 0) {
            setTimestampGameEnd(`${hours} hours ago`);
        } else if (minutes > 0) {
            setTimestampGameEnd(`${minutes} minutes ago`);
        } else {
            setTimestampGameEnd("Just now");
        }
    }

    function calculateGameDuration() {
        const minutes = Math.floor(gameDuration / 60);
        const seconds = gameDuration % 60;
        const timestamp = `${minutes}:${seconds}`;
        return timestamp;
    }
    return {
        timestampGameEnd,
        timestampGameDuration,
        individualPosition,
        kills,
        deaths,
        assists,
        totalMinionsKilled,
        visionScore,
        goldEarned,
        champLevel,
        championName,
        items,
        participants,
        gameMode,
        win
    }
}