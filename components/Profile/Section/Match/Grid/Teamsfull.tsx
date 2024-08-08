'use client'

import React from 'react';
import Playerfull from "./Playerfull";

function FullTeams({ participants, gameMode, matchData, containerClass, playerScores }) {
    let blueTeam = [];
    let redTeam = [];

    if (gameMode === "CLASSIC" || gameMode === "ARAM" || gameMode === "URF") {
        blueTeam = participants.slice(0, 5);
        redTeam = participants.slice(5);

        const blueTeamResult = blueTeam[0].win ? 'Victory' : 'Defeat'
        const blueTeamResultBg = blueTeam[0].win ? 'container-victory-colorblind' : 'container-defeat-colorblind'
        const blueTeamResultTitleColor = blueTeam[0].win ? 'text-blue-300/80' : 'text-red-500'

        const redTeamResult = redTeam[0].win ? 'Victory' : 'Defeat'
        const redTeamResultBg = redTeam[0].win ? 'container-victory-colorblind' : 'container-defeat-colorblind'
        const redTeamResultTitleColor = redTeam[0].win ? 'text-blue-300/80' : 'text-red-300/80'


        /* Append index to puuid because bots all have the same id */
        return (
            <table className={`flex flex-col bg-dark-grey-secondary border-[#2C2F42] border rounded-md`}>
                <div className={`${blueTeamResultBg} ${blueTeamResultTitleColor} py-3 px-1 rounded-t-md`} >
                    <tr className='detailed-match items-center justify-center text-start'>
                        <th></th>
                        <th>{blueTeamResult}</th>
                        <th>Kill Participation</th>
                        <th className='text-start'>K/D/A</th>
                        <th></th>
                    </tr>
                    {blueTeam.map((player, i) => (
                        <Playerfull key={player.puuid + i} player={player} playerScores={playerScores}></Playerfull>
                    ))}
                </div>
                <div className={`${redTeamResultBg} ${redTeamResultTitleColor} py-3 px-1 rounded-b-md`} >
                    <tr className='detailed-match items-center justify-center text-start'>
                        <th></th>
                        <th>{redTeamResult}</th>
                        <th>Kill Participation</th>
                        <th className='text-start'>K/D/A</th>
                        <th></th>
                    </tr>
                    {redTeam.map((player, i) => (
                        <div className=' ' key={player.puuid + i}>
                            <Playerfull player={player} playerScores={playerScores}></Playerfull>
                        </div>
                    ))}
                </div>
            </table>
        );
    }

    if (gameMode === "CHERRY") { // arena

        const teamsMap = {};

        // Group participants by subteamPlacement
        participants.forEach((player) => {
            if (!teamsMap[player.subteamPlacement]) {
                teamsMap[player.subteamPlacement] = [];
            }
            teamsMap[player.subteamPlacement].push(player);
        });

        // Convert the teamsMap to an array and sort by subteamPlacement
        const sortedTeams = Object.entries(teamsMap)
            .sort(([placementA], [placementB]) => Number(placementA) - Number(placementB))
            .map(([placement, team]) => team);


        const getBgClass = (placement) => {
            switch (placement) {
                case 1:
                    return 'badge-gold';
                case 2:
                    return 'badge-silver';
                case 3:
                    return 'badge-bronze';
                default:
                    return 'bg-slate-900 text-zinc-400 ';
            }
        };

        const topTeams = sortedTeams.slice(0, 5);

        return (
            <div className="px-1">
                {topTeams.map((team: any, index) => (
                    <div key={index} className={`flex flex-row items-center `}>
                        <div className="pe-4">
                            <div className={`font-abel ${getBgClass(team[0].subteamPlacement)} shadow rounded-sm text-white  font-medium px-2 text-xs flex items-center justify-center`}>
                                {team[0].subteamPlacement}
                            </div>
                        </div>
                        {team.map((player) => (
                            <Playerfull player={player} playerScores={playerScores}></Playerfull>
                        ))}
                    </div>
                ))}
            </div>
        );
    }
    return null;
}

export default FullTeams;

