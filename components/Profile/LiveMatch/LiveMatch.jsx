'use client'

import { useLiveGameDetails, useLiveGameTimer } from "@utils/liveGameUtils";
import Bans from "./Bans";
import LiveTeams from "./LiveTeams";

function LiveMatch({ liveGameDetails, rankedDetailsOfEveryPlayer }) {

    const { gameMode, gameLength, gameStartTime, bannedChampions } = useLiveGameDetails(liveGameDetails);
    const { time, formatTime } = useLiveGameTimer(gameLength, gameStartTime);

    return (
        <section className="profile-grid-section">
            <div>
                <div className='flex flex-col container-remake p-5 border overflow-hidden rounded-lg'>
                    <div className="flex flex-row justify-center">
                        <span className="text-white">{formatTime(time.minutes)}:{formatTime(time.seconds)}</span>
                    </div>
                    <Bans bannedChampions={bannedChampions}></Bans>
                    <LiveTeams rankedDetailsOfEveryPlayer={rankedDetailsOfEveryPlayer} gameMode={gameMode} />
                </div>
            </div>
        </section>
    )
}

export default LiveMatch;