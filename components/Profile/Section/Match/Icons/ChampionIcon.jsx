'use client'
import Image from "next/image";
import { useItemHover } from "@utils/tooltipUtils";
import { useImagePathChampion } from "@utils/paths";

const ChampionIcon = ({ championName }) => {
    const { handleMouseHover, tooltipItemId, event } = useItemHover();
    return (
        <div
            style={{ width: '80px', height: '80px' }}
            className='border-black border-4 rounded-full overflow-hidden'
            onMouseOver={handleMouseHover(championName)}
            onMouseLeave={handleMouseHover(championName)}>
            <Image
                src={useImagePathChampion(championName)}
                alt={"Champion Icon"}
                width={120}
                height={120}
            />
        </div>
    )
}

export default ChampionIcon