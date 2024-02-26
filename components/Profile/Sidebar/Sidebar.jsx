'use server'
import React from 'react'
import Image from 'next/image'

function Sidebar({ rankedDetails }) {
    const rankedSoloDetails = rankedDetails && rankedDetails.find(detail => detail.queueType === "RANKED_SOLO_5x5");
    const playerTier = rankedSoloDetails && rankedSoloDetails.tier ? rankedSoloDetails.tier : "Unranked";
    const playerRank = rankedSoloDetails && rankedSoloDetails.rank ? rankedSoloDetails.rank : null;
    const leaguePoints = rankedSoloDetails && rankedSoloDetails.leaguePoints ? rankedSoloDetails.leaguePoints + " lp" : rankedSoloDetails && rankedSoloDetails.tier ? "0 lp" : null;
    const wins = rankedSoloDetails ? rankedSoloDetails.wins : null;
    const losses = rankedSoloDetails ? rankedSoloDetails.losses : null;

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