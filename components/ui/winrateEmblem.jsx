'use client'
import React from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    TooltipArrow
} from "@/components/ui/tooltip"

function WinrateEmblemComponent({ winrate }) {
    if (!winrate) {
        return null;
    }

    let winrateTheme = "defaultWinrateBadge";

    if (winrate <= 54) {
        winrateTheme = "defaultWinrateBadge";
    } else if (winrate >= 55 && winrate <= 59) {
        winrateTheme = "moderateWinrateBadge";
    } else if (winrate >= 60 && winrate <= 69) {
        winrateTheme = "impressiveWinrateBadge";
    } else if (winrate >= 70) {
        winrateTheme = "eliteWinrateBadge";
    }

    return (
        <TooltipProvider disableHoverableContent={true} delayDuration={0} skipDelayDuration={300}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div style={{ textShadow: "1px 1px 1px black" }} className={`text-zinc-300 ${winrateTheme} hover:brightness-110 border border-[#040d0c] cursor-default w-max text-xs px-1 rounded-full`}>
                        <span className="text-white">{winrate}%</span>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <TooltipArrow />
                    <p>Winrate</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>

    )
}

export const WinrateEmblem = React.memo(WinrateEmblemComponent);