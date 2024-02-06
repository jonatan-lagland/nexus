'use client'
import React from "react";

function RankEmblemComponent({ tier, rank }) {
    if (!tier) {
        return null;
    }

    const badgeTheme = `badge-${tier}`.toLowerCase();
    const formattedTier = tier.charAt(0).toUpperCase() + tier.slice(1).toLowerCase();
    return (
        <div style={{ textShadow: "1px 1px 1px black" }} className={`text-white ${badgeTheme} w-max text-sm px-2 rounded-full lg:text-base lg:px-3`}>
            {formattedTier} {tier !== 'MASTER' && tier !== 'GRANDMASTER' && tier !== 'CHALLENGER' ? rank : null}
        </div>
    )
}

export const RankEmblem = React.memo(RankEmblemComponent);