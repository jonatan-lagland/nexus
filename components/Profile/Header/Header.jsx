'use client'
import React, { useContext } from 'react'
import Image from 'next/image';
import { useImagePathUser } from '@utils/pathUtils';
import { ColorblindContext } from '@utils/context/colorBlindContext';

function Header({ data, info }) {

    const AVATAR_WIDTH = 90;
    const AVATAR_HEIGHT = 90;

    const imgPath = useImagePathUser(info);
    const { isColorblindMode, toggleColorblindMode } = useContext(ColorblindContext);

    if (!data || !info) {
        return null;
    }

    return (
        <section className='p-2'>
            <div className="flex flex-row justify-between px-6 py-10">
                <div className="flex flex-row justify-start">
                    <Image
                        src={imgPath}
                        alt={'Summoner Icon'}
                        width={AVATAR_WIDTH}
                        height={AVATAR_HEIGHT}
                        className='object-contain'
                        priority
                    />
                    <div className="flex flex-col justify-start ml-2">
                        <span className="title-profile-header">{data.gameName}</span>
                        <span className="subheader-profile-header">#{data.tagLine}</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-row items-end justify-start">
                <div className='flex flex-col space-y-2 items-start'>
                    <span className="text-xl md:text-2xl font-oswald text-indigo-300">Accessibility Mode</span>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={isColorblindMode}
                            onChange={toggleColorblindMode}>
                        </input>
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>
        </section >
    )
}

export default Header