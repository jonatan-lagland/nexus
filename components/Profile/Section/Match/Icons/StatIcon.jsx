'use client'
import Image from "next/image"

const StatIcon = ({ icon }) => {
    return (
        <>
            <Image
                src={`/assets/icons/stats/icon_${icon}.png`}
                alt={`${icon} Icon`}
                width={20}
                height={20}
            />
        </>
    )
}

export default StatIcon