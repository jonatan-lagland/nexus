'use client'
import React from "react";
import { useContext } from "react";
import { Button } from "@components/ui/button";
import { ProgressBarExtraSmall } from "@components/ui/Loading";
import { LiveGameContext } from "@utils/context/liveGameContext";
import { Server, Region } from "@utils/types";

type LiveGameButtonProps = {
    server: Server
    region: Region
    summonerId: string
    gameName: string
    tagLine: string
    puuid: string
}

type LiveGameContextProps = {
    fetchLiveGame: (server: Server, region: Region, gameName: string, tagLine: string, puuid: string) => void; // eslint-disable-line no-unused-vars
    isLoading: boolean;
}

export default function LiveGameButton({ server, region, gameName, tagLine, puuid }: LiveGameButtonProps) {
    const { isLoading, fetchLiveGame }: LiveGameContextProps = useContext(LiveGameContext);

    const handleClick = () => {
        fetchLiveGame(server, region, gameName, tagLine, puuid)
    };

    return (
        <Button
            disabled={isLoading}
            variant="outline"
            className="rounded-md text-base font-normal text-white w-[6em]"
            onClick={() => {
                handleClick();
            }}
        >
            {isLoading ? <ProgressBarExtraSmall /> : <span>Live Game</span>}
        </Button>
    );
}