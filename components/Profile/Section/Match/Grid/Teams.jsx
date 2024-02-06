'use client'

import Player from "./Player";
import React from 'react';

function TeamsComponent({ participants, gameMode }) {
    let blueTeam = [];
    let redTeam = [];

    if (gameMode === "CLASSIC" || gameMode === "ARAM") {
        blueTeam = participants.slice(0, 5);
        redTeam = participants.slice(5);

        return (
            <div className='team'>
                <div>
                    {blueTeam.map((player) => (
                        <div key={player.puuid} className=''>
                            <Player player={player}></Player>
                        </div>
                    ))}
                </div>
                <div>
                    {redTeam.map((player) => (
                        <div key={player.puuid} className=''>
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

