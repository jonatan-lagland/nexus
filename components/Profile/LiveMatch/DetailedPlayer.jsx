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
import Image from "next/image";
import { RuneDataContext } from "@utils/context/runeDataContext";
import { useRuneData } from "@utils/spellUtils";
import { useRunePathData } from "@utils/spellUtils";
import Rune from "../Section/Match/Icons/Rune";
import RunePath from "../Section/Match/Icons/RunePath";
import { Progress } from "@/components/ui/progress"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

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
    const tier = rankedSoloDetails && rankedSoloDetails.tier ? rankedSoloDetails.tier : 'Unranked';
    const formattedTier = tier && tier.charAt(0).toUpperCase() + tier.slice(1).toLowerCase();
    const rank = rankedSoloDetails && rankedSoloDetails.rank ? rankedSoloDetails.rank : null;
    const leaguePoints = rankedSoloDetails && rankedSoloDetails.leaguePoints ? rankedSoloDetails.leaguePoints : 0;
    const wins = rankedSoloDetails ? rankedSoloDetails.wins : null;
    const losses = rankedSoloDetails ? rankedSoloDetails.losses : null;
    const winrate = (wins + losses === 0) ? 0 : (wins === 0 ? 0 : (losses === 0 ? 100 : Math.floor(wins / (wins + losses) * 100)));
    const totalGames = wins || losses ? wins + losses : 0;
    const winrateColor = winrate && winrate >= 70 ? 'eliteWinrateBadge' : winrate >= 60 ? 'impressiveWinrateBadge' : winrate >= 50 ? 'moderateWinrateBadge' : 'defaultWinrateBadge';
    const winrateText = winrate && winrate >= 70 ? 'text-[#f5b75b]' : winrate >= 60 ? 'text-[#ad96ff]' : winrate >= 50 ? 'text-[#78a7ff]' : 'text-slate-400';

    useEffect(() => {
        if (player.userNameAndTag.gameName) {
            setPlayerName(player.userNameAndTag.gameName)
        } else {
            setPlayerName(player.summonerName)
        }
    }, [player]);

    return (
        <div className='live-match items-center justify-center text-start bg-inherit gap-1'>
            <div className="flex flex-row items-center space-x-2 truncate">
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
                <div className="flex flex-row items-center justify-start truncate gap-2 max-w-[50px] md:max-w-[70px] lg:max-w-[120px]">
                    {player.userNameAndTag.gameName ?
                        <Link className={`text-zinc-300 hover:text-zinc-200 truncate text-xs font-abel lg:text-base`} href={`${playerPath}`}>{playerName}</Link>
                        :
                        <span className={`cursor-default text-zinc-300 hover:text-zinc-200 truncate font-abel text-base`}>{playerName}{player.userNameAndTag === 'BOT' ? ' Bot' : null}</span>
                    }

                </div>
            </div>
            <div className="flex flex-row items-center justify-start gap-3 text-xs truncate">
                {tier ?
                    <Popover>
                        <PopoverTrigger>
                            <Image
                                src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-mini-crests/${tier.toLowerCase()}.svg`}
                                alt={`${tier} Emblem`}
                                height={20}
                                width={20}
                                quality={15}
                                className='select-none'
                            >
                            </Image>
                        </PopoverTrigger>
                        <PopoverContent className="w-[100px] text-center bg-black p-2 text-white text-sm">
                            <span className=" font-bold text-white">{formattedTier} {tier && tier !== 'MASTER' && tier !== 'GRANDMASTER' && tier !== 'CHALLENGER' ? rank : null} </span> {tier && tier == 'Unranked' ? null : <span className="text-slate-400"> {leaguePoints} lp </span>}
                        </PopoverContent>
                    </Popover>
                    : null}
                <span className="text-slate-300 truncate hidden md:block">{formattedTier} {tier && tier !== 'MASTER' && tier !== 'GRANDMASTER' && tier !== 'CHALLENGER' ? rank : null} {tier && tier == 'Unranked' ? null : <span> {leaguePoints} lp </span>}</span>
            </div>
            <div className="flex flex-col text-center justify-center items-center gap-1 px-2 text-xs">
                {totalGames ?
                    <>
                        <span className="text-slate-300">
                            <span className={`${winrateText} font-semibold`}>{winrate} % </span>
                            ({totalGames} Total)
                        </span>
                        <Progress className={`${winrateColor}`} value={winrate} />
                    </>
                    : <span className="text-white">-</span>}
            </div>
        </div>
    );
};
export default React.memo(DetailedPlayer);