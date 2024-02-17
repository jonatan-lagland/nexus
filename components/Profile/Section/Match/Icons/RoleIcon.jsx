'use client'
import Image from "next/image"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    TooltipArrow
} from "@/components/ui/tooltip"

const RoleIcon = ({ role }) => {
    const roleStamp = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
    return (
        <TooltipProvider delayDuration={0} skipDelayDuration={300}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Image
                        src={`/assets/icons/roles/icon-position-banner-primary-${role}.png`}
                        alt={"Role Icon"}
                        width={24}
                        height={24}
                        className='object-contain select-none'
                        style={{ filter: 'brightness(1.3)' }}
                    />
                </TooltipTrigger>
                <TooltipContent>
                    <TooltipArrow />
                    <p className="italic text-zinc-400">Position</p>
                    <p>{roleStamp}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
export default RoleIcon