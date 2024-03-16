'use client'

import DetailedPlayer from './DetailedPlayer';
import React from 'react';
import Bans from './Bans';

function LiveTeams({ rankedDetailsOfEveryPlayer, gameMode, bannedChampions }) {
    let blueTeam = [];
    let redTeam = [];

    if (gameMode === "CLASSIC" || gameMode === "ARAM" || gameMode === "URF") {
        blueTeam = rankedDetailsOfEveryPlayer.slice(0, 5);
        redTeam = rankedDetailsOfEveryPlayer.slice(5);

        /* Append index to puuid because bots all have the same id */
        return (
            <div className='flex flex-col gap-4 pt-5 md:pt-0'>
                <div className='flex flex-col gap-2'>
                    <div>
                        <Bans bannedChampions={bannedChampions} side={'blue'}></Bans>
                    </div>
                    <div className='divide-y divide-slate-950 border-s-4 border-s-indigo-600 border border-slate-950'>
                        {blueTeam.map((player, i) => (
                            <div className='px-1' key={player.puuid + i}>
                                <DetailedPlayer player={player}></DetailedPlayer>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <Bans bannedChampions={bannedChampions} side={'red'}></Bans>
                    <div className='divide-y divide-slate-950 border-s-4 border-s-red-700 border border-slate-950'>
                        {redTeam.map((player, i) => (
                            <div className='px-1' key={player.puuid + i}>
                                <DetailedPlayer player={player}></DetailedPlayer>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
    return null;
}

export default React.memo(LiveTeams);

