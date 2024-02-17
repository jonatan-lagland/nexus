'use client'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    TooltipArrow
} from "@/components/ui/tooltip"
import Image from "next/image";
import { useImagePathUser } from "@utils/pathUtils";

export function ProfileAvatar({ userDetails }) {
    const imgPath = useImagePathUser(userDetails);
    return (
        <TooltipProvider delayDuration={0} skipDelayDuration={300}>
            <Image
                src={imgPath}
                alt={'Summoner Icon'}
                width={120}
                height={120}
                className='rounded-full border-4 border-slate-800 min-h-[75px] min-w-[75px]'
                quality={100}
                priority
            />
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className='absolute -bottom-1 left-1/2 transform -translate-x-1/2 cursor-default text-sm lg:text-base text-white bg-slate-900 border border-neutral-400 rounded-full px-3'>
                        {userDetails.summonerLevel}
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <TooltipArrow />
                    <p>Summoner Level</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}