'use client'
import { useContext } from "react";
import RoleIcon from "../Icons/RoleIcon";
import MatchEnd from "../Icons/MatchEnd";
import { MatchHistoryContext } from "@utils/context/matchHistoryContext";
import { ColorblindContext } from "@utils/context/colorBlindContext";
import { calculateGameEnd } from "@utils/matchHistoryUtils";

const GameResult = () => {
    const { matchData } = useContext(MatchHistoryContext);
    const { win, gameEndTimestamp, individualPosition } = matchData;
    const { isColorblindMode } = useContext(ColorblindContext);

    const outcome = win ? "Victory" : "Defeat";
    const outcomeTheme = win
        ? (isColorblindMode ? 'text-amber-400' : 'text-bright-green')
        : (isColorblindMode ? 'text-amber-400' : 'text-grapefruit');
    const timestampTheme = win
        ? (isColorblindMode ? 'text-zinc-300' : 'text-zinc-300')
        : (isColorblindMode ? 'text-zinc-200' : 'text-zinc-300');

    const timestampGameEnd = calculateGameEnd(gameEndTimestamp)

    return (
        <>
            <div className='flex flex-row sm:flex-col items-center flex-grow justify-center space-x-3 sm:space-x-0 sm:justify-around px-2 py-2'>
                <div className='flex flex-col items-center text-center space-y-1'>
                    <div className='sm:hidden flex'>
                        <RoleIcon role={individualPosition} />
                    </div>
                    <span className={`   text-4xl font-bebas drop-shadow-md ${outcomeTheme}`}>{outcome}</span>
                    <p className={`font-abel sm:text-lg text-xl ${timestampTheme}`}>{timestampGameEnd}</p>
                </div>
                <div className='  hidden sm:flex'>
                    <RoleIcon role={individualPosition} />
                </div>
                <div className='hidden sm:flex flex-row items-center space-x-2'>
                    <MatchEnd />
                </div>
            </div>
        </>
    );
}

export default GameResult