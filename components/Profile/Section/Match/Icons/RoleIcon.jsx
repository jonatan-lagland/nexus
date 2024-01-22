'use client'
import Image from "next/image"
import { useContext } from "react";
import { ColorblindContext } from "@utils/context/colorBlindContext";
import { MatchHistoryContext } from "@utils/context/matchHistoryContext";

const RoleIcon = ({ role }) => {
    const { isColorblindMode } = useContext(ColorblindContext);
    const { matchData } = useContext(MatchHistoryContext);
    const { win } = matchData;

    const imageFilterRole = win
        ? (isColorblindMode ? 'brightness(2)' : 'brightness(2)')
        : (isColorblindMode ? 'brightness(2)' : 'brightness(2)');

    return (
        <>
            <Image
                src={`/assets/icons/roles/icon-position-banner-primary-${role}.png`}
                alt={"Role Icon"}
                width={36}
                height={36}
                className='object-contain select-none'
                style={{ filter: `${imageFilterRole}` }}
            />
        </>
    )
}
export default RoleIcon