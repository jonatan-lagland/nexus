'use client'
import { useContext } from "react";
import dynamic from 'next/dynamic'
const LiveMatch = dynamic(() => import('../LiveMatch/LiveMatch'))
import MatchList from "./MatchList";
import { LiveGameContext } from "@utils/context/liveGameContext";

function Content({ user, region }) {
    const { isShowLiveGameTab, liveGameDetails, rankedDetailsOfEveryPlayer } = useContext(LiveGameContext)

    return (
        <div className="flex flex-col gap-2">
            {/* Conditionally render a live game tab if live game tab is active */}
            {isShowLiveGameTab ? <LiveMatch liveGameDetails={liveGameDetails} rankedDetailsOfEveryPlayer={rankedDetailsOfEveryPlayer}></LiveMatch> : null}
            <MatchList user={user} region={region} />
        </div>
    );
}
export default Content;