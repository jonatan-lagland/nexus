'use client'

import React from 'react';
import Playerfull from "./Playerfull";

function FullTeams({ participants, gameMode, playerScores, isRemake }) {
    let blueTeam = [];
    let redTeam = [];

    if (gameMode === "CLASSIC" || gameMode === "ARAM" || gameMode === "URF") {
        blueTeam = participants.slice(0, 5);
        redTeam = participants.slice(5);

        const blueTeamResult = isRemake ? '' : blueTeam[0].win ? 'Victory' : 'Defeat'
        const blueTeamResultBg = isRemake ? 'container-remake-colorblind' : blueTeam[0].win ? 'container-victory-colorblind' : 'container-defeat-colorblind'
        const blueTeamResultTitleColor = isRemake ? 'text-white' : blueTeam[0].win ? 'text-blue-300/80' : 'text-red-500'

        const redTeamResult = isRemake ? '' : redTeam[0].win ? 'Victory' : 'Defeat'
        const redTeamResultBg = isRemake ? 'container-remake-colorblind' : redTeam[0].win ? 'container-victory-colorblind' : 'container-defeat-colorblind'
        const redTeamResultTitleColor = isRemake ? 'text-white' : redTeam[0].win ? 'text-blue-300/80' : 'text-red-300/80'

        /* Append index to puuid because bots all have the same id */
        return (
            <table className={`flex flex-col bg-dark-grey-secondary border-[#2C2F42] border rounded-md`}>
                <div className={`${blueTeamResultBg} ${blueTeamResultTitleColor} py-3 px-1 rounded-t-md`} >
                    <thead className='flex items-center justify-center text-start pb-2'>
                        <th>{blueTeamResult}</th>
                    </thead>
                    {blueTeam.map((player, i) => (
                        <Playerfull key={player.puuid + i} player={player} playerScores={playerScores}></Playerfull>
                    ))}
                </div>
                <div className={`${redTeamResultBg} ${redTeamResultTitleColor} py-3 px-1 rounded-b-md`} >
                    <thead className='flex items-center justify-center text-start pb-2'>
                        <th>{redTeamResult}</th>
                    </thead>
                    {redTeam.map((player, i) => (
                        <Playerfull key={player.puuid + i} player={player} playerScores={playerScores}></Playerfull>
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

