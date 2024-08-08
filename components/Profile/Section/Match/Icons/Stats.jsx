'use client'
import { useContext, useState, useEffect } from "react";
import { SettingsContext } from "@utils/context/settingsContext";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    TooltipArrow
} from "@/components/ui/tooltip"

const Stats = ({ kills, deaths, assists, kdaRatio, renderKda = true, fontSize = 'text-base' }) => {
    const { isColorblindMode } = useContext(SettingsContext);
    const [deathsTheme, setDeathsTheme] = useState('text-amber-500')

    useEffect(() => {
        const deathsTheme = isColorblindMode ? 'text-amber-500' : 'text-amber-500';
        setDeathsTheme(deathsTheme)
    }, [isColorblindMode]);

    return (
        <TooltipProvider delayDuration={300} skipDelayDuration={0}>
            <Tooltip>
                <TooltipTrigger>
                    <span className={`${fontSize} truncate`}>
                        <span className={`text-white`}>{kills}</span>
                        <span className={`text-slate-400`}> / </span>
                        <span className={`${deathsTheme}`}>{deaths}</span>
                        <span className={`text-slate-400`}> / </span>
                        <span className={`text-white`}>{assists}</span>
                    </span>
                </TooltipTrigger>
                <TooltipContent side="top">
                    <span className='text-zinc-400'>
                        <span className={`text-white`}>Kills</span>
                        <span> / </span>
                        <span className={`text-white`}>Deaths</span>
                        <span> / </span>
                        <span className={`text-white`}>Assists</span>
                    </span>
                    <TooltipArrow />
                </TooltipContent>
            </Tooltip>
            {renderKda ?
                <Tooltip>
                    <TooltipTrigger>
                        <span className={` text-neutral-400 text-sm`}>
                            <span>
                                {deaths === 0 ? 'Perfect KDA' : `${kdaRatio}:1`}
                            </span>
                        </span>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                        <div className="flex flex-col">
                            <span className='text-zinc-400'>KDA ratio</span>
                            <span className='text-zinc-400'>
                                <span className={`text-white`}>Kills</span>
                                <span> + </span>
                                <span className={`text-white`}>Assists</span>
                                <span> : </span>
                                <span className={`text-white`}>Deaths</span>
                            </span>
                        </div>
                        <TooltipArrow />
                    </TooltipContent>
                </Tooltip>
                : null}
        </TooltipProvider>
    );
}

export default Stats