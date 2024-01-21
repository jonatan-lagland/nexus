'use client'
import PlayerIcon from "../Icons/PlayerIcon";
import SummonerSpell from "../Icons/SummonerSpell";
import Rune from "../Icons/Rune";

const Player = ({ player, isFullDetail }) => {
    if (isFullDetail) {
        const isSmall = true;
        return (
            <div className='flex flex-row items-center space-x-1'>
                <PlayerIcon puuid={player.puuid} championName={player.championName}></PlayerIcon>
                <div className='flex flex-row space-x-1'>
                    <div className='space-y-1'>
                        <SummonerSpell styles={isSmall} spell="SummonerFlash"></SummonerSpell>
                        <SummonerSpell styles={isSmall} spell="SummonerTeleport"></SummonerSpell>
                    </div>
                    <div className='space-y-1'>
                        <Rune styles={isSmall} rune="SummonerFlash"></Rune>
                        <Rune styles={isSmall} rune="SummonerTeleport"></Rune>
                    </div>
                </div>
                <p className='font-abel text-lg text-zinc-300 truncate'>{player.riotIdGameName}</p>
            </div>
        );
    }

    return (
        <div className='flex flex-row items-center space-x-1'>
            <PlayerIcon puuid={player.puuid} championName={player.championName}></PlayerIcon>
            <p className='font-abel text-lg text-zinc-300 truncate'>{player.riotIdGameName}</p>
        </div>
    );
};
export default Player;