'use client'

import { useState, useEffect } from 'react';
import React from 'react'
import Image from 'next/image';
import {
    useImgPathChampion,
} from '@utils/paths';

function Header({ data }) {

    const AVATAR_WIDTH = 90;
    const AVATAR_HEIGHT = 90;
    const imgPath = useImgPathChampion();

    if (!imgPath || !data) {
        return (
            <>
                <div className="loader-lg"></div>
            </>
        )
    }

    return (
        <section className='p-6'>
            <div className="flex flex-row items-start">
                <Image
                    src={`${imgPath}${data.path}`}
                    alt={'icon'}
                    width={AVATAR_WIDTH}
                    height={AVATAR_HEIGHT}
                    className='object-contain'
                />
                <div className="flex flex-col justify-start ml-2">
                    <span className="title-profile-header block">{data.name}</span>
                    <span className="subheader-profile-header block">{data.title}</span>
                </div>
            </div>
        </section>
    )
}

export default Header