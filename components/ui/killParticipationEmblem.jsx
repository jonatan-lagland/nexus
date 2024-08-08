'use client'
import React from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    TooltipArrow
} from "@/components/ui/tooltip"

function KillParticipationEmblemComponent({ killParticipation }) {
    let badgeTheme;
    switch (true) {
        case (killParticipation < 30):
            badgeTheme = "badge-bronze";
            break;
        case (killParticipation >= 30 && killParticipation < 60):
            badgeTheme = "badge-silver";
            break;
        case (killParticipation >= 60 && killParticipation < 70):
            badgeTheme = "badge-gold";
            break;
        case (killParticipation >= 70 && killParticipation < 90):
            badgeTheme = "badge-diamond";
            break;
        default:
            badgeTheme = "badge-challenger";
            break;
    }
    return (
        <TooltipProvider disableHoverableContent={true} delayDuration={0} skipDelayDuration={300}>
            <Tooltip>
                <TooltipTrigger>
                    <div className="relative group">
                        <div style={{ textShadow: "1px 1px 1px black" }} className={`text-zinc-300 ${badgeTheme} relative border border-[#040d0c] hover:brightness-110 cursor-default w-max text-sm px-2 rounded-full`}>
                            <span className="text-white">{killParticipation}%</span>
                        </div>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Kill Participation</p>
                    <TooltipArrow />
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>

    )
}

export const KillParticipationEmblem = React.memo(KillParticipationEmblemComponent);