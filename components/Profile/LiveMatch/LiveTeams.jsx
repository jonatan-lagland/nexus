'use client'

import DetailedPlayer from './DetailedPlayer';
import React from 'react';

function LiveTeamsComponent({ rankedDetailsOfEveryPlayer, gameMode }) {
    let blueTeam = [];
    let redTeam = [];

    if (gameMode === "CLASSIC" || gameMode === "ARAM" || gameMode === "URF") {
        blueTeam = rankedDetailsOfEveryPlayer.slice(0, 5);
        redTeam = rankedDetailsOfEveryPlayer.slice(5);

        /* Append index to puuid because bots all have the same id */
        return (
            <div className=''>
                <div className=''>
                    {blueTeam.map((player, i) => (
                        <div className='py-1' key={player.puuid + i}>
                            <DetailedPlayer player={player}></DetailedPlayer>
                        </div>
                    ))}
                </div>
                <div className=''>
                    {redTeam.map((player, i) => (
                        <div className='py-1' key={player.puuid + i}>
                            <DetailedPlayer player={player}></DetailedPlayer>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return null;
}

const LiveTeams = React.memo(LiveTeamsComponent, (prevProps, nextProps) => {
    // Return true if nextProps would render the same result as prevProps
    return prevProps.participants === nextProps.participants && prevProps.gameMode === nextProps.gameMode;
});

export default LiveTeams;

