'use client'

import React from 'react'
import Image from 'next/image';
import { useSearchBarContext } from '@utils/searchBarContext';

function Header() {

    const AVATAR_WIDTH = 60;
    const AVATAR_HEIGHT = 60;
    const [selectedOption, setSelectedOption] = useSearchBarContext();

    return (
        <section className='p-8'>

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