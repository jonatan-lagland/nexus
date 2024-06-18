'use client'

import Player from "./Player";
import React from 'react';

function TeamsComponent({ participants, gameMode }) {
    let blueTeam = [];
    let redTeam = [];

    if (gameMode === "CLASSIC" || gameMode === "ARAM" || gameMode === "URF") {
        blueTeam = participants.slice(0, 5);
        redTeam = participants.slice(5);

        /* Append index to puuid because bots all have the same id */
        return (
            <div className='team'>
                <div>
                    {blueTeam.map((player, i) => (
                        <div key={player.puuid + i}>
                            <Player player={player}></Player>
                        </div>
                    ))}
                </div>
                <div>
                    {redTeam.map((player, i) => (
                        <div key={player.puuid + i}>
                            <Player player={player}></Player>
                        </div>
                    ))}
                </div>
            </div>
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
            .sort(([placementA], [placementB]) => placementA - placementB)
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
                    return 'bg-slate-900 text-zinc-600 ';
            }
        };

        const topTeams = sortedTeams.slice(0, 5);

        return (
            <div className="px-1">
                {topTeams.map((team, index) => (
                    <div key={index} className={`flex flex-row items-center `}>
                        <div className="pe-4">
                            <div className={`font-abel ${getBgClass(team[0].subteamPlacement)} border border-black rounded-sm   font-semibold px-2 text-xs flex items-center justify-center`}>
                                {team[0].subteamPlacement}
                            </div>
                        </div>
                        {team.map((player) => (
                            <Player key={player.puuid} player={player} />
                        ))}
                    </div>
                ))}
            </div>
        );

    }

    return null;

}

const Teams = React.memo(TeamsComponent, (prevProps, nextProps) => {
    // Return true if nextProps would render the same result as prevProps
    return prevProps.participants === nextProps.participants && prevProps.gameMode === nextProps.gameMode;
});

export default Teams;

