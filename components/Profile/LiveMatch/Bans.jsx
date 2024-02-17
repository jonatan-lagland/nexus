'use client'

import React from 'react';
import ChampionIcon from '../Section/Match/Icons/ChampionIcon';

function BansComponent({ bannedChampions }) {

    const blueTeamBans = bannedChampions.slice(0, 5);
    const redTeamBans = bannedChampions.slice(5);
    return (
        <div className="flex flex-row justify-between">
            <div className='flex flex-col items-center gap-1'>
                <span className='text-white'>Blue Team Bans</span>
                <div className='flex flex-row gap-1'>
                    {blueTeamBans.map((ban) => (
                        <ChampionIcon
                            key={ban.pickTurn}
                            championId={ban.championId}
                            size={24}
                            quality={10}
                            shape={'rounded-none'}
                        />
                    ))}
                </div>
            </div>
            <div className='flex flex-col items-center gap-1'>
                <span className='text-white'>Red Team Bans</span>
                <div className='flex flex-row gap-1'>
                    {redTeamBans.map((ban) => (
                        <ChampionIcon
                            key={ban.pickTurn}
                            championId={ban.championId}
                            size={24}
                            quality={10}
                            shape={'rounded-none'}
                        />
                    ))}
                </div>
            </div>
        </div>
    );

}

const Bans = React.memo(BansComponent, (prevProps, nextProps) => {
    // Return true if nextProps would render the same result as prevProps
    return prevProps.participants === nextProps.participants && prevProps.gameMode === nextProps.gameMode;
});

export default Bans;

