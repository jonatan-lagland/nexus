'use client'

import DetailedPlayer from './DetailedPlayer';
import React from 'react';
import Bans from './Bans';

const TeamTableStandard = ({ teamName, teamColor, bannedChampions, team, borderColor }) => {
    return (
        <div className='flex flex-col gap-2'>
            <Bans bannedChampions={bannedChampions} side={teamColor}></Bans>
            <table>
                <thead className='live-match justify-center py-1 text-xs'>
                    <tr>
                        <th>
                            <span className={teamColor === 'blue' ? 'text-[#6a85ff]' : 'text-gray-200'}>{teamName}</span>
                        </th>
                        <th></th>
                        <th className='hidden lg:block'></th>
                        <th>
                            <span className='text-slate-400'>Rank</span>
                        </th>
                        <th>
                            <span className={teamColor === 'blue' ? 'text-slate-400' : 'text-slate-300'}>Ranked Winrate</span>
                        </th>
                    </tr>
                </thead>
                <tbody className={`border-s-4 ${borderColor}`}>
                    {team.map((player, i) => (
                        <DetailedPlayer key={player.puuid + i} player={player}></DetailedPlayer>
                    ))}
                </tbody>
            </table>
        </div>
    );

};

function LiveTeams({ rankedDetailsOfEveryPlayer, gameMode, bannedChampions }) {
    if (gameMode === "CLASSIC" || gameMode === "ARAM" || gameMode === "URF") {
        const blueTeam = rankedDetailsOfEveryPlayer.slice(0, 5);
        const redTeam = rankedDetailsOfEveryPlayer.slice(5);

        /* Append index to puuid because bots all have the same id */
        return (
            <div className='flex flex-col gap-4 pt-5 md:pt-0'>
                <TeamTableStandard
                    teamName="Blue team"
                    teamColor="blue"
                    bannedChampions={bannedChampions}
                    team={blueTeam}
                    borderColor="border-s-indigo-600"
                />
                <TeamTableStandard
                    teamName="Red team"
                    teamColor="red"
                    bannedChampions={bannedChampions}
                    team={redTeam}
                    borderColor="border-s-red-700"
                />
            </div>
        );
    }
    return null;
}

export default React.memo(LiveTeams);

