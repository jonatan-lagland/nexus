'use client'
import Image from "next/image"
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
import { useImagePathSummonerSpell } from "@utils/pathUtils"

const SummonerSpell = ({ spell, size }) => {
    const path = useImagePathSummonerSpell(spell.iconPath)
    const quality = size > 30 ? 75 : 10;

    if (!spell) {
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
                                alt={`${spell.name}`}
                                width={size}
                                height={size}
                                quality={quality}
                                className="border border-stone-950 rounded-sm select-none hover:cursor-pointer"
                            />
                        </PopoverTrigger>
                    </TooltipTrigger>
                    <PopoverPortal>
                        <PopoverContent className="bg-black whitespace-break-spaces">
                            <div className='flex flex-row justify-between items-center text-base text-white mb-2'>
                                <span className="font-bold text-crimson-grey">{spell.name}</span>
                                <div className="flex flex-row gap-2">
                                    <Image
                                        src={`/assets/icons/stats/AbilityHaste.png`}
                                        alt={'Gold'}
                                        width={14}
                                        height={14}
                                        className="object-scale-down"
                                        style={{ width: 'auto' }}
                                    />
                                    <span className="text-sm line-clamp-2">{spell.cooldown}</span>
                                </div>
                            </div>
                            <p className="text-dark-dust italic text-sm">{spell.description}</p>
                        </PopoverContent>
                    </PopoverPortal>
                    <TooltipPortal>
                        <TooltipContent side="left">
                            <TooltipArrow></TooltipArrow>
                            <div className="flex flex-col">
                                <span>{spell.name}</span>
                                <span className="italic text-zinc-400">Click to learn more</span>
                            </div>
                        </TooltipContent>
                    </TooltipPortal>
                </Popover>
            </Tooltip>
        </TooltipProvider>
    )
}
export default SummonerSpell