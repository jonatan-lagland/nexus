'use client'
import { useContext } from "react";
import dynamic from 'next/dynamic'
const LiveMatch = dynamic(() => import('../LiveMatch/LiveMatch'), {
    ssr: false
})
import MatchList from "./MatchList";
import { LiveGameContext } from "@utils/context/liveGameContext";


function Section({ user, region }) {
    const { isShowLiveGameTab, liveGameDetails, rankedDetailsOfEveryPlayer } = useContext(LiveGameContext)

    return (
        <>
            {isShowLiveGameTab ? <LiveMatch liveGameDetails={liveGameDetails} rankedDetailsOfEveryPlayer={rankedDetailsOfEveryPlayer}></LiveMatch> : <MatchList user={user} region={region} />}
        </>
    );
}
export default Section;