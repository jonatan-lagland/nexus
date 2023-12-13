import { useState, useEffect } from 'react';

export const useChampionData = (url) => {
    const [championData, setChampionData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const result = await response.json();
                console.log(result)
                const championsArray = useChampionsListArray(result.response);
                setChampionData(championsArray);
            } catch (err) {
                setError('Failed to fetch data.');
            }
        };

        fetchData();
    }, [url]);

    const useChampionsListArray = (data) => {
        if (!data || !data.data) {
            return [];
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

        console.log(obj[0])

        return obj[0];
    };


    return { championData, error };
};

export const useChampionList = () => {
    const [championList, setChampionList] = useState(null);
    const [error, setError] = useState(null);
    const url = `/api/data/champion`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const result = await response.json();
                const championsArray = createChampionsArray(result.response);
                setChampionList(championsArray);
            } catch (err) {
                setError('Failed to fetch data.');
            }
        };

        fetchData();
    }, []);

    const createChampionsArray = (data) => {
        if (!data || !data.data) {
            return [];
        }

        return Object.entries(data.data).map(([championId, championData]) => ({
            value: championId,
            label: championData.name,
        }));
    };


    return { championList, error };
};