'use client'

import React from 'react';
import ChampionIcon from '../Section/Match/Icons/ChampionIcon';

function Bans({ bannedChampions }) {
    if (!bannedChampions) {
        return null;
    }

    const blueTeamBans = bannedChampions.slice(0, 5);
    const redTeamBans = bannedChampions.slice(5);
    return (
        <div className="flex flex-row justify-around">
            <div className='flex flex-col items-center gap-1'>
                <span className='text-blue-200 text-sm'>Blue Team Bans</span>
                <div className='flex flex-row gap-1'>
                    {blueTeamBans.map((ban) => (
                        <ChampionIcon
                            key={ban.pickTurn}
                            championId={ban.championId}
                            size={24}
                            quality={10}
                        />
                    ))}
                </div>
            </div>
            <div className='flex flex-col items-center gap-1'>
                <span className='text-red-400 text-sm'>Red Team Bans</span>
                <div className='flex flex-row gap-1'>
                    {redTeamBans.map((ban) => (
                        <ChampionIcon
                            key={ban.pickTurn}
                            championId={ban.championId}
                            size={24}
                            quality={10}
                        />
                    ))}
                </div>
            </div>
        </div>
    );

}

export default React.memo(Bans);

