"use client";
import { useState, useEffect } from "react";
import { getChampionListProps } from "@app/api/championProps";
import { getItemProps } from "@app/api/itemProps";
import { ChampionListContext } from "@utils/context/championListContext";
import { ItemDataContext } from "@utils/context/itemDataContext";
import { ColorblindContext } from "@utils/context/colorBlindContext";
import { getLatestVersion } from "@app/api/latestVersion";
import { GameVersionContext } from "@utils/context/gameVersionContext";
import { getRuneProps } from "@app/api/runeProps";
import { RuneDataContext } from "@utils/context/runeDataContext";

function Provider({ children }) {

    const [championListData, setChampionListData] = useState(null);
    const [itemData, setItemData] = useState(null);
    const [runeData, setRuneData] = useState(null);
    const [gamePatch, setGamePatch] = useState(null);
    const [isColorblindMode, setIsColorblindMode] = useState(false);

    const toggleColorblindMode = () => {
        setIsColorblindMode(!isColorblindMode);
    };

    useEffect(() => {
        getChampionListProps()
            .then(data => {
                setChampionListData(data);
            })
        getItemProps()
            .then(data => {
                setItemData(data);
            })
        getRuneProps()
            .then(data => {
                setRuneData(data);
            })
        getLatestVersion()
            .then(data => {
                setGamePatch(data);
            })
    }, []);

    return (
        <ColorblindContext.Provider value={{ isColorblindMode, toggleColorblindMode }}>
            <GameVersionContext.Provider value={gamePatch}>
                <ChampionListContext.Provider value={championListData}>
                    <ItemDataContext.Provider value={itemData}>
                        <RuneDataContext.Provider value={runeData}>
                            {children}
                        </RuneDataContext.Provider>
                    </ItemDataContext.Provider>
                </ChampionListContext.Provider>
            </GameVersionContext.Provider>
        </ColorblindContext.Provider>
    )
}

export default Provider