'use client'

import { Progress } from '@components/ui/progress';
import { Tooltip, TooltipArrow, TooltipContent, TooltipProvider, TooltipTrigger } from '@components/ui/tooltip';
import React from 'react'

type DamageDealtProps = {
    totalDamageDealtToChampions: number
    highestDamageDealtTeam: number
}

const damagePercentage = (totalDamageDealtToChampions, highestDamageDealtTeam) => {
    if (highestDamageDealtTeam === 0) return 0;  // Avoid division by zero
    return (totalDamageDealtToChampions / highestDamageDealtTeam) * 100;
};

export default function DamageDealt({ totalDamageDealtToChampions, highestDamageDealtTeam }: DamageDealtProps) {
    const playerDamagePercentage = damagePercentage(totalDamageDealtToChampions, highestDamageDealtTeam);

    return (
        <TooltipProvider delayDuration={300} skipDelayDuration={0}>
            <Tooltip>
                <TooltipTrigger>
                    <div className="flex flex-col text-sm">
                        <span className={
                            playerDamagePercentage === 100
                                ? "text-neutral-300"
                                : "text-neutral-400"
                        }>
                            {totalDamageDealtToChampions}
                        </span>
                        <Progress
                            className={
                                playerDamagePercentage === 100
                                    ? "eliteWinrateBadge"
                                    : "moderateWinrateBadge"
                            }
                            value={playerDamagePercentage}
                        ></Progress>
                    </div>
                </TooltipTrigger>
                <TooltipContent side="top">
                    <div className={`flex flex-col gap-2 items-center text-neutral-400 text-sm`}>
                        <span>
                            Damage Dealt to Champions
                        </span>
                        <span>
                            {totalDamageDealtToChampions}
                        </span>
                    </div>
                    <TooltipArrow />
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
