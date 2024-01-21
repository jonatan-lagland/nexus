'use client'
import Image from "next/image";
import { MatchHistoryContext } from "@utils/context/matchHistoryContext";
import { useContext } from "react";

const ScoreStatistics = () => {
    const { matchData } = useContext(MatchHistoryContext);
    const { totalMinionsKilled, goldEarned } = matchData;
    return (
        <>
            <div className='game-stats-container'>
                <div className='flex flex-row space-x-2 items-center sm:hidden'>

                </div>
                <div className='flex flex-row space-x-2 items-center'>
                    <Image
                        src={`/assets/icons/stats/icon_minions.png`}
                        alt={`Minion Icon`}
                        width={20}
                        height={20}
                    />
                    <p className={` font-oswald font-light text-base md:text-lg`}>{totalMinionsKilled}</p>
                </div>
                <div className='flex flex-row space-x-2 items-center'>
                    <Image
                        src={`/assets/icons/stats/icon_gold.png`}
                        alt={`Gold Icon`}
                        width={20}
                        height={20}
                    />
                    <p className={`font-oswald font-light text-base md:text-lg`}>{goldEarned}</p>
                </div>
            </div>
        </>
    );
}

export default ScoreStatistics