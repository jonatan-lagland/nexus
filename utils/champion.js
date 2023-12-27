import { useState, useEffect } from 'react';
import { useImgPathChampion } from './paths';

export const useChampionData = (championName, championList) => {
    const [championData, setChampionData] = useState(null);
    const [error, setError] = useState(null);


    // If the user's input (championName) and the list of champions both exist, attempt 3 steps to fetch appropriate champion data
    // 1. Check if user input matches the list of champions, meaning the champion exists
    // 2. Attempt to fetch data
    // 3. Turn data into digestable format for the client
    useEffect(() => {
        const fetchData = async () => {
            try {
                verifyChampionExists(championName, championList);
                const fetchedData = await attemptFetch(championName);
                const processedData = processChampionData(fetchedData.response);
                setChampionData(processedData);
            } catch (e) {
                setError(e);
            }
        };

        if (championName && championList) {
            fetchData();
        }
    }, [championList, championName]);


    // Make sure the URL matches wider championList context to avoid unnecessary API calls to incorrect endpoints
    const verifyChampionExists = (championName, championList) => {
        const isChampionValid = championList.some(champ => champ.name === championName);
        if (!isChampionValid) {
            const error = new Error(`We couldn't find your champion.`);
            error.status = 404;
            throw error;
        }
    }

    // Fetch champion data 
    const attemptFetch = async (championName) => {
        const route = "/api/data/champion/";
        const timeoutDuration = 7000; // 7 seconds

        // Throw a timeout error if data fetching hasn't been resolved within time limit
        const timeout = new Promise((_, reject) => {
            setTimeout(() => {
                const error = new Error('We were unable to resolve a response from Riot Games API. Please try again later.');
                error.status = 408; // HTTP status code for Request Timeout
                reject(error);
            }, timeoutDuration);
        });

        const fetchPromise = fetch(`${route}/${championName}`).then(response => {
            if (!response.ok) {
                const error = new Error(`Network response failed. Try again later.`);
                error.status = response.status;
                throw error;
            }
            return response.json();
        });

        return Promise.race([fetchPromise, timeout]);
    };


    // Turn fetched data into a readily readable object
    const processChampionData = (data) => {
        if (!data || !data.data) {
            return null;
        }
        const obj = Object.entries(data.data).map(([, championDetails]) => ({
            id: championDetails.id,
            name: championDetails.name,
            title: championDetails.title,
            path: championDetails.image.full,
            group: championDetails.image.group,
            tags: championDetails.tags,
            partype: championDetails.partype,
            info: championDetails.info,
            stats: championDetails.stats
        }));
        return obj[0];
    };

    return { championData, error };
};


export const useChampionList = () => {
    const [championList, setChampionList] = useState(null);
    const [error, setError] = useState(null);
    const url = `/api/data/champion`;
    const imgPath = useImgPathChampion();
    const populateDefault = [
        {
            "id": "0",
            "name": "Blue Minion Bruiser",
            'path': "public/assets/images/0.png"
        }
    ]

    useEffect(() => {
        const fetchData = async () => {

            const response = await fetch(url);
            const result = await response.json();
            const championsArray = createChampionsArray(result.response);
            if (championsArray) {
                setChampionList(championsArray);
            } else {
                setError(populateDefault);
            }
        };

        fetchData();
    }, []);

    const createChampionsArray = (data) => {
        if (!data || !data.data) {
            return null;
        }
        try {
            return Object.entries(data.data).map(([, championDetails]) => ({
                id: championDetails.id,
                name: championDetails.name,
                path: imgPath + championDetails.image.full
            }));
        } catch (e) {
            setError(populateDefault);
            return null;
        }
    };

    return { championList, error };
};