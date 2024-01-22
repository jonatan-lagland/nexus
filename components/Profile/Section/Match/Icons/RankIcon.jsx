'use client'
import Image from "next/image"

const RankIcon = ({ icon }) => {
    return (
        <>
            <Image
                src={`/assets/icons/stats/icon_${icon}.png`}
                alt={`${icon} Icon`}
                width={64}
                height={64}
                className="select-none"
            />
        </>
    )
}

export default RankIcon