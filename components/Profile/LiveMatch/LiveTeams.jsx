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
                    <table>
                        <thead className='live-match items-center justify-center bg-inherit gap-1 py-1 px-3 text-sm'>
                            <th>
                                <span className='text-[#6a85ff]'>Blue team</span>
                            </th>
                            <th>
                                <span className='text-slate-400'>Rank</span>
                            </th>
                            <th>
                                <span className='text-slate-400'>Ranked Winrate</span>
                            </th>
                        </thead>
                        {blueTeam.map((player, i) => (
                            <tbody className='border-s-4 border-s-indigo-600' key={player.puuid + i} >
                                <DetailedPlayer player={player}></DetailedPlayer>
                            </tbody>
                        ))}
                    </table>
                </div>
                <div className='flex flex-col gap-2'>
                    <Bans bannedChampions={bannedChampions} side={'red'}></Bans>
                    <table>
                        <thead className='live-match items-center justify-center bg-inherit gap-1 py-1 px-3 text-sm'>
                            <th>
                                <span className='text-[#ff5c5c]'>Red team</span>
                            </th>
                            <th>
                                <span className='text-slate-400'>Rank</span>
                            </th>
                            <th className='text-center'>
                                <span className='text-slate-400'>Ranked Winrate</span>
                            </th>
                        </thead>
                        {redTeam.map((player, i) => (
                            <tbody className='border-s-4 border-s-red-700' key={player.puuid + i} >
                                <DetailedPlayer player={player}></DetailedPlayer>
                            </tbody>
                        ))}
                    </table>
                </div>
            </div>
        );
    }
    return null;
}

export default React.memo(LiveTeams);

