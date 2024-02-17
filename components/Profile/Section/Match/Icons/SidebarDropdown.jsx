'use client'
import Image from "next/image"
import { useContext } from "react";
import { ColorblindContext } from "@utils/context/colorBlindContext";
import { MatchHistoryContext } from "@utils/context/matchHistoryContext";

const SidebarDropdown = ({ isRemake }) => {

    const { isColorblindMode } = useContext(ColorblindContext);
    const { matchData } = useContext(MatchHistoryContext);
    const { win } = matchData;

    const imageFilterRole = isRemake ? 'bg-[#424B57]'
        : win
            ? (isColorblindMode ? 'bg-blue-900' : 'bg-green-900')
            : (isColorblindMode ? 'bg-wine' : 'bg-wine');

    return (
        <div
            className={`${imageFilterRole} min-w-full lg:min-h-full rounded-b-lg md:rounded-br-lg md:rounded-b-none flex items-center justify-center cursor-pointer`}>
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