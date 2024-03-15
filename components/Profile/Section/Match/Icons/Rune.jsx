'use client'
import Image from "next/image"
import { useImagePathRune } from "@utils/pathUtils"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
    PopoverPortal
} from "@/components/ui/popover"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    TooltipArrow,
    TooltipPortal
} from "@/components/ui/tooltip"

const Rune = ({ rune, size, padding }) => {
    const path = useImagePathRune(rune)
    // Note: In some cases runes aren't used, e.g. QuickPlay or Arena.
    // In such scenarios, skip rendering altogether

    if (!rune) {
        return null;
    }

    return (
        <TooltipProvider delayDuration={300} skipDelayDuration={300}>
            <Tooltip>
                <Popover>
                    <TooltipTrigger asChild>
                        <PopoverTrigger asChild>
                            <Image
                                src={path}
                                alt={rune.name || 'Rune Path'}
                                width={size}
                                height={size}
                                className={`hover:cursor-pointer bg-inherit backdrop-brightness-[0.4] border border-stone-950 p-[${padding}px] rounded-full select-none`}
                            />
                        </PopoverTrigger>
                    </TooltipTrigger>
                    <PopoverPortal>
                        <PopoverContent className=" bg-black whitespace-break-spaces">
                            <div>
                                <span className='font-bold text-base text-crimson-grey'>{rune.name}</span>
                                <p className="text-dark-dust italic text-sm">{rune.shortDesc}</p>
                            </div>
                        </PopoverContent>
                    </PopoverPortal>
                    <TooltipPortal>
                        <TooltipContent>
                            <TooltipArrow></TooltipArrow>
                            <div className="flex flex-col">
                                <span>{rune.name}</span>
                                <span className="italic text-zinc-400">Click to learn more</span>
                            </div>
                        </TooltipContent>
                    </TooltipPortal>
                </Popover>
            </Tooltip>
        </TooltipProvider>
    );

}
export default Rune