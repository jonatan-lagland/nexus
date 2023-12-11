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
    }, [selectedOption]); // Include selectedOption in the dependency array if it's used inside useEffect

    return { championData, error };
};

/* Cleans up the user selection after component unmounts AKA when user leaves the champion profile page */

export const useSelectionReset = (setSelectedOption) => {
    useEffect(() => {
        return () => {
            setSelectedOption("");
        };
    }, [])
}