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

export function ProfileAvatar({ userDetails, size, renderSummonerLevel = true }) {
    const imgPath = useImagePathUser(userDetails);
    return (
        <TooltipProvider delayDuration={0} skipDelayDuration={300}>
            <Image
                src={imgPath}
                alt={'Summoner Icon'}
                width={size}
                height={size}
                className='rounded-full select-none border-4 border-slate-800 min-h-[75px] min-w-[75px]'
                quality={100}
                priority
            />
            {renderSummonerLevel ?
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className='absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-sm lg:text-base text-white bg-slate-900 border border-neutral-400 rounded-full px-3'>
                            <span aria-label="summoner-level">{userDetails.summonerLevel}</span>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <TooltipArrow />
                        <p>Summoner Level</p>
                    </TooltipContent>
                </Tooltip>
                : null}
        </TooltipProvider>
    )
}