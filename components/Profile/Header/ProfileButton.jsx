'use client'
import React from "react";
import { useContext } from "react";
import { Button } from "@components/ui/button";
import { LiveGameContext } from "@utils/context/liveGameContext";

export default function ProfileButton() {
    const { setIsShowLiveGameTab } = useContext(LiveGameContext);

    const handleClick = () => {
        setIsShowLiveGameTab(false);
    };

    return (
        <Button
            onClick={handleClick}
            variant="outline"
            className=" bg-cosmic-cobalt text-white rounded-md font-sans overflow-hidden text-base font-normal border-none w-[6em]"
            style={{ textShadow: "1px 1px 1px black" }}>
            <span>Profile</span>
        </Button>
    )
}