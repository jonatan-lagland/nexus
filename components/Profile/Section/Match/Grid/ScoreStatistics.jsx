'use client'
import Image from "next/image";
import { MatchHistoryContext } from "@utils/context/matchHistoryContext";
import { ColorblindContext } from "@utils/context/colorBlindContext";
import { useContext } from "react";

const ScoreStatistics = () => {
    const { isColorblindMode } = useContext(ColorblindContext);
    const { matchData } = useContext(MatchHistoryContext);
    const { totalMinionsKilled, goldEarned, win } = matchData;

    const scoreTheme = win
        ? (isColorblindMode ? 'text-zinc-300' : 'text-zinc-300')
        : (isColorblindMode ? 'text-zinc-300' : 'text-zinc-300');
    const imageFilterCoin = win
        ? (isColorblindMode ? 'brightness(1.3)' : 'brightness(1.3)')
        : (isColorblindMode ? 'brightness(1.3)' : 'brightness(1.3)');

    const imageFilterMinions = win
        ? (isColorblindMode ? 'brightness(1.3)' : 'brightness(1.3)')
        : (isColorblindMode ? 'brightness(1.3)' : 'brightness(1.3)');

    return (
        <>
            <div className='game-stats-container'>
                <div className='flex flex-row space-x-2 items-center'>
                    <Image
                        src={`/assets/icons/stats/icon_minions.png`}
                        alt={`Minion Icon`}
                        width={20}
                        height={20}
                        className="select-none"
                        style={{ filter: `${imageFilterMinions}` }}
                    />
                    <p className={`${scoreTheme} font-oswald font-light text-base md:text-lg`}>{totalMinionsKilled}</p>
                </div>
                <div className='flex flex-row space-x-2 items-center'>
                    <Image
                        src={`/assets/icons/stats/icon_gold.png`}
                        alt={`Gold Icon`}
                        width={20}
                        height={20}
                        className="select-none"
                        style={{ filter: `${imageFilterCoin}` }}
                    />
                    <p className={`${scoreTheme} font-oswald font-light text-base md:text-lg`}>{goldEarned}</p>
                </div>
            </div>
        </>
    );
}

export default ScoreStatistics