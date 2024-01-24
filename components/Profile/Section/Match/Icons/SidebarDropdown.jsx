'use client'
import Image from "next/image"
import { useContext } from "react";
import { ColorblindContext } from "@utils/context/colorBlindContext";
import { MatchHistoryContext } from "@utils/context/matchHistoryContext";

const SidebarDropdown = () => {

    const { isColorblindMode } = useContext(ColorblindContext);
    const { matchData } = useContext(MatchHistoryContext);
    const { win } = matchData;

    const imageFilterRole = win
        ? (isColorblindMode ? 'bg-green-900' : ' bg-blue-900')
        : (isColorblindMode ? 'bg-wine' : 'bg-wine');

    return (
        <div
            className={`${imageFilterRole} w-7 lg:min-h-full h-8 min-w-full flex items-center justify-center cursor-pointer`}>
            <Image
                src={'/assets/icons/dropdown.svg'}
                alt={'Dropdown Icon'}
                width={32}
                height={32}
            />
        </div>
    )
}
export default SidebarDropdown