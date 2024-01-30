'use client'
import React from "react";
import { useItemData } from "@utils/itemUtils";
import ChampionIcon from "../Icons/ChampionIcon";
import SummonerSpell from "../Icons/SummonerSpell";
import Rune from "../Icons/Rune";
import Stats from "../Icons/Stats";
import Items from "../../Items";
import { ItemDataContext } from "@utils/context/itemDataContext";
import { RuneDataContext } from "@utils/context/runeDataContext";
import { useRuneData, useRunePathData } from "@utils/runeUtils";
import { useContext } from "react";
import RunePath from "../Icons/RunePath";

const PlayerStatisticsComponent = ({
    kills,
    deaths,
    assists,
    championName,
    champLevel,
    itemIdList,
    visionScore,
    perks
}) => {

    const style = { width: '32', height: '32' };
    const keystoneStyle = { width: '32', height: '32' };
    const runePathStyle = { width: '24', height: '24' };

    const completeListOfItems = useContext(ItemDataContext) // Complete list of items in the game
    const items = useItemData(itemIdList, completeListOfItems); // Convert player item ID's into item descriptions
    const completeListOfRunes = useContext(RuneDataContext); // Complete list of runes in the game
    const keystoneId = perks.styles[0].selections[0].perk; // Get the Id of a player's Keystone
    const keystone = useRuneData(keystoneId, completeListOfRunes); // Convert player keystone ID into a keystone description
    const runePathId = perks.styles[1].style; // Get the Id of a player's Rune Path
    const runePath = useRunePathData(runePathId, completeListOfRunes) // Convert Rune Path ID into a Rune Path description

    return (
        <div className='flex flex-col space-y-3 px-2'>
            <div className='flex flex-row items-center justify-center space-x-2'>
                <div className="relative">
                    <ChampionIcon championName={championName}></ChampionIcon>
                    <div className='champion-level-container'>
                        <span className="select-none">{champLevel}</span>
                    </div>
                </div>
                <div className='flex flex-row space-x-2'>
                    <div className='space-y-1'>
                        <SummonerSpell styles={style} spell="SummonerFlash"></SummonerSpell>
                        <SummonerSpell styles={style} spell="SummonerTeleport"></SummonerSpell>
                    </div>
                    <div className='flex flex-col justify-center items-center space-y-1'>
                        <Rune styles={keystoneStyle} rune={keystone}></Rune>
                        <RunePath styles={runePathStyle} rune={runePath}></RunePath>
                    </div>
                </div>
                <div className='flex flex-row justify-center'>
                    <div className='flex flex-col space-y-1 text-center'>
                        <Stats kills={kills} deaths={deaths} assists={assists} />
                    </div>
                </div>
            </div>
            <div className="space-x-2">
                <Items items={items} visionScore={visionScore}></Items>
            </div>
        </div>
    );
}

const PlayerStatistics = React.memo(PlayerStatisticsComponent, (prevProps, nextProps) => {
    // Return true if nextProps would render the same result as prevProps
    return prevProps.participants === nextProps.participants && prevProps.gameMode === nextProps.gameMode;
});

export default PlayerStatistics