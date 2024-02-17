'use client'

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { usePathPlayer } from "@utils/pathUtils";
import { useEffect, useState } from "react";
import ChampionIcon from "../Section/Match/Icons/ChampionIcon";
import SummonerSpell from "../Section/Match/Icons/SummonerSpell";
import { useContext } from "react";
import { SummonerSpellContext } from "@utils/context/summonerSpellContext";
import { useSummonerSpellData } from "@utils/spellUtils";
import { RankEmblem } from "@components/ui/rankemblem";
import { WinrateEmblem } from "@components/ui/winrateEmblem";
import { RuneDataContext } from "@utils/context/runeDataContext";
import { useRuneData } from "@utils/spellUtils";
import { useRunePathData } from "@utils/spellUtils";
import Rune from "../Section/Match/Icons/Rune";
import RunePath from "../Section/Match/Icons/RunePath";
const DetailedPlayer = ({ player }) => {
    const pathname = usePathname();
    const playerPath = usePathPlayer(pathname, player.userNameAndTag.gameName, player.userNameAndTag.tagLine);
    const [playerName, setPlayerName] = useState(null);
    const completeListOfSummonerSpells = useContext(SummonerSpellContext)
    const summonerSpell1 = useSummonerSpellData(player.spell1Id, completeListOfSummonerSpells) // Convert Summoner Spell ID into a Summoner Spell description
    const summonerSpell2 = useSummonerSpellData(player.spell2Id, completeListOfSummonerSpells) // Convert Summoner Spell ID into a Summoner Spell description
    const completeListOfRunes = useContext(RuneDataContext); // Complete list of runes in the game
    const keystoneId = player.perks.perkStyle; // Get the Id of a player's Keystone
    const keystone = useRuneData(keystoneId, completeListOfRunes); // Convert player keystone ID into a keystone description
    const runePathId = player.perks.perkSubStyle; // Get the Id of a player's Rune Path
    const runePath = useRunePathData(runePathId, completeListOfRunes) // Convert Rune Path ID into a Rune Path description
    const rankedSoloDetails = player.rankedInfo.find(detail => detail.queueType === "RANKED_SOLO_5x5");
    const tier = rankedSoloDetails && rankedSoloDetails.tier ? rankedSoloDetails.tier : null;
    const rank = rankedSoloDetails && rankedSoloDetails.rank ? rankedSoloDetails.rank : null;
    const leaguePoints = rankedSoloDetails && rankedSoloDetails.leaguePoints ? rankedSoloDetails.leaguePoints : 0;
    const wins = rankedSoloDetails ? rankedSoloDetails.wins : null;
    const losses = rankedSoloDetails ? rankedSoloDetails.losses : null;
    const winrate = (wins + losses === 0) ? null : (wins === 0 ? 0 : (losses === 0 ? 100 : Math.round(wins / (wins + losses) * 100)));
    //const totalGames = wins || losses ? wins + losses : null;

    useEffect(() => {
        if (player.userNameAndTag.gameName) {
            setPlayerName(player.userNameAndTag.gameName)
        } else {
            setPlayerName(player.summonerName)
        }
    }, [player]);

    return (
        <div className='live-match items-center justify-center text-start bg-gray-600 hover:bg-gray-500 p-1 gap-1'>
            <div className="flex flex-row items-center space-x-2">
                <ChampionIcon championId={player.championId} size={32} shape={'rounded-full'}></ChampionIcon>
                <div className="flex flex-col justify-center items-center gap-1">
                    <SummonerSpell spell={summonerSpell1} size={18}></SummonerSpell>
                    <SummonerSpell spell={summonerSpell2} size={18}></SummonerSpell>
                </div>
                <div className='flex flex-col justify-center items-center gap-1'>
                    <Rune rune={keystone} size={18}></Rune>
                    <RunePath runePath={runePath} size={18}></RunePath>
                </div>
                {/* Conditionally render a link if player is a bot or hasn't played in years and thus has no Riot ID */}
                <div className="flex flex-row items-center justify-center truncate gap-2">
                    <WinrateEmblem winrate={winrate}></WinrateEmblem>
                    {player.userNameAndTag.gameName ?
                        <Link className={`text-zinc-300 hover:text-zinc-200 truncate text-xs font-abel lg:text-base`} scroll={true} href={`${playerPath}`}>{playerName}</Link>
                        :
                        <span className={`cursor-default text-zinc-300 hover:text-zinc-200 truncate font-abel text-base`}>{playerName}{player.userNameAndTag === 'BOT' ? ' Bot' : null}</span>
                    }

                </div>
            </div>
            <div className="text-xs lg:text-base">
                <span className="text-white">{wins}</span>
            </div>
            <div className="flex items-center justify-center">
                <RankEmblem tier={tier} rank={rank} type={'playerRank'} size={'small'} leaguePoints={leaguePoints}></RankEmblem>
            </div>
        </div>
    );
};
export default React.memo(DetailedPlayer);