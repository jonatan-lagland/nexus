'use client'
import { useEffect, useState } from "react";
import { getMatchHistory } from '@app/api/userProps';
import { getMatchHistoryDetails } from '@app/api/userProps';

export function useFetchMatchHistoryData(user, region) {
    const [matchHistory, setMatchHistoryData] = useState(null);
    const [matchHistoryDetails, setMatchHistoryDetailsData] = useState(null);
    const [error, setError] = useState(null);

    // Fetch match history
    useEffect(() => {
        async function fetchMatchHistory() {
            try {
                const matchHistoryData = await getMatchHistory(user.puuid, region);
                setMatchHistoryData(matchHistoryData);
            } catch (error) {
                setError(error)
            }
        }
        fetchMatchHistory();
    }, [region, user.puuid]);

    // Fetch match history details once match history is available
    useEffect(() => {
        async function fetchMatchHistoryDetails() {
            if (matchHistory && matchHistory.length > 0) {
                try {
                    const promises = matchHistory.map(matchId =>
                        getMatchHistoryDetails(matchId, region)
                    );
                    const allMatchDetails = await Promise.all(promises);
                    setMatchHistoryDetailsData(allMatchDetails);
                } catch (error) {
                    setError(error)
                }
            }
        }
        fetchMatchHistoryDetails();
    }, [matchHistory, region]);

    return { matchHistory, matchHistoryDetails, error, setError };
}