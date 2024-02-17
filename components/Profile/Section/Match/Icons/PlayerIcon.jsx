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
        <TooltipProvider disableHoverableContent={true} delayDuration={300} skipDelayDuration={300}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Image
                        src={useImagePathChampion(championId)}
                        alt={championTrueName}
                        width={24}
                        height={24}
                        quality={15}
                        className="bg-inherit backdrop-brightness-50 w-[24px] h-[24px] select-none"
                    />
                </TooltipTrigger>
                <TooltipContent>
                    <TooltipArrow />
                    <p>{championTrueName}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>

    )
}
export default PlayerIcon