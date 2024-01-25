'use client'
import PlayerIcon from "../Icons/PlayerIcon";
import Link from "next/link";
import { useContext } from "react";
import { ColorblindContext } from "@utils/context/colorBlindContext";
import { MatchHistoryContext } from "@utils/context/matchHistoryContext";
import { usePathname } from "next/navigation";
import { usePathPlayer } from "@utils/pathUtils";
const Player = ({ player }) => {
    const { isColorblindMode } = useContext(ColorblindContext);
    const { matchData } = useContext(MatchHistoryContext);
    const { win } = matchData;

    const playerNameTheme = win
        ? (isColorblindMode ? 'text-zinc-300' : 'text-zinc-300')
        : (isColorblindMode ? 'text-zinc-300' : 'text-zinc-300');

    const pathname = usePathname();
    const playerPath = usePathPlayer(pathname, player.riotIdGameName, player.riotIdTagline);

    return (
        <div className='flex flex-row items-center text-start space-x-2'>
            <PlayerIcon puuid={player.puuid} championName={player.championName}></PlayerIcon>
            <Link className={`${playerNameTheme} lg:w-[80px] truncate font-abel text-lg`} href={`${playerPath}`}>{player.riotIdGameName + ''}</Link>
        </div>
    );
};
export default Player;