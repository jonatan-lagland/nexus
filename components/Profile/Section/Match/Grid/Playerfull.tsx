'use client'

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { usePathPlayer } from "@utils/pathUtils";
import { useContext } from "react";
import { SummonerSpellContext } from "@utils/context/summonerSpellContext";
import { useSummonerSpellData } from "@utils/spellUtils";
import { RuneDataContext } from "@utils/context/runeDataContext";
import { useRuneData } from "@utils/spellUtils";
import { useRunePathData } from "@utils/spellUtils";
import ChampionIcon from "../Icons/ChampionIcon";
import SummonerSpell from "../Icons/SummonerSpell";
import Rune from "../Icons/Rune";
import RunePath from "../Icons/RunePath";
import { ItemDataContext } from "@utils/context/itemDataContext";
import { useItemData } from "@utils/itemUtils";
import Items from "../../Items";
import Stats from "../Icons/Stats";
import { KillParticipationEmblem } from "@components/ui/killParticipationEmblem";

const Playerfull = ({ player, playerScores }) => {
    const pathname = usePathname();
    const playerPath = usePathPlayer(pathname, player.riotIdGameName, player.riotIdTagline);
    const playerName = player.riotIdGameName ? player.riotIdGameName : player.summonerName
    const completeListOfSummonerSpells = useContext(SummonerSpellContext)
    const spell1Id = player.spell1Id ? player.spell1Id : player.summoner1Id
    const spell2Id = player.spell2Id ? player.spell2Id : player.summoner2Id
    const summonerSpell1 = useSummonerSpellData(spell1Id, completeListOfSummonerSpells) // Convert Summoner Spell ID into a Summoner Spell description
    const summonerSpell2 = useSummonerSpellData(spell2Id, completeListOfSummonerSpells) // Convert Summoner Spell ID into a Summoner Spell description
    const completeListOfRunes = useContext(RuneDataContext); // Complete list of runes in the game
    const keystoneId = player.perks.styles[0].style; // Get the Id of a player's Keystone
    const keystone = useRuneData(keystoneId, completeListOfRunes); // Convert player keystone ID into a keystone description
    const runePathId = player.perks.styles[1].style; // Get the Id of a player's Rune Path
    const runePath = useRunePathData(runePathId, completeListOfRunes) // Convert Rune Path ID into a Rune Path description
    const completeListOfItems = useContext(ItemDataContext) // Complete list of items in the game
    const itemList = [player.item0, player.item1, player.item2, player.item3, player.item4, player.item5, player.item6]
    const items = useItemData(itemList, completeListOfItems); // Convert player item ID's into item descriptions
    const currentPlayerScore = playerScores.find(playerScore => playerScore.puuid === player.puuid);
    const mainPlayer = playerScores.find(playerScore => playerScore.mainPlayer === true);
    const mainPlayerStyles = mainPlayer.puuid === player.puuid ? 'backdrop-brightness-150' : '';

    return (
        <tr className={`detailed-match items-center justify-center text-start ${mainPlayerStyles} px-1 lg:py-0`}>
            <td className="flex flex-row items-center justify-end lg:justify-start space-x-2 truncate ps-1">
                <ChampionIcon championId={player.championId} size={24} tooltipSide={'right'} ></ChampionIcon>
                <div className="flex flex-col justify-center items-center gap-1">
                    <SummonerSpell spell={summonerSpell1} size={18}></SummonerSpell>
                    <SummonerSpell spell={summonerSpell2} size={18}></SummonerSpell>
                </div>
                <div className='flex flex-col justify-center items-center gap-1'>
                    <Rune padding={0} rune={keystone} size={18}></Rune>
                    <RunePath padding={0} runePath={runePath} size={18}></RunePath>
                </div>
            </td>
            <td>
                {/* Conditionally render a link if player is a bot or hasn't played in years and thus has no Riot ID */}
                <div className="flex flex-row items-center justify-center lg:justify-start lg:max-w-[140px] text-xs truncate gap-2">
                    {player.riotIdGameName ?
                        <Link className={`text-zinc-300 hover:text-zinc-200 truncate`} href={`${playerPath}`}>{playerName}</Link>
                        :
                        <span className={`cursor-default text-zinc-300 hover:text-zinc-200 truncate`}>{playerName}{player.userNameAndTag === 'BOT' ? ' Bot' : null}</span>
                    }
                </div>
            </td>
            <td className="flex justify-center">
                <KillParticipationEmblem killParticipation={currentPlayerScore.killParticipation}></KillParticipationEmblem>
            </td>
            <td className="flex flex-row items-center justify-center">
                <Stats
                    fontSize="text-xs"
                    renderKda={false}
                    kills={player.kills}
                    deaths={player.deaths}
                    assists={player.assists}
                    kdaRatio={player.kdaRatio} />
            </td>

            <td className="flex flex-row justify-center lg:justify-end">
                <Items size={24} items={items} visionScore={player.visionScore}></Items>
            </td>

        </tr>
    );
};
export default Playerfull;