'use client'

import { useLiveGameDetails } from "@utils/liveGameUtils";
import { useGetQueueType } from "@utils/matchHistoryUtils";
import { useContext } from "react";
import { QueueContext } from "@utils/context/queueContext";
import Bans from "./Bans";
import LiveTeams from "./LiveTeams";
import { Skeleton } from "@components/ui/skeleton";
import ProfileButton from "../Header/ProfileButton";
import Counter from "./Counter";
import { LiveGameContext } from "@utils/context/liveGameContext";

function LiveMatch({ liveGameDetails, rankedDetailsOfEveryPlayer }) {
    const { gameMode, gameStartTime, bannedChampions, gameQueueConfigId } = useLiveGameDetails(liveGameDetails);
    const { minimizeWindow } = useContext(LiveGameContext);
    const queueTypes = useContext(QueueContext)
    const queueType = useGetQueueType(gameQueueConfigId, queueTypes);

    return (
        <section className="profile-grid-section">
            <div>
                <div className='flex flex-col container-live p-5 border overflow-hidden rounded-lg'>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-row items-center justify-between">
                            <div className="flex flex-col gap-2">
                                <span style={{ textShadow: "1px 1px 1px black" }} className=" text-[#8998f0] font-semibold">{queueType && queueType.name && queueType.name}</span>
                                <div className="flex flex-row items-center justify-start">
                                    <div className="flex flex-row items-center gap-3">
                                        <Skeleton className="rounded-lg h-max bg-red-700">
                                            <span style={{ textShadow: "1px 1px 1px black" }} className="text-white p-3 font-bold">Live</span>
                                        </Skeleton>
                                        <Counter gameStartTime={gameStartTime}></Counter>
                                    </div>
                                </div>
                            </div>
                            <ProfileButton></ProfileButton>
                        </div>
                    </div>
                    {minimizeWindow ? null :
                        <div className="flex flex-col gap-3">
                            <Bans bannedChampions={bannedChampions}></Bans>
                            <LiveTeams rankedDetailsOfEveryPlayer={rankedDetailsOfEveryPlayer} gameMode={gameMode} />
                        </div>
                    }
                </div>
            </div>
        </section>
    )
}

export default LiveMatch;