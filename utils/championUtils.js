'use client'
import { useState, useEffect } from 'react';
import { useImagePathChampion } from './pathUtils';
import { error400 } from './errors/errorResponses';
import { useContext, useMemo } from 'react';
import { ChampionListContext } from './context/championListContext';

// Turn fetched data into a readily readable object
export const useChampionData = (championProps) => {
    const [championData, setChampionData] = useState(null);

    useEffect(() => {
        if (championProps) {
            setChampionData(processChampionData(championProps));
        }
    }, [championProps]);

    const processChampionData = (championProps) => {
        try {
            return {
                id: championProps.id,
                name: championProps.name,
                title: championProps.title,
                path: championProps.image.full,
                group: championProps.image.group,
                tags: championProps.tags,
                partype: championProps.partype,
                info: championProps.info,
                stats: championProps.stats
            };
        } catch (e) {
            return error400
        }
    };
    return championData;
};

/* Loop through champion list and return champion name if champion key pairing is found */
export const useChampionTrueNames = (championKey) => {
    const championList = useContext(ChampionListContext);
    return useMemo(() => {
        const stringifiedKey = String(championKey);
        for (let champion in championList.data) {
            if (championList.data[champion].key === stringifiedKey) {
                return championList.data[champion].name;
            }
        }
        return null;
    }, [championKey, championList.data]);
}


export const useChampionList = (data) => {
    const [championList, setChampionList] = useState(null);
    const [error, setError] = useState(null);
    const handleImagePathChampion = useImagePathChampion();
    useEffect(() => {
        const populateDefault = [
            {
                "id": "0",
                "name": "Blue Minion Bruiser",
                'path': "public/assets/images/0.png"
            }
        ]
        try {
            const obj = Object.entries(data.data).map(([, championDetails]) => ({
                id: championDetails.id,
                name: championDetails.name,
                path: handleImagePathChampion(championDetails.image.full)
            }));
            setChampionList(obj);
        } catch (e) {
            setError(populateDefault);
        }
    }, [data, handleImagePathChampion]);

    return { championList, error };
};