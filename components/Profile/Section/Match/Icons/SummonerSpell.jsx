'use client'
import Image from "next/image"
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
import { useImagePathSummonerSpell } from "@utils/pathUtils"
import { useTooltipVisiblity } from "@utils/tooltipUtils"

const SummonerSpell = ({ spell, size }) => {
    const path = useImagePathSummonerSpell(spell.iconPath)
    const quality = size > 30 ? 75 : 10;
    const { showTooltip, setShowTooltip } = useTooltipVisiblity();

    if (!spell) {
        return null;
    }
    return (
        <TooltipProvider disableHoverableContent={true} delayDuration={300} skipDelayDuration={0}>
            <Tooltip open={showTooltip}>
                <TooltipTrigger asChild>
                    <span>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Image
                                    src={path}
                                    alt={`Summoner Spell ${spell.name}`}
                                    width={size}
                                    height={size}
                                    quality={quality}
                                    onClick={() => setShowTooltip(false)}
                                    onMouseEnter={() => setShowTooltip(true)}
                                    onMouseLeave={() => setShowTooltip(false)}
                                    className="border border-stone-950 rounded-sm select-none hover:cursor-pointer"
                                />
                            </PopoverTrigger>
                            <PopoverContent className="bg-black whitespace-break-spaces">
                                <div className='flex flex-row justify-between items-center text-base text-white mb-2'>
                                    <p className="font-bold text-crimson-grey">{spell.name}</p>
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
                        </Popover>
                    </span>
                </TooltipTrigger>
                <TooltipContent>
                    <TooltipArrow></TooltipArrow>
                    <div className=" text-center">
                        <p>{spell.name}</p>
                        <p className="italic text-zinc-400">Click to learn more</p>
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
export default SummonerSpell