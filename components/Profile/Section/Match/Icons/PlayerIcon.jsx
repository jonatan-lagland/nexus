'use client'
import Image from "next/image";
import { useItemHover } from "@utils/tooltipUtils";
import { useImagePathChampion } from "@utils/paths";

const PlayerIcon = ({ puuid, championName }) => {
    const { handleMouseHover, tooltipItemId, event } = useItemHover();
    return (
        <div
            style={{ width: '32px', height: '32px' }}
            className='border border-black object-none rounded-sm select-none'>
            <Image
                onMouseOver={handleMouseHover(puuid)}
                onMouseLeave={handleMouseHover(puuid)}
                src={useImagePathChampion(championName)}
                alt={championName}
                width={32}
                height={32}
                style={{ minWidth: '32px', minWidth: '32px' }}
            />
        </div>
    )
}
export default PlayerIcon