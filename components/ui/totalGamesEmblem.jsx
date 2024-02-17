'use client'
import React from "react";

export default function TotalGamesEmblem({ wins, losses }) {

    return (
        <div style={{ textShadow: "1px 1px 1px black" }} className="flex flex-row divide-x divide-neutral-500 rounded-full justify-center items-center bg-cosmic-cobalt text-white text-sm lg:text-base">
            <div className="px-1 min-w-[50px]">
                {wins}
            </div>
            <div className="px-1 min-w-[50px] ">
                {losses}
            </div>
        </div>
    )
}
