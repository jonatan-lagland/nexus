"use client";
import { useState, useEffect } from "react";
import { UserContext } from "@utils/context/userContext";
import { getUserInfo, getUserPUUID, getMatchHistory, getMatchHistoryDetails } from "@app/api/userProps";

function Provider({ children, params, region, server }) {
    const [userData, setUserData] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [matchHistory, setMatchHistory] = useState(null);
    const [matchHistoryDetails, setMatchHistoryDetails] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const userData = await getUserPUUID(params, region);
                setUserData(userData);
                const userInfo = await getUserInfo(userData.puuid, server);
                setUserInfo(userInfo);
                const matchHistory = await getMatchHistory(userData.puuid, region)
                setMatchHistory(matchHistory)
                const matchHistoryDetails = await getMatchHistoryDetails(matchHistory[0], region)
                setMatchHistoryDetails(matchHistoryDetails)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [params, region, server]);

    return (
        <UserContext.Provider value={{ userData, userInfo, matchHistory, matchHistoryDetails }}>
            {children}
        </UserContext.Provider>
    )
}

export default Provider