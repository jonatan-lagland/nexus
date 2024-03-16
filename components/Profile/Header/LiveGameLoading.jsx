'use client'
import React from "react";
import { useContext } from "react";
import { LiveGameContext } from "@utils/context/liveGameContext";
import { Progress } from "@components/ui/progress";

export default function LiveGameLoading() {
    const { isLoading, loadingProgress } = useContext(LiveGameContext);

    if (!isLoading) {
        return null;
    }

    return (
        <Progress value={loadingProgress} className="moderateWinrateBadge" />
    );
}