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
            variant="link"
            className="  text-white rounded-md overflow-hidden text-sm p-none "
            style={{ textShadow: "1px 1px 1px black" }}>
            <span>Close</span>
        </Button>
    )
}