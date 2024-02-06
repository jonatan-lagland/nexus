'use client'
import React, { useContext } from 'react'
import { RankEmblem } from '@components/ui/rankemblem';
import Image from 'next/image';
import { useImagePathUser } from '@utils/pathUtils';
import { ColorblindContext } from '@utils/context/colorBlindContext';
import { MatchHistoryContext } from '@utils/context/matchHistoryContext';

function Header({ user, userDetails, rankedDetails, region }) {
    const imgPath = useImagePathUser(userDetails);
    const { isColorblindMode, toggleColorblindMode } = useContext(ColorblindContext);
    const { refreshMatchHistoryData } = useContext(MatchHistoryContext);

    return (
        <section className='px-3'>
            <div className="flex flex-row text-center px-6 py-3">
                <div className="flex flex-row gap-3 items-center">
                    <div className='relative'>
                        <Image
                            src={imgPath}
                            alt={'Summoner Icon'}
                            width={120}
                            height={120}
                            className='rounded-full border-4 border-slate-800 min-h-[75px] min-w-[75px]'
                            priority
                        />
                        <div className='absolute -bottom-3 left-1/2 transform -translate-x-1/2 text-white bg-slate-900 border border-neutral-400 rounded-full px-3'>
                            {userDetails.summonerLevel}
                        </div>
                    </div>
                    <div className='flex flex-col gap-5'>
                        <div className="flex flex-row flex-wrap items-end gap-3">
                            <h1 className="text-3xl lg:text-6xl font-bold font-oswald text-white">{user.gameName}</h1>
                            <h2 className="text-lg lg:text-3xl font-bold font-oswald text-viola">#{user.tagLine}</h2>
                        </div>
                        {
                            rankedDetails[0] && rankedDetails[0].tier && rankedDetails[0].rank &&
                            <RankEmblem tier={rankedDetails[0].tier} rank={rankedDetails[0].rank}></RankEmblem>
                        }

                    </div>
                </div>
            </div>
            <div className="flex flex-row items-end justify-start">
                <div className='flex flex-col space-y-2 items-start'>
                    <label className="text-xl md:text-2xl font-oswald text-indigo-300">Accessibility Mode</label>
                    <label label="Accessibility Switch" className="switch">
                        <input
                            type="checkbox"
                            checked={isColorblindMode}
                            onChange={toggleColorblindMode}>
                        </input>
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>
            <div>
                <button
                    onClick={() => refreshMatchHistoryData(user.puuid, region, true)}
                    className='bg-black text-white'>
                    Refresh
                </button>
            </div>
        </section >
    )
}

export default Header