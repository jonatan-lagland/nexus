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

const Rune = ({ rune, size, padding }) => {
    const path = useImagePathRune(rune)
    // Note: In some cases runes aren't used, e.g. QuickPlay or Arena.
    // In such scenarios, skip rendering altogether
    if (!rune) {
        return null;
    }

    return (

        <TooltipProvider disableHoverableContent={true} delayDuration={300} skipDelayDuration={300}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div>
                        <Image
                            src={path}
                            alt={rune.name || 'Keystone'}
                            width={size}
                            height={size}
                            className={`bg-inherit backdrop-brightness-[0.4] border border-stone-950 p-[${padding}px] rounded-full select-none`}
                        />
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <div className="max-w-[200px]">
                        <p className='font-bold text-base text-crimson-grey mb-2'>{rune.name}</p>
                        <p className="text-dark-dust italic text-sm">{rune.shortDesc}</p>
                    </div>
                    <TooltipArrow />
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
export default Rune