'use client'
import React from "react";
import { useContext } from "react";
import { MatchHistoryContext } from "@utils/context/matchHistoryContext";
import { Button } from "@components/ui/button";
import { ProgressBarExtraSmall } from "@components/ui/Loading";
import { User, Region, Server } from "@utils/types";

type RefreshButtonProps = {
    user: User;
    region: Region;
    server: Server;
    summonerId: string;
}

type MatchHistoryContextProps = {
    refreshMatchHistoryData: (puuid: string, region: Region, server: Server, summonerId: string) => void; // eslint-disable-line no-unused-vars
    invalidateQuery: () => void;
    isLoading: boolean;
}

export default function RefreshButton({ user, region, server, summonerId }: RefreshButtonProps) {
    const { refreshMatchHistoryData, invalidateQuery, isLoading }: MatchHistoryContextProps = useContext(MatchHistoryContext);

    function handleRefresh() {
        invalidateQuery();
        refreshMatchHistoryData(user.puuid, region, server, summonerId);
    }

    return (
        <Button
            disabled={isLoading}
            onClick={handleRefresh}
            variant="outline"
            className=" bg-cosmic-cobalt text-white rounded-md font-sans overflow-hidden text-base font-normal border-none w-[5em]"
        >
            {isLoading ? <ProgressBarExtraSmall></ProgressBarExtraSmall> : <span>Refresh</span>}
        </Button>
    )
}