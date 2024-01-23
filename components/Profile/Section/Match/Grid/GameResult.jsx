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
            <div className='gameresult'>
                <div className="flex flex-col justify-center items-center outcome-label">
                    <span className={`text-4xl font-bebas drop-shadow-md ${outcomeTheme}`}>{outcome}</span>
                    <p className={`font-abel sm:text-lg text-xl ${timestampTheme}`}>{timestampGameEnd}</p>
                </div>
                <div className="flex flex-col justify-evenly items-center outcome-timestamp">
                    <RoleIcon role={individualPosition} />
                    <MatchEnd />
                </div>
            </div>
        </>
    );
}

export default GameResult