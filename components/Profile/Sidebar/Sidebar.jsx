'use server'
import React from 'react'
import Image from 'next/image'

function Sidebar({ rankedDetails }) {

    const playerTier = rankedDetails[0] && rankedDetails[0].tier ? rankedDetails[0].tier : "unranked";
    const playerRank = rankedDetails[0] && rankedDetails[0].rank ? rankedDetails[0].rank : null;
    const leaguePoints = rankedDetails[0] && rankedDetails[0].leaguePoints ? rankedDetails[0].leaguePoints + " lp" : null;

    return (
        <section className="profile-grid-section bg-slate-500">
            <div className='flex flex-col justify-center items-center'>
                <div>
                    <Image
                        src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/images/${playerTier.toLowerCase()}.png`}
                        alt={`${playerTier} Emblem`}
                        height={120}
                        width={120}
                        priority
                        className='select-none'
                    >
                    </Image>
                </div>
                <div className='text-center text-blue-200 drop-shadow-md'>
                    <h1 className='text-2xl font-bebas'>{playerTier} {playerRank}</h1>
                    <h2 className='text-lg font-bebas'>{leaguePoints}</h2>
                </div>
            </div>
        </section>
    )
}

export default Sidebar