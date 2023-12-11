'use client'

import { useState, useEffect } from 'react';
import React from 'react'
import Image from 'next/image';
import { useSearchBarContext } from '@utils/searchBarContext';
import { useChampionData, useSelectionReset } from '@utils/champion';

function Header() {

    const AVATAR_WIDTH = 60;
    const AVATAR_HEIGHT = 60;
    const [selectedOption, setSelectedOption] = useSearchBarContext();
    const { championData, error } = useChampionData(selectedOption);

    useSelectionReset(setSelectedOption);

    return (
        <section className='p-8'>

            {championData ? (
                <pre>{JSON.stringify(championData, null, 2)}</pre>
            ) : (
                <p>Loading...</p>
            )}

            <p>{selectedOption}</p>
            <Image
                src='/assets/images/1439.png'
                alt='logo'
                width={AVATAR_WIDTH}
                height={AVATAR_HEIGHT}
                className='object-contain'
            />

        </section>
    )
}

export default Header