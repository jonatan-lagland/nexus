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
    return null;
}

const Teams = React.memo(TeamsComponent, (prevProps, nextProps) => {
    // Return true if nextProps would render the same result as prevProps
    return prevProps.participants === nextProps.participants && prevProps.gameMode === nextProps.gameMode;
});

export default Teams;

