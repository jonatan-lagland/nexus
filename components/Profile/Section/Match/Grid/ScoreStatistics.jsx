'use client'
import Image from "next/image";
import { MatchHistoryContext } from "@utils/context/matchHistoryContext";
import { useCalculateGameDuration } from "@utils/matchHistoryUtils";
import { useContext } from "react";


const ScoreStatistics = () => {
    const { matchData } = useContext(MatchHistoryContext);
    const { totalMinionsKilled, goldEarned, gameDuration } = matchData;
    const timestampGameDuration = useCalculateGameDuration(gameDuration)

    return (
        <>
            <div className='game-stats-container'>
                <div className="flex flex-row space-x-2 items-center cursor-default">
                    <Image
                        src={`/assets/images/clock-icon-grey.png`}
                        alt={`Minion Icon`}
                        width={15}
                        height={15}
                        className="select-none"
                        style={{ filter: 'brightness(2)' }}
                    />
                    <p className={`text-zinc-400 hover:text-zinc-300 font-oswald font-light text-base lg:text-lg`}>{timestampGameDuration}</p>
                </div>
                <div className='flex flex-row space-x-2 items-center cursor-default'>
                    <Image
                        src={`/assets/icons/stats/icon_minions.png`}
                        alt={`Minion Icon`}
                        width={15}
                        height={15}
                        className="select-none"
                        style={{ filter: `brightness(1.1)` }}
                    />
                    <p className={` text-zinc-400 hover:text-zinc-300 font-oswald font-light text-base lg:text-lg`}>{totalMinionsKilled}</p>
                </div>
                <div className='flex flex-row space-x-2 items-center cursor-default'>
                    <Image
                        src={`/assets/icons/stats/icon_gold.png`}
                        alt={`Gold Icon`}
                        width={15}
                        height={15}
                        className="select-none h-auto"
                        style={{ filter: `brightness(1.1)` }}
                    />
                    <p className={` text-zinc-400 hover:text-zinc-300 font-oswald font-light text-base lg:text-lg`}>{goldEarned}</p>
                </div>
            </div>
        </>
    );
}

export default ScoreStatistics