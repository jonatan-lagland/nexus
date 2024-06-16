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
    const badgeTheme = killParticipation < 40 ? "bg-[#445068]" : killParticipation >= 40 && killParticipation <= 70 ? "bg-[#4A4EA4]" : 'bg-[#92631c]'

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