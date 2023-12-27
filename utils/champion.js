import { useState, useEffect } from 'react';
import { useImgPathChampion } from './paths';

export const useChampionData = (championName) => {
    const [championData, setChampionData] = useState(null);
    const [error, setError] = useState(null);
    const route = "/api/data/champion/";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${route}/${championName}`);
                if (!response.ok) {
                    const error = new Error('Network response failed');
                    error.status = response.status;
                    throw error;
                }
                const result = await response.json();
                setChampionData(processChampionData(result.response));
            } catch (err) {
                setError(err);
            }
        };

        if (championName) {
            fetchData();
        }
    }, [championName]);

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