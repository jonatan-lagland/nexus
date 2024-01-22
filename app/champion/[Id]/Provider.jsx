"use client";
import { useState, useEffect } from "react";
import { getChampionProps } from "@app/api/championProps";
import { ChampionContext } from "@utils/context/championContext";
import { useChampionData } from "@utils/championUtils";

function Provider({ children, params }) {
    const [championData, setChampionData] = useState(null);
    const filteredData = useChampionData(championData);

    useEffect(() => {
        getChampionProps(params)
            .then(data => {
                setChampionData(data);
            })
    }, [params]);


    return (
        <ChampionContext.Provider value={filteredData}>
            {children}
        </ChampionContext.Provider>
    )
}

export default Provider