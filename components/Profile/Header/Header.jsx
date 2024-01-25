'use client'
import React, { useContext } from 'react'
import Image from 'next/image';
import { useImagePathUser } from '@utils/pathUtils';
import { ColorblindContext } from '@utils/context/colorBlindContext';

function Header({ user, userDetails }) {

    const AVATAR_WIDTH = 90;
    const AVATAR_HEIGHT = 90;

    const imgPath = useImagePathUser(userDetails);
    const { isColorblindMode, toggleColorblindMode } = useContext(ColorblindContext);

    if (!user || !userDetails) {
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
                        placeholder="blur"
                        blurDataURL="/assets/images/0.png"
                        priority
                    />
                    <div className="flex flex-col justify-start ml-2">
                        <h1 className="title-profile-header">{user.gameName}</h1>
                        <h2 className="subheader-profile-header">#{user.tagLine}</h2>
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
        </section >
    )
}

export default Header