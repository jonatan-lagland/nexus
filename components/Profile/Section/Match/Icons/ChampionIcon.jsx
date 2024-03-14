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

function ChampionIcon({ championId, size }) {
    const championTrueName = useChampionTrueNames(championId);
    const src = useImagePathChampion(championId)
    const quality = size > 70 ? 100 : 50;

    return (
        <div className="flex items-center">
            {championTrueName ? (
                // Conditionally render a tooltip if champion exists
                <TooltipProvider delayDuration={300} skipDelayDuration={300}>
                    <Tooltip>
                        <TooltipTrigger>
                            <div className='rounded-full border border-black bg-slate-900'>
                                <Image
                                    src={src}
                                    alt={championTrueName}
                                    width={size}
                                    height={size}
                                    quality={quality}
                                    priority
                                    style={{ clipPath: "inset(5% 5% 5% 5% round 999px)" }}
                                />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent side='left'>
                            <TooltipArrow />
                            <p>{championTrueName}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ) : (
                /* Used in case there is no champion, e.g. when no champion is banned to avoid creating an unnecessary tooltip */
                <div className='rounded-full border border-black bg-slate-900'>
                    <Image
                        src={src}
                        alt={championTrueName}
                        width={size}
                        height={size}
                        quality={quality}
                        priority
                        style={{ clipPath: "inset(5% 5% 5% 5% round 999px)" }}
                    />
                </div>
            )}
        </div>
    )
}

export default ChampionIcon