'use client'
import React from "react";
import { useItemData } from "@utils/itemUtils";
import SummonerSpell from "../Icons/SummonerSpell";
import ChampionIcon from "../Icons/ChampionIcon";
import RunePath from "../Icons/RunePath";
import Rune from "../Icons/Rune";
import Stats from "../Icons/Stats";
import Items from "../../Items";
import { ItemDataContext } from "@utils/context/itemDataContext";
import { RuneDataContext } from "@utils/context/runeDataContext";
import { useRuneData, useRunePathData, useSummonerSpellData } from "@utils/spellUtils";
import { useContext } from "react";
import { SummonerSpellContext } from "@utils/context/summonerSpellContext";

const PlayerStatisticsComponent = ({
    kills,
    deaths,
    assists,
    kdaRatio,
    championId,
    champLevel,
    itemIdList,
    visionScore,
    perks,
    summoner1Id,
    summoner2Id
}) => {

    const completeListOfItems = useContext(ItemDataContext) // Complete list of items in the game
    const items = useItemData(itemIdList, completeListOfItems); // Convert player item ID's into item descriptions
    const completeListOfRunes = useContext(RuneDataContext); // Complete list of runes in the game
    const completeListOfSummonerSpells = useContext(SummonerSpellContext)
    const keystoneId = perks.styles[0].selections[0].perk; // Get the Id of a player's Keystone
    const keystone = useRuneData(keystoneId, completeListOfRunes); // Convert player keystone ID into a keystone description
    const runePathId = perks.styles[1].style; // Get the Id of a player's Rune Path
    const runePath = useRunePathData(runePathId, completeListOfRunes) // Convert Rune Path ID into a Rune Path description
    const summonerSpell1 = useSummonerSpellData(summoner1Id, completeListOfSummonerSpells) // Convert Summoner Spell ID into a Summoner Spell description
    const summonerSpell2 = useSummonerSpellData(summoner2Id, completeListOfSummonerSpells) // Convert Summoner Spell ID into a Summoner Spell description

    return (
        <div className='flex flex-col space-y-3 px-2'>
            <div className='flex flex-row items-center justify-between'>
                <div className="flex flex-row items-center gap-2">
                    <div className="relative">
                        <ChampionIcon championId={championId} size={80} shape={'rounded-full'}></ChampionIcon>
                        <div className='champion-level-container'>
                            <span className="select-none">{champLevel}</span>
                        </div>
                    </div>
                    <div className='flex flex-row space-x-2'>
                        <div className='space-y-1'>
                            <SummonerSpell spell={summonerSpell1} size={32}></SummonerSpell>
                            <SummonerSpell spell={summonerSpell2} size={32}></SummonerSpell>
                        </div>
                        <div className='flex flex-col justify-center items-center space-y-1'>
                            <Rune rune={keystone} size={32} padding={1}></Rune>
                            <RunePath runePath={runePath} size={32} padding={4}></RunePath>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col flex-grow justify-center items-center'>
                    <Stats kills={kills} deaths={deaths} assists={assists} kdaRatio={kdaRatio} />
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