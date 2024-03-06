'use client';
import Image from 'next/image';
import { useImagePathChampion } from '@utils/pathUtils';
import { useChampionTrueNames } from '@utils/championUtils';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    TooltipArrow
} from "@/components/ui/tooltip"

function ChampionIcon({ championId, size, shape }) {
    const championTrueName = useChampionTrueNames(championId);
    const src = useImagePathChampion(championId)
    const zoomedInSize = size + 10;
    const quality = size > 70 ? 100 : 50;

    return (
        <>
            {championTrueName ? (
                // Conditionally render a tooltip if champion exists
                <TooltipProvider disableHoverableContent={true} delayDuration={300} skipDelayDuration={300}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <span>
                                <div className={`flex h-[${size}px] w-[${size}px] overflow-hidden ${shape} items-center border-2 border-neutral-900`}>
                                    <Image
                                        src={src}
                                        alt={"Champion Icon"}
                                        width={size}
                                        height={size}
                                        quality={quality}
                                        priority
                                        className={`h-[${zoomedInSize}px] w-[${zoomedInSize}px] object-cover select-none`}
                                        style={{ objectPosition: 'center center' }}
                                    />
                                </div>
                            </span>
                        </TooltipTrigger>
                        <TooltipContent side='left'>
                            <TooltipArrow />
                            <p>{championTrueName}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ) : (
                <div className={`flex h-[${size}px] w-[${size}px] overflow-hidden ${shape} items-center border-2 border-neutral-900`}>
                    <Image
                        src={src}
                        alt={"Champion Icon"}
                        width={size}
                        height={size} // 80
                        quality={quality}
                        priority
                        className={`h-[${zoomedInSize}px] w-[${zoomedInSize}px] object-cover select-none`}
                        style={{ objectPosition: 'center center' }}
                    />
                </div>
            )}
        </>
    )
}

export default ChampionIcon