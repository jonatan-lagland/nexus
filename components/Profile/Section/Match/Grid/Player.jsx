'use client'
import PlayerIcon from "../Icons/PlayerIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePathPlayer } from "@utils/pathUtils";
const Player = ({ player }) => {
    const pathname = usePathname();
    const playerPath = usePathPlayer(pathname, player.riotIdGameName, player.riotIdTagline);

    return (
        <div className='flex flex-row items-center text-start space-x-2'>
            <PlayerIcon puuid={player.puuid} championName={player.championName}></PlayerIcon>
            <Link className={` text-zinc-300 hover:text-zinc-200 lg:w-[80px] truncate font-abel text-lg`} href={`${playerPath}`}>{player.riotIdGameName + ''}</Link>
        </div>
    );
};
export default Player;