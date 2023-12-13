import { useState, useEffect } from 'react';

export const useItemData = (items) => {
    const [itemData, setItemData] = useState(null);
    const url = `/api/data/item/`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const result = await response.json();
                console.log(result)
                //const championsArray = useChampionsListArray(result.response);
                //setChampionData(championsArray);
            } catch (err) {
                setError('Failed to fetch data.');
            }
        };

        fetchData();
    }, [url]);

    const useItemsListArray = (data) => {
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


    return { "1": "2" };
};