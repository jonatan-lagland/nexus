'use client'
import Image from "next/image";
import { useCalculateCsPerMinute, useCalculateGameDuration, useCalculateGoldInThousands } from "@utils/matchHistoryUtils";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    TooltipArrow
} from "@/components/ui/tooltip"


const ScoreStatistics = ({ totalMinionsKilled, neutralMinionsKilled, goldEarned, gameDuration }) => {
    const totalMinionScore = totalMinionsKilled + neutralMinionsKilled;
    const timestampGameDuration = useCalculateGameDuration(gameDuration)
    const minionsPerMinute = useCalculateCsPerMinute(totalMinionScore, gameDuration)
    const goldEarnedInThousands = useCalculateGoldInThousands(goldEarned)

    return (
        <div className='game-stats-container'>
            <TooltipProvider disableHoverableContent={true} delayDuration={0} skipDelayDuration={300}>
                <div className="flex flex-row space-x-2 items-center cursor-default">
                    <Image
                        src={`/assets/images/clock-icon-grey.png`}
                        alt={`Minion Icon`}
                        width={15}
                        height={15}
                        className="select-none object-scale-down"
                        style={{ filter: `brightness(2)`, width: 'auto' }}
                    />
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <p className={`text-zinc-400 hover:text-zinc-300 text-sm`}>{timestampGameDuration}</p>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Game Duration</p>
                            <TooltipArrow />
                        </TooltipContent>
                    </Tooltip>
                </div>
                <div className='flex flex-row space-x-2 items-center cursor-default'>
                    <Image
                        src={`/assets/icons/stats/icon_minions.png`}
                        alt={`Minion Icon`}
                        width={15}
                        height={15}
                        className="select-none object-scale-down"
                        style={{ filter: `brightness(1.1)`, width: 'auto' }}
                    />
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="flex flex-row gap-1 text-sm text-zinc-400 hover:text-zinc-300">
                                <p>{totalMinionScore}</p>
                                <p className={` text-zinc-500`}>({minionsPerMinute})</p>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <TooltipArrow />
                            <p className="italic text-zinc-400">Total / Per Minute</p>
                            <p>Minion Score</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
                <div className='flex flex-row space-x-2 items-center cursor-default'>
                    <Image
                        src={`/assets/icons/stats/icon_gold.png`}
                        alt={`Gold Icon`}
                        width={15}
                        height={15}
                        className="select-none object-scale-down"
                        style={{ filter: `brightness(1.1)`, width: 'auto' }}
                    />
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <p className={` text-zinc-400 hover:text-zinc-300 text-sm`}>{goldEarnedInThousands}</p>
                        </TooltipTrigger>
                        <TooltipContent>
                            <TooltipArrow />
                            <p>Total Gold Earned</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </TooltipProvider>
        </div>
    );
}

export default ScoreStatistics