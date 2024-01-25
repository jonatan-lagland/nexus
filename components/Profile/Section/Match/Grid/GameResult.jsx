'use client'
import { useContext, useState, useEffect } from "react";
import RoleIcon from "../Icons/RoleIcon";
import MatchEnd from "../Icons/MatchEnd";
import { MatchHistoryContext } from "@utils/context/matchHistoryContext";
import { ColorblindContext } from "@utils/context/colorBlindContext";
import { useCalculateGameEnd } from "@utils/matchHistoryUtils";

const GameResult = () => {
    const { matchData } = useContext(MatchHistoryContext);
    const { win, gameEndTimestamp, individualPosition } = matchData;
    const { isColorblindMode } = useContext(ColorblindContext);
    const [outcome, setOutcome] = useState('');
    const [outcomeTheme, setOutcomeTheme] = useState('');
    const [timestampTheme, setTimestampTheme] = useState('');

    useEffect(() => {
        const outcome = win ? "Victory" : "Defeat";
        const outcomeTheme = win
            ? (isColorblindMode ? 'text-amber-400' : 'text-bright-green')
            : (isColorblindMode ? 'text-amber-400' : 'text-grapefruit');
        const timestampTheme = win
            ? (isColorblindMode ? 'text-zinc-300' : 'text-zinc-300')
            : (isColorblindMode ? 'text-zinc-200' : 'text-zinc-300');
        setOutcome(outcome)
        setOutcomeTheme(outcomeTheme)
        setTimestampTheme(timestampTheme)
    }, [win, isColorblindMode]);

    const timestampGameEnd = useCalculateGameEnd(gameEndTimestamp)

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