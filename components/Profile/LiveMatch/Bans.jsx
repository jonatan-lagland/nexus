'use client'

import React from 'react';
import ChampionIcon from '../Section/Match/Icons/ChampionIcon';
import { ShieldBan } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    TooltipArrow
} from "@/components/ui/tooltip"

function Bans({ bannedChampions, side }) {
    if (!bannedChampions) {
        return null;
    }

    const blueTeamBans = bannedChampions.slice(0, 5);
    const redTeamBans = bannedChampions.slice(5);
    return (
        <TooltipProvider delayDuration={300} skipDelayDuration={300}>
            <div className='flex flex-row justify-evenly px-8'>
                {side === 'blue' ?
                    <div className='flex flex-row gap-5 items-center'>
                        <div className='flex flex-row items-center gap-2'>
                            <Tooltip>
                                <TooltipTrigger>
                                    <ShieldBan color="#6b97ff" />
                                </TooltipTrigger>
                                <TooltipContent side='top'>
                                    <TooltipArrow />
                                    <span>Blue Team Bans</span>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                        <div className='flex flex-row gap-1'>
                            {blueTeamBans.map((ban) => (
                                <ChampionIcon
                                    key={ban.pickTurn}
                                    championId={ban.championId}
                                    size={24}
                                    quality={10}
                                    tooltipSide={'top'}
                                />
                            ))}
                        </div>
                    </div>
                    :
                    <div className='flex flex-row gap-5 items-center '>
                        <div className='flex flex-row items-center gap-2'>
                            <Tooltip>
                                <TooltipTrigger>
                                    <ShieldBan color="#d22841" />
                                </TooltipTrigger>
                                <TooltipContent side='top'>
                                    <TooltipArrow />
                                    <span>Red Team Bans</span>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                        <div className='flex flex-row gap-1'>
                            {redTeamBans.map((ban) => (
                                <ChampionIcon
                                    key={ban.pickTurn}
                                    championId={ban.championId}
                                    size={24}
                                    quality={10}
                                    tooltipSide={'top'}
                                />
                            ))}
                        </div>
                    </div>
                }
            </div>
        </TooltipProvider>
    );

}

export default React.memo(Bans);

