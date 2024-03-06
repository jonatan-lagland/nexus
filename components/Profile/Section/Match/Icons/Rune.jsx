'use client'
import Image from "next/image"
import { useImagePathRune } from "@utils/pathUtils"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
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
                    <span>
                        <Popover>
                            <PopoverTrigger asChild>
                                {/* Your image component goes here */}
                                <Image
                                    src={path}
                                    alt={rune.name || 'Rune Path'}
                                    width={size}
                                    height={size}
                                    className={`hover:cursor-pointer bg-inherit backdrop-brightness-[0.4] border border-stone-950 p-[${padding}px] rounded-full select-none`}
                                />
                            </PopoverTrigger>
                            <PopoverContent className=" bg-black whitespace-break-spaces">
                                <div>
                                    <p className='font-bold text-base text-crimson-grey mb-2'>{rune.name}</p>
                                    <p className="text-dark-dust italic text-sm">{rune.shortDesc}</p>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </span>
                </TooltipTrigger>
                <TooltipContent>
                    <TooltipArrow></TooltipArrow>
                    <div className=" text-center">
                        <p>{rune.name}</p>
                        <p className="italic text-zinc-400">Click to learn more</p>
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );

}
export default Rune