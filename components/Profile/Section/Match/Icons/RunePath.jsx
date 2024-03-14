'use client'
import Image from "next/image"
import { useImagePathRune } from "@utils/pathUtils"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    TooltipArrow
} from "@/components/ui/tooltip"

const RunePath = ({ runePath, size, padding }) => {
    const path = useImagePathRune(runePath)

    // Note: In some cases runes aren't used, e.g. QuickPlay or Arena.
    // In such scenarios, skip rendering altogether
    if (!runePath) {
        return null;
    }

    return (
        <TooltipProvider disableHoverableContent={true} delayDuration={300} skipDelayDuration={300}>
            <Tooltip>
                <TooltipTrigger>
                    <Image
                        src={path}
                        alt={runePath.name || 'Rune Path'}
                        width={size}
                        height={size}
                        className={`bg-inherit backdrop-brightness-[0.4] border border-stone-950 p-[${padding}px] rounded-full select-none`}
                    />
                </TooltipTrigger>
                <TooltipContent side="right">
                    <TooltipArrow />
                    <p>{runePath.name}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
export default RunePath