'use client'

import { useState, useEffect } from 'react';
import React from 'react'
import Image from 'next/image';
import {
    useImgPathChampion,
} from '@utils/paths';

function Header(champion) {

    const AVATAR_WIDTH = 90;
    const AVATAR_HEIGHT = 90;
    const [imgPath, setImgPath] = useState("");
    useImgPathChampion(setImgPath);

    return (
        <section className='p-6'>
            {imgPath ? (
                <div className="flex flex-row items-start">
                    <Image
                        src={`${imgPath}/${champion.data.path}`}
                        alt={'icon'}
                        width={AVATAR_WIDTH}
                        height={AVATAR_HEIGHT}
                        className='object-contain'
                    />
                    <div className="flex flex-col justify-start ml-2">
                        <span className="title-profile-header block">{champion.data.name}</span>
                        <span className="subheader-profile-header block">{champion.data.title}</span>
                    </div>
                </div>
            ) : (
                <div className="loader mx-auto w-full max-w-2xl flex justify-center items-center"></div>
            )}
        </section>
    )
}

export default Header