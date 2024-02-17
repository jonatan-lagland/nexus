'use client'
import React from "react";
import { useContext } from "react";
import { Button } from "@components/ui/button";
import { ProgressBarExtraSmall } from "@components/ui/Loading";
import { LiveGameContext } from "@utils/context/liveGameContext";
import { useLiveGameTooltip } from "@utils/liveGameUtils";
import { useState } from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    TooltipArrow
} from "@/components/ui/tooltip"

export default function LiveGameButton({ server, region, summonerId }) {
    const { isLoading, isGameFound, fetchLiveGame } = useContext(LiveGameContext);
    const [hasClicked, setHasClicked] = useState(false);
    const showTooltip = useLiveGameTooltip(isLoading, isGameFound, hasClicked)

    const handleClick = () => {
        setHasClicked(true);
        fetchLiveGame(server, region, summonerId);
    };

    return (

        <TooltipProvider delayDuration={0} skipDelayDuration={300}>
            <Tooltip open={showTooltip}>
                <TooltipTrigger asChild>
                    <Button
                        onClick={handleClick}
                        variant="outline"
                        className=" bg-cosmic-cobalt text-white rounded-md font-sans overflow-hidden text-base font-normal border-none w-[6em]"
                        style={{ textShadow: "1px 1px 1px black" }}>
                        {isLoading ? <ProgressBarExtraSmall></ProgressBarExtraSmall> : <span>Live Game</span>}
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>No active game was found.</p>
                    <TooltipArrow />
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}