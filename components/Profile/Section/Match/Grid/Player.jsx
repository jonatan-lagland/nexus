'use client'
import PlayerIcon from "../Icons/PlayerIcon";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { usePathPlayer } from "@utils/pathUtils";
import { useEffect, useState } from "react";
const Player = ({ player }) => {
    const pathname = usePathname();
    const playerPath = usePathPlayer(pathname, player.riotIdGameName, player.riotIdTagline);
    const [playerName, setPlayerName] = useState("Loading...");

    useEffect(() => {
        if (player.riotIdGameName) {
            setPlayerName(player.riotIdGameName)
        } else {
            setPlayerName(player.summonerName)
        }
    }, [player]);

    return (
        <div className='flex flex-row items-center text-start space-x-2'>
            <PlayerIcon puuid={player.puuid} championName={player.championName}></PlayerIcon>
            <Link className={` text-zinc-300 hover:text-zinc-200 lg:w-[80px] truncate font-abel text-lg`} href={`${playerPath}`}>{playerName + ''}</Link>
        </div>
    );
};
export default React.memo(Player);