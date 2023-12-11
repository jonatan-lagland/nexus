import { useState, useEffect } from 'react';

export const useChampionData = (selectedOption) => {
    const [championData, setChampionData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/data/champion/${selectedOption}`);
                const result = await response.json();
                setChampionData(result.response);
            } catch (err) {
                setError('Failed to fetch data.');
            }
        };

        fetchData();
    }, [selectedOption]);

    return { championData, error };
};

export const useChampionList = () => {
    const [championList, setChampionList] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/data/champion`);
                const result = await response.json();
                const championsArray = createChampionsArray(result.response);
                console.log(championsArray)
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


/* Cleans up the user selection after component unmounts AKA when user leaves the champion profile page */

export const useSelectionReset = (setSelectedOption) => {
    useEffect(() => {
        return () => {
            setSelectedOption("");
        };
    }, [])
}