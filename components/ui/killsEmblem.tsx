'use client'
import React from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    TooltipArrow
} from "@/components/ui/tooltip"

function KillsEmblemComponent({ kills }) {
    if (kills < 2) {
        return null;
    }
    let killText = null;
    let badgeTheme = 'bg-[#465789]';

    switch (kills) {
        case 2:
            badgeTheme = 'bg-[#2B489E]';
            killText = "Double Kill";
            break;
        case 3:
            badgeTheme = 'bg-[#772189]';
            killText = "Triple Kill";
            break;
        case 4:
            badgeTheme = 'bg-[#8B1823]';
            killText = "Quadra Kill";
            break;
        case 5:
            badgeTheme = 'bg-[#92631c]';
            killText = "Penta Kill";
            break;
        case 6:
            badgeTheme = 'bg-[#92631c]';
            killText = "Hexa Kill";
            break;
        default:
            killText = null;
            break;
    }

    return (
        <TooltipProvider delayDuration={0} skipDelayDuration={300}>
            <Tooltip>
                <TooltipTrigger>
                    <div style={{ textShadow: "1px 1px 1px black" }} className={`text-white ${badgeTheme} border border-[#040d0c] hover:brightness-110 cursor-default w-max text-sm px-2 rounded-full lg:text-base lg:px-3`}>
                        {killText}
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <TooltipArrow />
                    <span>Largest Multikill</span>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export const KillsEmblem = React.memo(KillsEmblemComponent);