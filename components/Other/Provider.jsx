"use client";
import { useState, useEffect } from "react";
import { getChampionListProps } from "@app/api/championProps";
import { getItemProps } from "@app/api/itemProps";
import { ChampionListContext } from "@utils/context/championListContext";
import { ItemDataContext } from "@utils/context/itemDataContext";
import { useItemData } from "@utils/item";

function Provider({ children }) {
    const populateAP = ["223087", "223124", "3006", "3115", "223089", "223157"];
    const [championListData, setChampionListData] = useState(null);
    const [itemData, setItemData] = useState(null);
    const filteredItems = useItemData(populateAP, itemData);

    useEffect(() => {
        getChampionListProps()
            .then(data => {
                setChampionListData(data);
            })
        getItemProps()
            .then(data => {
                setItemData(data);
            })
    }, []);

    return (
        <ChampionListContext.Provider value={championListData}>
            <ItemDataContext.Provider value={filteredItems}>
                {children}
            </ItemDataContext.Provider>
        </ChampionListContext.Provider>
    )
}

export default Provider