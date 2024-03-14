'use client'
import Image from "next/image";
import { useImagePathChampion } from "@utils/pathUtils";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    TooltipArrow
} from "@/components/ui/tooltip"
import { useChampionTrueNames } from "@utils/championUtils";

const PlayerIcon = ({ championId }) => {

    const championTrueName = useChampionTrueNames(championId);

    return (
        <div className="flex items-center">
            <TooltipProvider delayDuration={300} skipDelayDuration={300}>
                <Tooltip>
                    <TooltipTrigger>
                        <Image
                            src={useImagePathChampion(championId)}
                            alt={championTrueName}
                            width={24}
                            height={24}
                            quality={15}
                            className="bg-inherit backdrop-brightness-50 select-none"
                        />
                    </TooltipTrigger>
                    <TooltipContent side='left'>
                        <TooltipArrow />
                        <p>{championTrueName}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    )
}
export default PlayerIcon