'use client'
import React from "react";
import { useContext } from "react";
import { Button } from "@components/ui/button";
import { ProgressBarExtraSmall } from "@components/ui/Loading";
import { LiveGameContext } from "@utils/context/liveGameContext";

export default function LiveGameButton({ server, region, summonerId, gameName, tagLine }) {
    const { isLoading, fetchLiveGame } = useContext(LiveGameContext);

    const handleClick = () => {
        fetchLiveGame(server, region, summonerId, gameName, tagLine)
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