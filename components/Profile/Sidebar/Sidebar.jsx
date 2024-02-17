'use server'
import React from 'react'
import Image from 'next/image'

function Sidebar({ rankedDetails }) {
    const playerTier = rankedDetails[0] && rankedDetails[0].tier ? rankedDetails[0].tier : "Unranked";
    const playerRank = rankedDetails[0] && rankedDetails[0].rank ? rankedDetails[0].rank : null;
    const leaguePoints = rankedDetails[0] && rankedDetails[0].leaguePoints ? rankedDetails[0].leaguePoints + " lp" : rankedDetails[0] && rankedDetails[0].tier ? "0 lp" : null;
    const wins = rankedDetails[0] && rankedDetails[0].wins ? rankedDetails[0].wins : 0;
    const losses = rankedDetails[0] && rankedDetails[0].losses ? rankedDetails[0].losses : 0;

    return (
        <section className="">
            <div className='flex flex-col bg-deep-purple border border-gray-600 rounded-lg py-8 px-16'>
                <div className='flex flex-row justify-between items-center'>
                    <div style={{ textShadow: "1px 1px 1px black" }} className='flex flex-col drop-shadow-md '>
                        <span className='text-2xl lg:text-3xl font-bold text-white'>{playerTier} {playerRank}</span>
                        <span className='text-lg lg:text-xl text-gray-400'>{leaguePoints}</span>
                    </div>
                    <div className='flex flex-col items-center'>
                        <Image
                            src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/images/${playerTier.toLowerCase()}.png`}
                            alt={`${playerTier} Emblem`}
                            height={128}
                            width={128}
                            quality={100}
                            priority
                            className='select-none'
                        >
                        </Image>
                        <div style={{ textShadow: "1px 1px 1px black" }} className='flex flex-row gap-3 text-gray-400'>
                            <span>Wins <span className=' font-semibold text-gray-300'>{wins}</span></span>
                            <span>Losses <span className=' font-semibold text-gray-300'>{losses}</span></span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Sidebar