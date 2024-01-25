'use client'
import { useEffect, useState } from "react";
import { getMatchHistory } from '@app/api/userProps';
import { getMatchHistoryDetails } from '@app/api/userProps';

export function useFetchMatchHistoryData(user, region) {
    const [matchHistory, setMatchHistoryData] = useState(null);
    const [matchHistoryDetails, setMatchHistoryDetailsData] = useState(null);

    // Fetch match history
    useEffect(() => {
        async function fetchMatchHistory() {
            const matchHistoryData = await getMatchHistory(user.puuid, region);
            setMatchHistoryData(matchHistoryData);
        }
        fetchMatchHistory();
    }, [region, user.puuid]);

    // Fetch match history details once match history is available
    useEffect(() => {
        async function fetchMatchHistoryDetails() {
            if (matchHistory && matchHistory.length > 0) {
                const promises = matchHistory.map(matchId =>
                    getMatchHistoryDetails(matchId, region)
                );
                const allMatchDetails = await Promise.all(promises);
                console.log(allMatchDetails); // This will be an array of details for each match
                setMatchHistoryDetailsData(allMatchDetails);
            }
        }
        fetchMatchHistoryDetails();
    }, [matchHistory, region]);


    return { matchHistory, matchHistoryDetails };
}
