'use client'
import React from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    TooltipArrow
} from "@/components/ui/tooltip"
import { PlayerTier, PlayerRank } from "@utils/types";

type EmblemSize = "small" | "base"
type RankType = "playerRank" | "gameAverageRank";

type RankEmblemProps = {
    tier: PlayerTier;
    rank?: PlayerRank;
    type?: RankType;
    size?: EmblemSize;
    leaguePoints?: number;
}

function RankEmblemComponent({ tier, rank, type, size, leaguePoints }: RankEmblemProps) {
    if (!tier) {
        return null;
    }
    const textSize = size === 'small' ? 'text-xs lg:text-xs py-[1px] px-2' : 'text-s px-2 lg:text-base lg:px-3'
    const badgeTheme = `badge-${tier}`.toLowerCase();
    const formattedTier = tier.charAt(0).toUpperCase() + tier.slice(1).toLowerCase();
    return (
        <TooltipProvider delayDuration={0} skipDelayDuration={300}>
            <Tooltip>
                <TooltipTrigger>
                    <div style={{ textShadow: "1px 1px 1px black" }} className={`text-white ${badgeTheme} ${textSize} border border-[#040d0c] cursor-default hover:brightness-110 w-max rounded-full`}>
                        <span>{formattedTier} {tier !== 'MASTER' && tier !== 'GRANDMASTER' && tier !== 'CHALLENGER' ? rank : null} {leaguePoints !== null && leaguePoints !== undefined ? ` ${leaguePoints} lp` : null}</span>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <TooltipArrow />
                    {type === "playerRank" ? <p>Rank</p> : <p>Game Average Rank</p>}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>

    )
}

export const RankEmblem = React.memo(RankEmblemComponent);