'use client'
import React from "react";
import { useContext } from "react";
import { MatchHistoryContext } from "@utils/context/matchHistoryContext";
import { Button } from "@components/ui/button";
import { ProgressBarExtraSmall } from "@components/ui/Loading";

export default function RefreshButton({ user, region, server, leagueId }) {
    const { refreshMatchHistoryData, isLoading } = useContext(MatchHistoryContext);

    return (
        <Button
            onClick={() => refreshMatchHistoryData(user.puuid, region, server, leagueId)}
            variant="outline"
            className=" bg-cosmic-cobalt text-white rounded-md font-sans overflow-hidden text-base font-normal border-none w-[5em]"
            style={{ textShadow: "1px 1px 1px black" }}>
            {isLoading ? <ProgressBarExtraSmall></ProgressBarExtraSmall> : <span>Refresh</span>}
        </Button>
    )
}