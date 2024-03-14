'use client'
import { useContext, useState, useEffect } from "react";
import { ColorblindContext } from "@utils/context/colorBlindContext";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    TooltipArrow
} from "@/components/ui/tooltip"

const Stats = ({ kills, deaths, assists, kdaRatio }) => {
    const { isColorblindMode } = useContext(ColorblindContext);
    const [deathsTheme, setDeathsTheme] = useState('text-bright-red')

    useEffect(() => {
        const deathsTheme = isColorblindMode ? 'text-amber-500' : 'text-bright-red';
        setDeathsTheme(deathsTheme)
    }, [isColorblindMode]);

    return (
        <TooltipProvider disableHoverableContent={true} delayDuration={300} skipDelayDuration={0}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <span className='font-oswald truncate cursor-default'>
                        <span className={`text-white`}>{kills}</span>
                        <span className={`text-slate-400`}> / </span>
                        <span className={`${deathsTheme}`}>{deaths}</span>
                        <span className={`text-slate-400`}> / </span>
                        <span className={`text-white`}>{assists}</span>
                    </span>
                </TooltipTrigger>
                <TooltipContent>

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
            <Tooltip>
                <TooltipTrigger asChild>
                    <span className={` text-neutral-400 text-sm font-oswald cursor-default`}>
                        <span>
                            {deaths === 0 ? 'Perfect KDA' : `${kdaRatio}:1`}
                        </span>
                    </span>
                </TooltipTrigger>
                <TooltipContent>
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
        </TooltipProvider>
    );
}

export default Stats