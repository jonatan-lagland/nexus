'use client';

import Image from 'next/image';
import { useItemHover } from '@utils/tooltipUtils';
import { useImagePathChampion } from '@utils/pathUtils';

function ChampionIcon({ championName }) {
    const { handleMouseHover } = useItemHover();
    return (
        <div
            className='border-black border-4 rounded-full overflow-hidden select-none'
            onMouseOver={handleMouseHover(championName)}
            onMouseLeave={handleMouseHover(championName)}>
            <Image
                src={useImagePathChampion(championName)}
                alt={"Champion Icon"}
                width={80}
                height={80}
            />
        </div>
    )
}

export default ChampionIcon