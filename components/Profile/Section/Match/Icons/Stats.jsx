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
                <TooltipTrigger>
                    <p className='font-oswald text-lg truncate cursor-default'>
                        <span className={`text-white`}>{kills}</span>
                        <span className={`text-slate-400`}> / </span>
                        <span className={`${deathsTheme}`}>{deaths}</span>
                        <span className={`text-slate-400`}> / </span>
                        <span className={`text-white`}>{assists}</span>
                    </p>
                </TooltipTrigger>
                <TooltipContent>
                    <TooltipArrow />
                    <p className='text-zinc-400'>
                        <span className={`text-white`}>Kills</span>
                        <span> / </span>
                        <span className={`text-white`}>Deaths</span>
                        <span> / </span>
                        <span className={`text-white`}>Assists</span>
                    </p>
                </TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger>
                    <p className={` text-neutral-400 text-base font-oswald cursor-default`}>
                        <span>
                            {deaths === 0 ? 'Perfect KDA' : `${kdaRatio}:1`}
                        </span>
                    </p>
                </TooltipTrigger>
                <TooltipContent>
                    <TooltipArrow />
                    <p className='text-zinc-400'>KDA ratio</p>
                    <p className='text-zinc-400'>
                        <span className={`text-white`}>Kills</span>
                        <span> + </span>
                        <span className={`text-white`}>Assists</span>
                        <span> : </span>
                        <span className={`text-white`}>Deaths</span>
                    </p>
                </TooltipContent>
            </Tooltip>



        </TooltipProvider>
    );
}

export default Stats