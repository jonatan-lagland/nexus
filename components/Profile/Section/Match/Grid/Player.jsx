'use client'
import PlayerIcon from "../Icons/PlayerIcon";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { usePathPlayer } from "@utils/pathUtils";

const Player = ({ player }) => {
    const pathname = usePathname();
    const playerPath = usePathPlayer(pathname, player.riotIdGameName, player.riotIdTagline);
    const playerName = player.riotIdGameName ? player.riotIdGameName : player.summonerName;

    return (
        <div className='flex flex-row items-center text-start space-x-2'>
            <PlayerIcon puuid={player.puuid} championId={player.championId} championName={player.championName}></PlayerIcon>
            {/* Conditionally render a link if player is a bot or hasn't played in years and thus has no Riot ID */}
            {player.riotIdGameName && player.puuid !== 'BOT' ?
                <Link className={`text-zinc-300 hover:text-zinc-200 w-[80px] truncate font-abel text-base`} scroll={true} href={`${playerPath}`}>{playerName}</Link>
                :
                <span className={`cursor-default text-zinc-300 hover:text-zinc-200 w-[80px] truncate font-abel text-base`}>{playerName}</span>
            }
        </div>
    );
};
export default React.memo(Player);